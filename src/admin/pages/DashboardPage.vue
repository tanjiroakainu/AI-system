<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
    <nav class="bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md shadow-lg border-b border-purple-500/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <h1 class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Real Estate Management - Admin</h1>
          </div>
          <div class="flex items-center space-x-2 sm:space-x-4">
            <span class="text-xs sm:text-sm text-purple-200 hidden sm:inline">Welcome, {{ authStore.user?.name }}</span>
            <button
              @click="handleLogout"
              class="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div class="mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">Admin Dashboard</h2>
        <p class="text-sm sm:text-base text-purple-200">Manage the real estate system and all users</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-purple-600 mb-1">Total Clients</p>
              <p class="text-3xl font-bold text-purple-800">{{ totalClients }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-purple-600 mb-1">Total Properties</p>
              <p class="text-3xl font-bold text-purple-800">{{ totalProperties }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-purple-600 mb-1">Total Categories</p>
              <p class="text-3xl font-bold text-purple-800">{{ totalCategories }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-purple-600 mb-1">Total Revenue</p>
              <p class="text-3xl font-bold text-purple-800">₱{{ totalRevenue.toLocaleString() }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Management -->
      <div class="mb-8">
        <CategoryManagement />
      </div>

      <!-- Property Management -->
      <div class="mb-8">
        <PropertyManagement />
      </div>

      <!-- Payment Method Management -->
      <div class="mb-8">
        <PaymentMethodManagement />
      </div>

      <!-- Purchase & Appointment Management -->
      <div class="mb-8">
        <PurchaseManagement />
      </div>

      <!-- Floating Chat Management -->
      <ChatManagement />

      <!-- Registered Clients -->
      <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow">
        <div class="px-3 sm:px-6 py-3 sm:py-4 border-b">
          <h3 class="text-lg sm:text-xl font-semibold text-purple-800">Registered Clients</h3>
        </div>
        <div class="overflow-x-auto -mx-3 sm:mx-0">
          <table class="w-full min-w-[500px]">
            <thead class="bg-purple-50">
              <tr>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Name</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Email</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Role</th>
                <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider hidden md:table-cell">ID</th>
              </tr>
            </thead>
            <tbody class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md divide-y divide-gray-200">
              <tr v-if="clients.length === 0">
                <td colspan="4" class="px-6 py-4 text-center text-purple-500">
                  No clients registered yet
                </td>
              </tr>
              <tr v-for="client in clients" :key="client.id" class="hover:bg-purple-50">
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-900">
                  {{ client.name }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-500">
                  {{ client.email }}
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-500/30 text-purple-200">
                    {{ client.role }}
                  </span>
                </td>
                <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-500 hidden md:table-cell">
                  {{ client.id }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-8 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold text-purple-800 mb-4">Admin Information</h3>
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b">
            <span class="text-purple-600">Name:</span>
            <span class="font-medium text-purple-800">{{ authStore.user?.name }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-purple-600">Email:</span>
            <span class="font-medium text-purple-800">{{ authStore.user?.email }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-purple-600">Role:</span>
            <span class="font-medium bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent capitalize">{{ authStore.user?.role }}</span>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="mt-8 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow border border-purple-400/30 text-white py-6">
        <div class="text-center">
          <p class="text-sm text-purple-200/70 mb-2">
            © 2024 Real Estate Management System. All rights reserved.
          </p>
          <p class="text-sm text-purple-300 font-semibold">
            Developed by <span class="text-blue-300">Raminder Jangao</span>
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePropertyStore } from '@/stores/property'
import { useCategoryStore } from '@/stores/category'
import { usePaymentMethodStore } from '@/stores/paymentMethod'
import { usePaymentStore } from '@/stores/payment'
import CategoryManagement from '@/admin/components/CategoryManagement.vue'
import PropertyManagement from '@/admin/components/PropertyManagement.vue'
import PaymentMethodManagement from '@/admin/components/PaymentMethodManagement.vue'
import PurchaseManagement from '@/admin/components/PurchaseManagement.vue'
import ChatManagement from '@/admin/components/ChatManagement.vue'

const router = useRouter()
const authStore = useAuthStore()
const propertyStore = usePropertyStore()
const categoryStore = useCategoryStore()
const paymentMethodStore = usePaymentMethodStore()
const paymentStore = usePaymentStore()

const clients = computed(() => {
  return authStore.users.filter(user => user.role === 'client')
})

const totalClients = computed(() => clients.value.length)
const totalProperties = computed(() => propertyStore.properties.length)
const totalCategories = computed(() => categoryStore.categories.length)
const totalRevenue = computed(() => {
  return paymentStore.payments
    .filter(p => p && p.status === 'completed')
    .reduce((sum, p) => sum + (p.amount || 0), 0)
})

onMounted(() => {
  authStore.initialize()
  propertyStore.loadFromLocalStorage()
  categoryStore.loadFromLocalStorage()
  paymentMethodStore.loadFromLocalStorage()
  paymentStore.loadFromLocalStorage()
})

const handleLogout = async () => {
  try {
    authStore.logout()
    // Wait for next tick to ensure state is cleared
    await nextTick()
    // Use replace instead of push to avoid history issues
    await router.replace('/login')
  } catch (error) {
    console.error('Logout navigation error:', error)
    // Fallback to direct navigation if router fails
    window.location.href = '/login'
  }
}
</script>

