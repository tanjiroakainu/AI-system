<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
    <!-- Navigation -->
    <nav class="bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md shadow-lg border-b border-purple-500/30 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <router-link to="/" class="flex items-center">
            <h1 class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Real Estate Management</h1>
          </router-link>
          <div class="flex items-center space-x-2 sm:space-x-4">
            <router-link
              to="/"
              class="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-purple-200 hover:text-white font-medium transition flex items-center gap-1 sm:gap-2"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </router-link>
            <router-link
              to="/register"
              class="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition shadow-lg shadow-purple-500/50"
            >
              Register
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
      <div class="max-w-md w-full bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow-2xl border border-purple-400/30 p-6 sm:p-8">
      <div class="text-center mb-6 sm:mb-8">
        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-purple-500/50">
          <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">Login</h1>
        <p class="text-sm sm:text-base text-purple-200">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-purple-200 mb-2">
            Email Address
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-purple-800/40 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition text-base text-purple-100 placeholder-purple-300/50"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-purple-200 mb-2">
            Password
          </label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-3 bg-purple-800/40 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none transition text-base text-purple-100 placeholder-purple-300/50"
            placeholder="Enter your password"
          />
        </div>

        <div v-if="error" class="bg-red-500/20 border border-red-400/30 text-red-200 px-4 py-3 rounded-lg">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-900 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/50"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-purple-200">
          Don't have an account?
          <router-link to="/register" class="text-purple-300 hover:text-white font-medium">
            Register here
          </router-link>
        </p>
      </div>

      <div class="mt-4 p-4 bg-purple-800/40 backdrop-blur-sm border border-purple-400/30 rounded-lg">
        <p class="text-xs text-purple-200 text-center">
          <strong class="text-purple-100">Admin Credentials:</strong><br>
          Email: admin@gmail.com<br>
          Password: admin123
        </p>
      </div>
      </div>
    </div>

    <!-- AI Chat Bot -->
    <AIChatBot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AIChatBot from '@/components/AIChatBot.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    const success = authStore.login(form.value.email, form.value.password)

    if (success) {
      if (authStore.user?.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/client/dashboard')
      }
    } else {
      error.value = 'Invalid email or password. Please check your credentials.'
    }
  } catch (err) {
    error.value = 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

