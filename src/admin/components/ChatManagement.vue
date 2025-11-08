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
      class="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[500px] lg:w-[600px] xl:w-[700px] bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-purple-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-400/30 flex flex-col max-h-[calc(100vh-7rem)] sm:max-h-[700px] overflow-hidden"
      style="box-shadow: 0 20px 25px -5px rgba(147, 51, 234, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2);"
    >
    <!-- Chat Header -->
    <div class="px-3 sm:px-4 py-3 sm:py-4 border-b border-purple-400/30 flex justify-between items-center bg-gradient-to-r from-purple-700 via-blue-700 to-purple-600 text-white rounded-t-2xl">
      <div class="flex items-center gap-2 sm:gap-3">
        <h3 class="text-base sm:text-lg font-semibold">Chat Management</h3>
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

    <div class="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
      <!-- Conversations List -->
      <div 
        v-if="!selectedUserId || windowWidth >= 1024"
        class="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-purple-400/30 overflow-y-auto flex-shrink-0 bg-purple-900/40 backdrop-blur-sm"
      >
        <!-- Search Bar -->
        <div class="p-3 sm:p-4 border-b border-purple-400/30 bg-purple-800/40 backdrop-blur-sm sticky top-0 z-10">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search clients..."
            class="w-full px-3 py-2 bg-purple-800/40 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-sm text-purple-100 placeholder-purple-300/50"
          />
        </div>
        <div v-if="filteredConversations.length === 0" class="p-6 text-center text-purple-200/70">
          <p v-if="searchQuery">No clients found matching "{{ searchQuery }}"</p>
          <p v-else>No conversations yet</p>
        </div>
        <div
          v-for="conv in filteredConversations"
          :key="conv.userId"
          @click="selectConversation(conv.userId, conv.userName)"
          :class="[
            'p-3 sm:p-4 border-b border-purple-400/30 cursor-pointer transition',
            selectedUserId === conv.userId ? 'bg-purple-700/60 border-purple-400/50' : 'bg-purple-800/30 hover:bg-purple-700/40'
          ]"
        >
          <div class="flex justify-between items-start gap-2">
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-purple-100 text-sm sm:text-base truncate">{{ conv.userName }}</h4>
              <p class="text-xs sm:text-sm text-purple-200/80 truncate mt-1">{{ conv.lastMessage.message }}</p>
              <p class="text-xs text-purple-200/60 mt-1">{{ formatTime(conv.lastMessage.timestamp) }}</p>
            </div>
            <div v-if="conv.unreadCount > 0" class="ml-2 flex-shrink-0">
              <span class="bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs font-semibold">
                {{ conv.unreadCount > 9 ? '9+' : conv.unreadCount }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div class="w-full lg:w-2/3 flex flex-col min-h-0 flex-1">
        <!-- Back button for mobile -->
        <div v-if="selectedUserId && windowWidth < 1024" class="px-3 py-2 border-b border-purple-400/30 bg-purple-800/40 backdrop-blur-sm flex-shrink-0">
          <button
            @click="selectedUserId = null"
            class="flex items-center gap-2 text-sm text-purple-300 hover:text-white"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to conversations
          </button>
        </div>
        <div v-if="!selectedUserId" class="flex-1 flex items-center justify-center text-purple-200/70">
          <div class="text-center">
            <svg class="w-16 h-16 mx-auto mb-4 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p class="text-purple-200">Select a conversation to start chatting</p>
          </div>
        </div>
        <div v-else class="flex flex-col h-full">
          <!-- Chat Header -->
          <div class="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-purple-400/30 bg-purple-800/40 backdrop-blur-sm flex-shrink-0">
            <h4 class="font-semibold text-purple-100 text-sm sm:text-base truncate">{{ selectedUserName }}</h4>
          </div>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0" ref="messagesContainer">
            <div
              v-for="msg in currentMessages"
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
          <div class="px-3 sm:px-4 py-3 border-t border-purple-400/30 bg-gradient-to-t from-purple-800/40 to-purple-900/40 backdrop-blur-sm flex-shrink-0">
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
const selectedUserId = ref<string | null>(null)
const selectedUserName = ref<string>('')
const newMessage = ref('')
const messagesContainer = ref<HTMLElement | null>(null)
const windowWidth = ref(window.innerWidth)
const searchQuery = ref('')

// Track window width for responsive behavior
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value && selectedUserId.value && authStore.user) {
    chatStore.markAsRead(authStore.user.id, selectedUserId.value)
    nextTick(() => {
      scrollToBottom()
    })
  }
}

const allClients = computed(() => {
  // Get all registered clients
  const clients = authStore.users.filter(u => u.role === 'client')
  return clients
})

const conversations = computed(() => {
  if (!authStore.user) return []
  
  // Get conversations from chat store
  const chatConversations = chatStore.getConversationsForUser(authStore.user.id)
  
  // Create a map of existing conversations
  const conversationMap = new Map<string, any>()
  chatConversations.forEach(conv => {
    conversationMap.set(conv.userId, conv)
  })
  
  // Add all registered clients, even if they have no messages
  allClients.value.forEach(client => {
    if (!conversationMap.has(client.id)) {
      // Create a placeholder conversation for clients with no messages
      conversationMap.set(client.id, {
        userId: client.id,
        userName: client.name,
        lastMessage: {
          message: 'No messages yet',
          timestamp: new Date().toISOString()
        },
        unreadCount: 0
      })
    }
  })
  
  return Array.from(conversationMap.values()).sort((a, b) => {
    // Sort by last message time, with "No messages yet" at the end
    if (a.lastMessage.message === 'No messages yet' && b.lastMessage.message !== 'No messages yet') return 1
    if (b.lastMessage.message === 'No messages yet' && a.lastMessage.message !== 'No messages yet') return -1
    return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
  })
})

const filteredConversations = computed(() => {
  if (!searchQuery.value.trim()) return conversations.value
  const query = searchQuery.value.toLowerCase()
  return conversations.value.filter(conv => 
    conv.userName.toLowerCase().includes(query)
  )
})

const currentMessages = computed(() => {
  if (!authStore.user || !selectedUserId.value) return []
  return chatStore.getConversation(authStore.user.id, selectedUserId.value)
})

const unreadCount = computed(() => {
  if (!authStore.user) return 0
  return chatStore.getUnreadCount(authStore.user.id)
})

const selectConversation = (userId: string, userName: string) => {
  selectedUserId.value = userId
  selectedUserName.value = userName
  if (authStore.user) {
    chatStore.markAsRead(authStore.user.id, userId)
  }
  nextTick(() => {
    scrollToBottom()
  })
  // On mobile, hide conversation list when selecting
  if (windowWidth.value < 1024) {
    // The v-if will handle hiding the list
  }
}

const sendMessage = () => {
  if (!authStore.user || !selectedUserId.value || !newMessage.value.trim()) return

  const receiver = authStore.users.find(u => u.id === selectedUserId.value)
  if (!receiver) return

  chatStore.sendMessage(
    authStore.user.id,
    authStore.user.name,
    authStore.user.role as 'admin' | 'client',
    selectedUserId.value,
    receiver.name,
    receiver.role as 'admin' | 'client',
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

watch(currentMessages, () => {
  nextTick(() => {
    scrollToBottom()
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
  authStore.initialize()
  chatStore.loadFromLocalStorage()
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateWindowWidth)
  updateWindowWidth()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateWindowWidth)
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

