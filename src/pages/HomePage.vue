<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-purple-800">
    <!-- Navigation -->
    <nav class="bg-gradient-to-r from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md shadow-lg border-b border-purple-500/30 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <h1 class="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">Real Estate Management</h1>
          </div>
          <div class="flex items-center space-x-2 sm:space-x-4">
            <router-link
              to="/login"
              class="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-purple-200 hover:text-white font-medium transition"
            >
              Login
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

    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
      <div class="text-center">
        <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-200 via-blue-200 to-purple-300 bg-clip-text text-transparent mb-4 sm:mb-6 drop-shadow-lg">
          Find Your Dream Property
        </h2>
        <p class="text-lg sm:text-xl text-purple-100 mb-8 sm:mb-12 max-w-2xl mx-auto">
          Discover the perfect real estate property that matches your needs. Browse through our extensive collection of properties.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/register"
            class="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition text-base sm:text-lg font-semibold shadow-lg shadow-purple-500/50"
          >
            Get Started
          </router-link>
          <router-link
            to="/login"
            class="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-md text-purple-200 border-2 border-purple-400/50 rounded-lg hover:bg-white/20 transition text-base sm:text-lg font-semibold"
          >
            Sign In
          </router-link>
        </div>
      </div>
    </div>

    <!-- AI Chatbot Section -->
    <div class="bg-gradient-to-br from-purple-800/50 via-blue-800/50 to-purple-900/50 py-12 sm:py-16 lg:py-20 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 sm:mb-12">
          <h3 class="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent mb-3 sm:mb-4">
            Explore Properties with AI Assistant
          </h3>
          <p class="text-base sm:text-lg text-purple-100 max-w-2xl mx-auto">
            Use our AI chatbot to discover available properties. Click the floating button or explore below!
          </p>
        </div>
        
        <!-- Embedded Chatbot -->
        <div class="max-w-4xl mx-auto">
          <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-400/30 overflow-hidden">
            <!-- Chat Header -->
            <div class="px-4 sm:px-6 py-4 sm:py-5 border-b border-purple-400/30 flex justify-between items-center bg-gradient-to-r from-purple-700 via-blue-700 to-purple-600 text-white">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 class="text-lg sm:text-xl font-semibold">AI Property Assistant</h4>
                  <p class="text-xs sm:text-sm text-purple-200">Browse available properties</p>
                </div>
              </div>
            </div>

            <!-- Chat Content -->
            <div class="p-4 sm:p-6 max-h-[500px] sm:max-h-[600px] overflow-y-auto">
              <!-- Welcome Message -->
              <div class="mb-4">
                <div class="max-w-[85%] sm:max-w-md px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30">
                  <p class="text-sm sm:text-base text-purple-100">
                    👋 Hello! I'm your AI Property Assistant. I can help you explore our available real estate properties. Choose a property below to see details!
                  </p>
                </div>
              </div>

              <!-- Property Choices -->
              <div v-if="availableProperties && availableProperties.length > 0" class="space-y-3">
                <div class="text-sm sm:text-base text-purple-200 font-medium">
                  <span class="text-purple-300 font-semibold">📋 Available Properties:</span>
                  <span class="text-purple-200/70 ml-1">({{ availableProperties.length }} property{{ availableProperties.length !== 1 ? 'ies' : '' }})</span>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <button
                    v-for="property in availableProperties"
                    :key="property.id"
                    @click="selectProperty(property)"
                    @mouseenter="hoveredPropertyId = property.id"
                    @mouseleave="hoveredPropertyId = null"
                    class="text-left p-4 bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur-sm border-2 rounded-lg transition-all duration-200 shadow-lg active:scale-[0.98] relative overflow-hidden group"
                    :class="hoveredPropertyId === property.id 
                      ? 'border-purple-400 bg-gradient-to-r from-purple-600/60 to-blue-600/60 shadow-xl shadow-purple-500/50' 
                      : 'border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-700/30'"
                  >
                    <!-- Hover effect background -->
                    <div class="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    
                    <div class="flex flex-col gap-2 relative z-10">
                      <div class="flex items-center gap-2">
                        <h4 class="font-semibold text-purple-100 text-base sm:text-lg">{{ property.title }}</h4>
                        <span class="text-xs px-1.5 py-0.5 bg-purple-500/50 text-purple-200 rounded-full font-medium">✨</span>
                      </div>
                      <p class="text-xs sm:text-sm text-purple-200/80 line-clamp-2">{{ property.address }}</p>
                      
                      <!-- Quick insights preview on hover -->
                      <div v-if="hoveredPropertyId === property.id" class="p-2 bg-purple-900/80 backdrop-blur-sm rounded border border-purple-400/30 mt-1">
                        <p class="text-xs text-purple-200 font-medium mb-1">💡 Why it's cool:</p>
                        <p class="text-xs text-purple-100 line-clamp-2">{{ getPropertyInsights(property) }}</p>
                      </div>
                      
                      <div class="flex items-center justify-between pt-2 border-t border-purple-400/30">
                        <div>
                          <p class="text-base sm:text-lg font-bold text-blue-300">₱{{ (property.price || 0).toLocaleString() }}</p>
                          <span class="text-xs px-2 py-0.5 bg-green-500/30 text-green-200 rounded-full font-medium border border-green-400/30">Available</span>
                        </div>
                        <svg class="w-5 h-5 text-purple-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div v-else class="text-center py-8">
                <p class="text-sm sm:text-base text-purple-200/70">No available properties at the moment. Please check back later!</p>
              </div>

              <!-- Selected Property Details -->
              <div v-if="selectedProperty" class="mt-6 space-y-4">
                <div class="bg-gradient-to-br from-purple-800/60 to-blue-800/60 backdrop-blur-sm border border-purple-400/30 rounded-lg p-4 sm:p-6 shadow-xl">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <h4 class="font-bold text-purple-100 text-lg sm:text-xl mb-1">{{ selectedProperty.title }}</h4>
                      <span :class="[
                        'inline-block px-2 py-1 rounded-full text-xs font-semibold',
                        selectedProperty.status === 'available' 
                          ? 'bg-green-500/30 text-green-200 border border-green-400/30' 
                          : 'bg-purple-500/30 text-purple-200 border border-purple-400/30'
                      ]">
                        {{ selectedProperty.status === 'available' ? '✓ Available Now' : 'Not Available' }}
                      </span>
                    </div>
                    <button
                      @click="clearSelection"
                      class="text-purple-200 hover:text-white transition ml-2"
                      aria-label="Close details"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <!-- Property Insights -->
                  <div class="mb-4 p-3 bg-purple-900/60 backdrop-blur-sm rounded-lg border border-purple-400/30">
                    <div class="flex items-start gap-2">
                      <span class="text-lg">💡</span>
                      <div class="flex-1">
                        <p class="text-xs sm:text-sm font-semibold text-purple-200 mb-1">Why This Property is Amazing:</p>
                        <p class="text-xs sm:text-sm text-purple-100 leading-relaxed">{{ getPropertyInsights(selectedProperty) }}</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Property Image -->
                  <div v-if="selectedProperty.photos && selectedProperty.photos.length > 0" class="mb-4">
                    <img 
                      :src="selectedProperty.photos[0]" 
                      :alt="selectedProperty.title"
                      class="w-full h-48 sm:h-64 object-cover rounded-lg border border-purple-400/30"
                    />
                  </div>
                  <div v-else class="mb-4 w-full h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg class="w-16 h-16 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>

                  <div class="mb-4">
                    <p class="text-xs sm:text-sm font-semibold text-purple-200 mb-1">Description:</p>
                    <p class="text-sm sm:text-base text-purple-100">{{ selectedProperty.description }}</p>
                  </div>
                  
                  <div class="space-y-3 text-sm sm:text-base">
                    <div class="text-xs sm:text-sm font-semibold text-purple-200 mb-1">Property Details:</div>
                    <div class="flex items-center gap-2">
                      <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="text-purple-100">{{ selectedProperty.address }}</span>
                    </div>
                    
                    <div v-if="selectedProperty.bedrooms || selectedProperty.bathrooms || selectedProperty.area" class="flex flex-wrap gap-4 sm:gap-6">
                      <div v-if="selectedProperty.bedrooms" class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="text-purple-100">{{ selectedProperty.bedrooms }} Bed{{ selectedProperty.bedrooms !== 1 ? 's' : '' }}</span>
                      </div>
                      <div v-if="selectedProperty.bathrooms" class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span class="text-purple-100">{{ selectedProperty.bathrooms }} Bath{{ selectedProperty.bathrooms !== 1 ? 's' : '' }}</span>
                      </div>
                      <div v-if="selectedProperty.area" class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span class="text-purple-100">{{ selectedProperty.area }} sq ft</span>
                      </div>
                    </div>

                    <!-- Category Info -->
                    <div v-if="categoryStore.getCategoryById(selectedProperty.categoryId)" class="flex items-center gap-2 pt-2 border-t border-purple-400/30">
                      <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span class="text-purple-100 text-xs sm:text-sm">
                        Category: <span class="font-semibold text-purple-200">{{ categoryStore.getCategoryById(selectedProperty.categoryId)?.name || 'N/A' }}</span>
                      </span>
                    </div>
                    
                    <div class="flex items-center justify-between pt-3 border-t border-purple-400/30">
                      <div>
                        <p class="text-xs text-purple-200/70 mb-0.5">Price</p>
                        <span class="text-xl sm:text-2xl font-bold text-blue-300">₱{{ (selectedProperty.price || 0).toLocaleString() }}</span>
                      </div>
                      <div class="text-right">
                        <p class="text-xs text-purple-200/70 mb-0.5">Price per sq ft</p>
                        <span class="text-sm font-semibold text-purple-200">
                          ₱{{ selectedProperty.area ? Math.round((selectedProperty.price || 0) / selectedProperty.area).toLocaleString() : 'N/A' }}
                        </span>
                      </div>
                    </div>

                    <div class="pt-3">
                      <router-link
                        to="/register"
                        class="block w-full text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition text-sm sm:text-base font-medium shadow-lg shadow-purple-500/50"
                      >
                        Register to Purchase
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-purple-800/80 backdrop-blur-sm py-12 sm:py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent mb-8 sm:mb-12">
          Why Choose Us?
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div class="text-center p-6 bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur-sm rounded-lg border border-purple-400/30 shadow-lg">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-purple-100 mb-2">Wide Selection</h4>
            <p class="text-purple-200/80">Browse through hundreds of properties across different categories</p>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur-sm rounded-lg border border-purple-400/30 shadow-lg">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-purple-100 mb-2">Secure Platform</h4>
            <p class="text-purple-200/80">Your data and transactions are protected with industry-standard security</p>
          </div>
          <div class="text-center p-6 bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur-sm rounded-lg border border-purple-400/30 shadow-lg">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/50">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-purple-100 mb-2">24/7 Support</h4>
            <p class="text-purple-200/80">Get help anytime with our dedicated customer support team</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-800 border-t border-purple-500/30 text-white py-8 sm:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-sm sm:text-base text-purple-200/70 mb-2">
            © 2024 Real Estate Management System. All rights reserved.
          </p>
          <p class="text-sm sm:text-base text-purple-300 font-semibold">
            Developed by <span class="text-blue-300">Raminder Jangao</span>
          </p>
        </div>
      </div>
    </footer>

    <!-- AI Chat Bot -->
    <AIChatBot />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePropertyStore, type Property } from '@/stores/property'
