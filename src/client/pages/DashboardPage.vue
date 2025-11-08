<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
    <nav class="bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md shadow-lg border-b border-purple-500/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <h1 class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Real Estate Management</h1>
          </div>
          <div class="flex items-center space-x-2 sm:space-x-4">
            <span class="text-xs sm:text-sm text-purple-200 hidden sm:inline">Welcome, {{ authStore.user?.name }}</span>
            <button
              @click="handleLogout"
              class="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div class="mb-6 sm:mb-8">
        <h2 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">Browse Properties</h2>
        <p class="text-sm sm:text-base text-purple-200">Explore available real estate properties</p>
      </div>

      <!-- Filters -->
      <div class="mb-6 bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow-xl border border-purple-400/30 p-3 sm:p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label for="categoryFilter" class="block text-sm font-medium text-purple-200 mb-2">
              Filter by Category
            </label>
            <select
              id="categoryFilter"
              v-model="selectedCategory"
              class="w-full px-3 py-2 bg-purple-800/40 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-purple-100"
            >
              <option value="">All Categories</option>
              <option v-for="category in categoryStore.categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="statusFilter" class="block text-sm font-medium text-purple-200 mb-2">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              v-model="selectedStatus"
              class="w-full px-3 py-2 bg-purple-800/40 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-purple-100"
            >
              <option value="">All Properties</option>
              <option value="available">Available Only</option>
              <option value="not_available">Not Available</option>
            </select>
          </div>
          <div>
            <label for="search" class="block text-sm font-medium text-purple-200 mb-2">
              Search Properties
            </label>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              placeholder="Search by title or address..."
              class="w-full px-3 py-2 bg-purple-800/40 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none text-purple-100 placeholder-purple-300/50"
            />
          </div>
        </div>
      </div>

      <!-- Statistics -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow-xl border border-purple-400/30 p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-purple-200/80 mb-1">Total Properties</p>
              <p class="text-3xl font-bold text-purple-100">{{ filteredProperties.length }}</p>
            </div>
            <div class="w-12 h-12 bg-purple-500/30 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-purple-200/80 mb-1">Available Properties</p>
              <p class="text-3xl font-bold text-purple-100">{{ availableCount }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-purple-200/80 mb-1">Categories</p>
              <p class="text-3xl font-bold text-purple-100">{{ categoryStore.categories.length }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Properties Grid -->
      <div v-if="filteredProperties.length === 0" class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-12 text-center">
        <svg class="mx-auto h-12 w-12 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-purple-100">No properties found</h3>
        <p class="mt-1 text-sm text-purple-200/70">Try adjusting your filters or check back later.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div
          v-for="property in filteredProperties"
          :key="property.id"
          class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow hover:shadow-lg transition overflow-hidden"
        >
          <!-- Property Photos -->
          <div v-if="property.photos && property.photos.length > 0" class="h-48 overflow-hidden">
            <img :src="property.photos[0]" :alt="property.title" class="w-full h-full object-cover" />
          </div>
          <div v-else class="h-48 bg-purple-800/40 flex items-center justify-center">
            <svg class="w-16 h-16 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div class="p-6">
            <div class="flex justify-between items-start mb-3">
              <h3 class="text-lg font-semibold text-purple-100">{{ property.title }}</h3>
              <span
                :class="property.status === 'available'
                  ? 'px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'
                  : 'px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'"
              >
                {{ property.status === 'available' ? 'Available' : 'Not Available' }}
              </span>
            </div>
            
            <p class="text-sm text-purple-200/80 mb-4 line-clamp-2">{{ property.description }}</p>
            
            <!-- View All Photos Button -->
            <div v-if="property.photos && property.photos.length > 0" class="mb-4">
              <button
                @click="viewPropertyPhotos(property)"
                class="text-sm text-purple-300 hover:text-purple-100 flex items-center gap-1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                View All Photos ({{ property.photos.length }})
              </button>
            </div>
            
            <div class="space-y-2 mb-4">
              <div class="flex items-center text-sm text-purple-200/80">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ property.address }}
              </div>
              
              <div class="flex items-center text-sm text-purple-200/80">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {{ getCategoryName(property.categoryId) }}
              </div>
              
              <div v-if="property.bedrooms || property.bathrooms || property.area" class="flex items-center gap-4 text-sm text-purple-200/80">
                <span v-if="property.bedrooms">{{ property.bedrooms }} Bed</span>
                <span v-if="property.bathrooms">{{ property.bathrooms }} Bath</span>
                <span v-if="property.area">{{ property.area }} sq ft</span>
              </div>
            </div>
            
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t">
              <span class="text-xl sm:text-2xl font-bold text-purple-300">₱{{ (property.price || 0).toLocaleString() }}</span>
              <button
                v-if="property.status === 'available'"
                @click="buyProperty(property)"
                class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition text-sm font-medium cursor-pointer"
              >
                Buy Property
              </button>
              <span v-else class="w-full sm:w-auto px-4 py-2 bg-gray-300 text-purple-200/80 rounded-lg text-sm font-medium cursor-not-allowed text-center">
                Not Available
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- View Property Photos Modal -->
      <div v-if="showPhotosModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-2 sm:p-4" @click.self="closePhotosModal">
        <div class="relative top-2 sm:top-10 mx-auto p-4 sm:p-5 border w-full max-w-4xl shadow-lg rounded-md bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md my-2 sm:my-10">
          <div class="mt-3">
            <h3 class="text-base sm:text-lg font-medium text-purple-100 mb-4">
              {{ viewingProperty?.title }} - All Photos
            </h3>
            <div v-if="viewingProperty && viewingProperty.photos && viewingProperty.photos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div v-for="(photo, index) in viewingProperty.photos" :key="index" class="relative">
                <img :src="photo" :alt="`${viewingProperty.title} - Photo ${index + 1}`" class="w-full h-64 object-cover rounded border border-purple-400/30" />
              </div>
            </div>
            <div v-else class="text-center text-purple-200/70 py-8">
              No photos available for this property
            </div>
            <div class="mt-6 flex justify-end">
              <button
                @click="closePhotosModal"
                class="px-4 py-2 bg-purple-800/40 text-purple-100 rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Buy Property Modal -->
      <div v-if="showBuyModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-2 sm:p-4" @click.self="closeBuyModal">
        <div class="relative top-2 sm:top-10 mx-auto p-4 sm:p-5 border w-full max-w-2xl shadow-lg rounded-md bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md my-2 sm:my-10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
          <div class="mt-3">
            <h3 class="text-base sm:text-lg font-medium text-purple-100 mb-4">Buy Property & Schedule Appointment</h3>
            <div v-if="selectedPropertyForPurchase" class="space-y-3 sm:space-y-4">
              <div>
                <p class="text-sm text-purple-200/80 mb-1">Property:</p>
                <p class="font-semibold text-purple-100">{{ selectedPropertyForPurchase.title }}</p>
                <p class="text-lg font-bold text-purple-300 mt-2">₱{{ (selectedPropertyForPurchase.price || 0).toLocaleString() }}</p>
              </div>
              
              <div>
                <label for="buyPaymentMethod" class="block text-sm font-medium text-purple-200 mb-2">
                  Payment Method *
                </label>
                <select
                  id="buyPaymentMethod"
                  v-model="buyForm.paymentMethod"
                  required
                  class="w-full px-3 py-2 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                >
                  <option value="">Select payment method</option>
                  <option v-for="method in activePaymentMethods" :key="method.id" :value="method.name">
                    {{ method.name }}
                  </option>
                </select>
              </div>

              <!-- Appointment Section -->
              <div class="border-t pt-4 mt-4">
                <h4 class="text-md font-semibold text-purple-100 mb-3">Schedule Appointment Meeting</h4>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label for="appointmentDate" class="block text-sm font-medium text-purple-200 mb-2">
                      Appointment Date *
                    </label>
                    <input
                      id="appointmentDate"
                      v-model="buyForm.appointmentDate"
                      type="date"
                      required
                      :min="new Date().toISOString().split('T')[0]"
                      class="w-full px-3 py-2 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                    />
                  </div>
                  <div>
                    <label for="appointmentTime" class="block text-sm font-medium text-purple-200 mb-2">
                      Appointment Time *
                    </label>
                    <input
                      id="appointmentTime"
                      v-model="buyForm.appointmentTime"
                      type="time"
                      required
                      class="w-full px-3 py-2 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                    />
                  </div>
                </div>

                <div class="mt-4">
                  <label for="appointmentNotes" class="block text-sm font-medium text-purple-200 mb-2">
                    Appointment Notes (optional)
                  </label>
                  <textarea
                    id="appointmentNotes"
                    v-model="buyForm.appointmentNotes"
                    rows="3"
                    class="w-full px-3 py-2 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                    placeholder="Any special requests or notes for the appointment..."
                  ></textarea>
                </div>
              </div>

              <div>
                <label for="buyNotes" class="block text-sm font-medium text-purple-200 mb-2">
                  Payment Notes (optional)
                </label>
                <textarea
                  id="buyNotes"
                  v-model="buyForm.notes"
                  rows="3"
                  class="w-full px-3 py-2 border border-purple-400/30 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  placeholder="Additional notes about the payment..."
                ></textarea>
              </div>

              <div class="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 sm:space-x-3 pt-4">
                <button
                  type="button"
                  @click="closeBuyModal"
                  class="w-full sm:w-auto px-4 py-2 bg-purple-800/40 text-purple-100 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  @click="confirmBuyProperty"
                  class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition"
                >
                  Confirm Purchase & Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Management -->
      <div class="mb-8">
        <PaymentManagement />
      </div>

      <!-- Floating Chat Component -->
      <ChatComponent />

      <!-- Account Information -->
      <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold text-purple-100 mb-4">Account Information</h3>
        <div class="space-y-3">
          <div class="flex justify-between py-2 border-b">
            <span class="text-purple-200/80">Name:</span>
            <span class="font-medium text-purple-100">{{ authStore.user?.name }}</span>
          </div>
          <div class="flex justify-between py-2 border-b">
            <span class="text-purple-200/80">Email:</span>
            <span class="font-medium text-purple-100">{{ authStore.user?.email }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-purple-200/80">Role:</span>
            <span class="font-medium text-purple-300 capitalize">{{ authStore.user?.role }}</span>
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
import { computed, onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePropertyStore } from '@/stores/property'
import { useCategoryStore } from '@/stores/category'
import { usePaymentStore } from '@/stores/payment'
import { usePaymentMethodStore } from '@/stores/paymentMethod'
import PaymentManagement from '@/client/components/PaymentManagement.vue'
import ChatComponent from '@/client/components/ChatComponent.vue'

const router = useRouter()
const authStore = useAuthStore()
const propertyStore = usePropertyStore()
const categoryStore = useCategoryStore()
const paymentStore = usePaymentStore()
const paymentMethodStore = usePaymentMethodStore()

const selectedCategory = ref('')
const selectedStatus = ref('')
const searchQuery = ref('')
const showBuyModal = ref(false)
const showPhotosModal = ref(false)
const viewingProperty = ref<any>(null)
const selectedPropertyForPurchase = ref<any>(null)
const buyForm = ref({
  paymentMethod: '',
  notes: '',
  appointmentDate: '',
  appointmentTime: '',
  appointmentNotes: ''
})

const activePaymentMethods = computed(() => {
  return paymentMethodStore.getActivePaymentMethods()
})

const filteredProperties = computed(() => {
  let properties = propertyStore.properties

  // Filter by category
  if (selectedCategory.value) {
    properties = properties.filter(p => p.categoryId === selectedCategory.value)
  }

  // Filter by status
  if (selectedStatus.value) {
    properties = properties.filter(p => p.status === selectedStatus.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    properties = properties.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.address.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }

  return properties
})

const availableCount = computed(() => {
  return propertyStore.properties.filter(p => p.status === 'available').length
})

const getCategoryName = (categoryId: string): string => {
  const category = categoryStore.getCategoryById(categoryId)
  return category ? category.name : 'Unknown'
}

const buyProperty = (property: any) => {
  if (!authStore.user) return
  
  selectedPropertyForPurchase.value = property
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  buyForm.value = {
    paymentMethod: activePaymentMethods.value.length > 0 ? activePaymentMethods.value[0].name : '',
    notes: '',
    appointmentDate: tomorrow.toISOString().split('T')[0],
    appointmentTime: '10:00',
    appointmentNotes: ''
  }
  showBuyModal.value = true
}

const closeBuyModal = () => {
  showBuyModal.value = false
  selectedPropertyForPurchase.value = null
  buyForm.value = {
    paymentMethod: '',
    notes: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentNotes: ''
  }
}

const viewPropertyPhotos = (property: any) => {
  viewingProperty.value = property
  showPhotosModal.value = true
}

const closePhotosModal = () => {
  showPhotosModal.value = false
  viewingProperty.value = null
}

const confirmBuyProperty = () => {
  if (!authStore.user || !selectedPropertyForPurchase.value) return

  if (!buyForm.value.appointmentDate || !buyForm.value.appointmentTime) {
    alert('Please fill in all required appointment fields.')
    return
  }

  paymentStore.buyProperty(
    selectedPropertyForPurchase.value.id,
    selectedPropertyForPurchase.value.title,
    authStore.user.id,
    authStore.user.name,
    selectedPropertyForPurchase.value.price,
    buyForm.value.paymentMethod,
    buyForm.value.notes || undefined,
    buyForm.value.appointmentDate,
    buyForm.value.appointmentTime,
    buyForm.value.appointmentNotes || undefined
  )

  alert(`Purchase confirmed! Payment record and appointment scheduled for ${selectedPropertyForPurchase.value.title}. Check Payment Management section for details.`)
  closeBuyModal()
}

onMounted(() => {
  authStore.initialize()
  propertyStore.loadFromLocalStorage()
  categoryStore.loadFromLocalStorage()
  paymentStore.loadFromLocalStorage()
  paymentMethodStore.loadFromLocalStorage()
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

