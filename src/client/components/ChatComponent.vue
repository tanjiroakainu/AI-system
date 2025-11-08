<template>
  <!-- Floating Chat Button -->
  <button
    @click="toggleChat"
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
    :class="{ 'animate-pulse': unreadCount > 0 }"
    aria-label="Open chat"
  >
    <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
    <span
      v-if="unreadCount > 0"
      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border-2 border-white"
    >
      {{ unreadCount > 9 ? '9+' : unreadCount }}
    </span>
  </button>

  <!-- Floating Chat Window -->
  <Transition name="chat-window">
    <div
      v-if="isOpen"
      class="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 lg:w-[420px] bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-purple-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-400/30 flex flex-col max-h-[calc(100vh-7rem)] sm:max-h-[600px] overflow-hidden"
      style="box-shadow: 0 20px 25px -5px rgba(147, 51, 234, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2);"
    >
    <!-- Chat Header -->
    <div class="px-3 sm:px-4 py-3 sm:py-4 border-b border-purple-400/30 flex justify-between items-center bg-gradient-to-r from-purple-700 via-blue-700 to-purple-600 text-white rounded-t-2xl">
      <div class="flex items-center gap-2 sm:gap-3">
        <h3 class="text-base sm:text-lg font-semibold">Chat with Admin</h3>
        <div v-if="unreadCount > 0" class="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs font-semibold">
          {{ unreadCount }} unread
        </div>
      </div>
      <button
        @click="toggleChat"
        class="p-1.5 hover:from-purple-500 hover:to-blue-500 rounded-full transition"
        aria-label="Close chat"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0" ref="messagesContainer">
        <div v-if="messages.length === 0" class="flex items-center justify-center h-full text-purple-200/70">
          <div class="text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p class="text-purple-200">No messages yet. Start a conversation!</p>
          </div>
        </div>
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="[
            'flex',
            msg.senderId === authStore.user?.id ? 'justify-end' : 'justify-start'
          ]"
        >
          <div
            :class="[
              'max-w-[85%] sm:max-w-xs md:max-w-md px-3 sm:px-4 py-2 rounded-lg break-words',
              msg.senderId === authStore.user?.id
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-purple-800/40 backdrop-blur-sm text-purple-100 border border-purple-400/30'
            ]"
          >
            <p class="text-sm sm:text-base break-words">{{ msg.message }}</p>
            <p
              :class="[
                'text-xs mt-1',
                msg.senderId === authStore.user?.id ? 'text-purple-200' : 'text-purple-200/60'
              ]"
            >
              {{ formatTime(msg.timestamp) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="px-3 sm:px-4 py-3 border-t border-purple-400/30 bg-gradient-to-t from-purple-800/40 to-purple-900/40 backdrop-blur-sm">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            class="flex-1 px-3 sm:px-4 py-2 bg-purple-800/40 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-sm sm:text-base text-purple-100 placeholder-purple-300/50"
            required
          />
          <button
            type="submit"
            class="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition flex-shrink-0 shadow-lg shadow-purple-500/50"
            aria-label="Send message"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useAuthStore } from '@/stores/auth'

const chatStore = useChatStore()
const authStore = useAuthStore()

const isOpen = ref(false)
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && adminUser.value && authStore.user) {
    chatStore.markAsRead(authStore.user.id, adminUser.value.id)
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const adminUser = computed(() => {
  // First try to find admin in users list
  let admin = authStore.users.find(u => u.role === 'admin')
  // If not found, create admin user object (for initial setup)
  if (!admin) {
    admin = {
      id: 'admin-1',
      email: 'admin@gmail.com',
      name: 'Administrator',
      role: 'admin' as const
    }
  }
  return admin
})

const messages = computed(() => {
  if (!authStore.user || !adminUser.value) return []
  return chatStore.getConversation(authStore.user.id, adminUser.value.id)
})

const unreadCount = computed(() => {
  if (!authStore.user || !adminUser.value) return 0
  return chatStore.getUnreadCount(authStore.user.id)
})

const sendMessage = () => {
  if (!authStore.user || !adminUser.value || !newMessage.value.trim()) return

  chatStore.sendMessage(
    authStore.user.id,
    authStore.user.name,
    authStore.user.role as 'admin' | 'client',
    adminUser.value.id,
    adminUser.value.name,
    adminUser.value.role as 'admin' | 'client',
    newMessage.value.trim()
  )

  newMessage.value = ''
  nextTick(() => {
    scrollToBottom()
  })
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return date.toLocaleDateString()
}

watch(messages, () => {
  nextTick(() => {
    scrollToBottom()
    if (isOpen.value && adminUser.value && authStore.user) {
      chatStore.markAsRead(authStore.user.id, adminUser.value.id)
    }
  })
})

// Close chat when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (!isOpen.value) return
  
  const target = event.target as HTMLElement
  const chatWindow = target.closest('.fixed.bottom-20, .fixed.bottom-24')
  const chatButton = target.closest('button.fixed.bottom-4, button.fixed.bottom-6')
  
  if (!chatWindow && !chatButton) {
    isOpen.value = false
  }
}

onMounted(() => {
  chatStore.loadFromLocalStorage()
  authStore.initialize()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.chat-window-enter-active,
.chat-window-leave-active {
  transition: all 0.3s ease;
}

.chat-window-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.chat-window-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>

