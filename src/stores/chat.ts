import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: 'admin' | 'client'
  receiverId: string
  receiverName: string
  receiverRole: 'admin' | 'client'
  message: string
  timestamp: string
  read: boolean
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])

  const sendMessage = (
    senderId: string,
    senderName: string,
    senderRole: 'admin' | 'client',
    receiverId: string,
    receiverName: string,
    receiverRole: 'admin' | 'client',
    message: string
  ): ChatMessage => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      senderId,
      senderName,
      senderRole,
      receiverId,
      receiverName,
      receiverRole,
      message,
      timestamp: new Date().toISOString(),
      read: false
    }
    messages.value.push(newMessage)
    saveToLocalStorage()
    return newMessage
  }

  const getConversation = (userId1: string, userId2: string): ChatMessage[] => {
    return messages.value
      .filter(
        msg =>
          (msg.senderId === userId1 && msg.receiverId === userId2) ||
          (msg.senderId === userId2 && msg.receiverId === userId1)
      )
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }

  const getConversationsForUser = (userId: string): { userId: string; userName: string; lastMessage: ChatMessage; unreadCount: number }[] => {
    const conversationMap = new Map<string, { userId: string; userName: string; lastMessage: ChatMessage; unreadCount: number }>()

    messages.value.forEach(msg => {
      let otherUserId: string
      let otherUserName: string

      if (msg.senderId === userId) {
        otherUserId = msg.receiverId
        otherUserName = msg.receiverName
      } else if (msg.receiverId === userId) {
        otherUserId = msg.senderId
        otherUserName = msg.senderName
      } else {
        return
      }

      const existing = conversationMap.get(otherUserId)
      if (!existing || new Date(msg.timestamp) > new Date(existing.lastMessage.timestamp)) {
        const unreadCount = messages.value.filter(
          m => m.receiverId === userId && m.senderId === otherUserId && !m.read
        ).length

        conversationMap.set(otherUserId, {
          userId: otherUserId,
          userName: otherUserName,
          lastMessage: msg,
          unreadCount
        })
      }
    })

    return Array.from(conversationMap.values()).sort(
      (a, b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    )
  }

  const markAsRead = (userId: string, senderId: string): void => {
    messages.value.forEach(msg => {
      if (msg.receiverId === userId && msg.senderId === senderId && !msg.read) {
        msg.read = true
      }
    })
    saveToLocalStorage()
  }

  const getUnreadCount = (userId: string): number => {
    return messages.value.filter(msg => msg.receiverId === userId && !msg.read).length
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('chatMessages', JSON.stringify(messages.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('chatMessages')
    if (saved) {
      messages.value = JSON.parse(saved)
    }
  }

  return {
    messages,
    sendMessage,
    getConversation,
    getConversationsForUser,
    markAsRead,
    getUnreadCount,
    loadFromLocalStorage
  }
})