import { useCategoryStore } from '@/stores/category'
import AIChatBot from '@/components/AIChatBot.vue'

const propertyStore = usePropertyStore()
const categoryStore = useCategoryStore()
const selectedProperty = ref<Property | null>(null)
const hoveredPropertyId = ref<string | null>(null)

const availableProperties = computed(() => {
  if (!propertyStore.properties || !Array.isArray(propertyStore.properties)) {
    return []
  }
  return propertyStore.properties
    .filter(p => p && p.status === 'available')
    .slice(0, 6) // Show max 6 properties in embedded view
})

// Generate insights about why a property is cool/interesting
const getPropertyInsights = (property: Property): string => {
  const insights: string[] = []
  
  if (property.bedrooms && property.bedrooms >= 4) {
    insights.push(`🏠 Spacious ${property.bedrooms}-bedroom layout perfect for large families`)
  } else if (property.bedrooms) {
    insights.push(`🏡 Cozy ${property.bedrooms}-bedroom design ideal for small families or couples`)
  }
  
  if (property.area && property.area > 3000) {
    insights.push(`📐 Generous ${property.area.toLocaleString()} sq ft of living space`)
  } else if (property.area) {
    insights.push(`📏 Comfortable ${property.area.toLocaleString()} sq ft floor plan`)
  }
  
  if (property.price && property.price < 300000) {
    insights.push(`💰 Excellent value at ₱${property.price.toLocaleString()} - great investment opportunity`)
  } else if (property.price && property.price < 500000) {
    insights.push(`💵 Competitive pricing at ₱${property.price.toLocaleString()} for this premium location`)
  } else {
    insights.push(`💎 Premium property at ₱${property.price.toLocaleString()} with luxury features`)
  }
  
  if (property.address) {
    if (property.address.toLowerCase().includes('ocean') || property.address.toLowerCase().includes('beach')) {
      insights.push(`🌊 Prime waterfront location with stunning views`)
    } else if (property.address.toLowerCase().includes('downtown') || property.address.toLowerCase().includes('business')) {
      insights.push(`🏙️ Prime downtown location with excellent accessibility`)
    } else if (property.address.toLowerCase().includes('country') || property.address.toLowerCase().includes('road')) {
      insights.push(`🌳 Peaceful location away from city noise`)
    }
  }
  
  if (property.photos && property.photos.length > 0) {
    insights.push(`📸 ${property.photos.length} professional photo${property.photos.length > 1 ? 's' : ''} available`)
  }
  
  // Category-based insights
  const category = categoryStore.getCategoryById(property.categoryId)
  if (category) {
    if (category.name === 'Residential') {
      insights.push(`🏘️ Perfect residential property in a great neighborhood`)
    } else if (category.name === 'Commercial') {
      insights.push(`💼 Ideal commercial space for business growth`)
    } else if (category.name === 'Land') {
      insights.push(`🌱 Development-ready land with great potential`)
    }
  }
  
  return insights.length > 0 ? insights.join(' • ') : '✨ A unique property with great potential!'
}

const selectProperty = (property: Property) => {
  selectedProperty.value = property
}

const clearSelection = () => {
  selectedProperty.value = null
}

onMounted(() => {
  // Ensure property store is initialized and loaded
  propertyStore.loadFromLocalStorage()
  categoryStore.loadFromLocalStorage()
  
  // Double-check that properties array exists
  if (!propertyStore.properties) {
    // Force initialization by calling loadFromLocalStorage again
    propertyStore.loadFromLocalStorage()
  }
})
</script>

