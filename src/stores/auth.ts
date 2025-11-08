import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  name: string
  role: 'client' | 'admin'
}

interface ClientUser extends User {
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const clientUsers = ref<ClientUser[]>([])

  const isAuthenticated = computed(() => user.value !== null)

  const login = (email: string, password: string): boolean => {
    // Admin login
    if (email === 'admin@gmail.com' && password === 'admin123') {
      user.value = {
        id: 'admin-1',
        email: 'admin@gmail.com',
        name: 'Administrator',
        role: 'admin'
      }
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }

    // Client login - check password
    const client = clientUsers.value.find(u => u.email === email && u.role === 'client')
    if (client && client.password === password) {
      // Return user without password
      user.value = {
        id: client.id,
        email: client.email,
        name: client.name,
        role: client.role
      }
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }

    return false
  }

  const register = (email: string, password: string, name: string): boolean => {
    // Check if user already exists
    if (clientUsers.value.some(u => u.email === email)) {
      return false
    }

    const newUser: ClientUser = {
      id: `client-${Date.now()}`,
      email,
      name,
      role: 'client',
      password
    }

    clientUsers.value.push(newUser)
    // Set user without password
    user.value = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role
    }
    localStorage.setItem('clientUsers', JSON.stringify(clientUsers.value))
    localStorage.setItem('user', JSON.stringify(user.value))
    return true
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const initialize = () => {
    const savedUser = localStorage.getItem('user')
    const savedClientUsers = localStorage.getItem('clientUsers')
    
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
    
    if (savedClientUsers) {
      clientUsers.value = JSON.parse(savedClientUsers)
    }
  }

  // Get users list for admin dashboard (without passwords)
  const users = computed(() => {
    const clientList = clientUsers.value.map(({ password, ...user }) => user)
    // Include admin user if logged in as admin
    if (user.value?.role === 'admin') {
      return [
        {
          id: 'admin-1',
          email: 'admin@gmail.com',
          name: 'Administrator',
          role: 'admin' as const
        },
        ...clientList
      ]
    }
    return clientList
  })

  return {
    user,
    users,
    isAuthenticated,
    login,
    register,
    logout,
    initialize
  }
})

