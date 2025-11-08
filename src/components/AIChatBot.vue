<template>
  <!-- Floating AI Chat Button -->
  <button
    @click="toggleChat"
    class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-500 hover:via-blue-500 hover:to-purple-600 text-white rounded-full shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transition-all duration-300 flex items-center justify-center group"
    aria-label="Open AI chat"
  >
    <svg class="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  </button>

  <!-- Floating AI Chat Window -->
  <Transition name="chat-window">
    <div
      v-if="isOpen"
      class="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 lg:w-[420px] bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-purple-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-purple-400/30 flex flex-col max-h-[calc(100vh-7rem)] sm:max-h-[600px] overflow-hidden"
      style="box-shadow: 0 20px 25px -5px rgba(147, 51, 234, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2);"
    >
      <!-- Chat Header -->
      <div class="px-3 sm:px-4 py-3 sm:py-4 border-b border-purple-400/30 flex justify-between items-center bg-gradient-to-r from-purple-700 via-blue-700 to-purple-600 text-white rounded-t-2xl">
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-semibold">AI Property Assistant</h3>
            <p class="text-xs sm:text-sm text-purple-200">Ask about available properties</p>
          </div>
        </div>
        <button
          @click="toggleChat"
          class="p-1.5 hover:bg-white/20 rounded-full transition"
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
          <!-- Welcome Message -->
          <div v-if="messages.length === 0" class="flex justify-start">
            <div class="max-w-[85%] sm:max-w-xs md:max-w-md px-3 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30">
              <p class="text-sm sm:text-base text-purple-100 mb-2">
                👋 Hello! I'm your AI Property Assistant. I can help you explore our amazing real estate properties!
              </p>
              <p class="text-xs sm:text-sm text-purple-200/80">
                💡 Each property has unique features and insights. Click on any property below to discover why it's special and see detailed information!
              </p>
            </div>
          </div>

          <!-- Messages List -->
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="[
              'flex',
              msg.type === 'bot' ? 'justify-start' : 'justify-end'
            ]"
          >
            <div
              :class="[
                'max-w-[85%] sm:max-w-xs md:max-w-md px-3 sm:px-4 py-2 rounded-lg break-words',
                msg.type === 'bot'
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-100'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              ]"
            >
              <p class="text-sm sm:text-base break-words">{{ msg.text }}</p>
              <p
                v-if="msg.type === 'bot'"
                class="text-xs mt-1 text-purple-200/60"
              >
                {{ formatTime(msg.timestamp) }}
              </p>
            </div>
          </div>

          <!-- Property Choices -->
          <div v-if="showPropertyChoices && isOpen" class="space-y-2 mt-2">
            <div v-if="availableProperties.length > 0" class="text-xs sm:text-sm text-purple-200 font-medium px-1 mb-2">
              <span class="font-semibold text-purple-300">📋 Available Properties:</span>
              <span class="text-purple-200/70 ml-1">({{ availableProperties.length }} property{{ availableProperties.length !== 1 ? 'ies' : '' }})</span>
            </div>
            <div v-else class="text-center py-4">
              <p class="text-sm text-purple-200/70">No available properties at the moment. Please check back later!</p>
            </div>
            <button
              v-for="property in availableProperties"
              :key="property.id"
              @click="selectProperty(property)"
              @mouseenter="hoveredPropertyId = property.id"
              @mouseleave="hoveredPropertyId = null"
              class="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-br from-purple-800/40 to-blue-800/40 backdrop-blur-sm border-2 rounded-lg transition-all duration-200 shadow-lg active:scale-[0.98] relative overflow-hidden group"
              :class="hoveredPropertyId === property.id 
                ? 'border-purple-400 bg-gradient-to-r from-purple-600/60 to-blue-600/60 shadow-xl shadow-purple-500/50' 
                : 'border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-700/30'"
            >
              <!-- Hover effect background -->
              <div class="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              
              <div class="flex items-start justify-between gap-2 relative z-10">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h4 class="font-semibold text-purple-100 text-sm sm:text-base truncate">{{ property.title }}</h4>
                    <span class="text-xs px-1.5 py-0.5 bg-purple-500/50 text-purple-200 rounded-full font-medium">✨</span>
                  </div>
                  <p class="text-xs sm:text-sm text-purple-200/80 mt-0.5 line-clamp-1">{{ property.address }}</p>
                  
                  <!-- Quick insights preview on hover -->
                  <div v-if="hoveredPropertyId === property.id" class="mt-2 p-2 bg-purple-900/80 backdrop-blur-sm rounded border border-purple-400/30">
                    <p class="text-xs text-purple-200 font-medium mb-1">💡 Why it's cool:</p>
                    <p class="text-xs text-purple-100 line-clamp-2">{{ getPropertyInsights(property) }}</p>
                  </div>
                  
                  <div class="flex items-center justify-between mt-2">
                    <p class="text-sm sm:text-base font-bold text-blue-300">₱{{ (property.price || 0).toLocaleString() }}</p>
                    <span class="text-xs px-2 py-0.5 bg-green-500/30 text-green-200 rounded-full font-medium border border-green-400/30">Available</span>
                  </div>
                </div>
                <svg class="w-5 h-5 text-purple-300 flex-shrink-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          <!-- Property Details -->
          <div v-if="selectedProperty" class="space-y-3">
            <div class="bg-gradient-to-br from-purple-800/60 to-blue-800/60 backdrop-blur-sm border border-purple-400/30 rounded-lg p-3 sm:p-4 shadow-xl">
              <div class="flex items-start justify-between mb-3">
                <div class="flex-1">
                  <h4 class="font-bold text-purple-100 text-base sm:text-lg mb-1">{{ selectedProperty.title }}</h4>
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
              <div class="mb-3 p-2.5 bg-purple-900/60 backdrop-blur-sm rounded-lg border border-purple-400/30">
                <div class="flex items-start gap-2">
                  <span class="text-lg">💡</span>
                  <div class="flex-1">
                    <p class="text-xs font-semibold text-purple-200 mb-1">Why This Property is Amazing:</p>
                    <p class="text-xs text-purple-100 leading-relaxed">{{ getPropertyInsights(selectedProperty) }}</p>
                  </div>
                </div>
              </div>
              
              <!-- Property Image -->
              <div v-if="selectedProperty.photos && selectedProperty.photos.length > 0" class="mb-3">
                <img 
                  :src="selectedProperty.photos[0]" 
                  :alt="selectedProperty.title"
                  class="w-full h-32 sm:h-40 object-cover rounded-lg border border-purple-400/30"
                />
              </div>
              <div v-else class="mb-3 w-full h-32 sm:h-40 bg-purple-800/40 rounded-lg flex items-center justify-center border border-purple-400/30">
                <svg class="w-12 h-12 text-purple-300/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>

              <div class="mb-3">
                <p class="text-xs font-semibold text-purple-200 mb-1">Description:</p>
                <p class="text-sm sm:text-base text-purple-100">{{ selectedProperty.description }}</p>
              </div>
              
              <div class="space-y-2 text-sm">
                <div class="text-xs font-semibold text-purple-200 mb-1">Property Details:</div>
                <div class="flex items-center gap-2">
                  <svg class="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span class="text-purple-100">{{ selectedProperty.address }}</span>
                </div>
                
                <div v-if="selectedProperty.bedrooms || selectedProperty.bathrooms || selectedProperty.area" class="flex flex-wrap gap-3 sm:gap-4">
                  <div v-if="selectedProperty.bedrooms" class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span class="text-purple-100">{{ selectedProperty.bedrooms }} Bed{{ selectedProperty.bedrooms !== 1 ? 's' : '' }}</span>
                  </div>
                  <div v-if="selectedProperty.bathrooms" class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <span class="text-purple-100">{{ selectedProperty.bathrooms }} Bath{{ selectedProperty.bathrooms !== 1 ? 's' : '' }}</span>
                  </div>
                  <div v-if="selectedProperty.area" class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span class="text-purple-100">{{ selectedProperty.area }} sq ft</span>
                  </div>
                </div>

                <!-- Category Info -->
                <div v-if="categoryStore.getCategoryById(selectedProperty.categoryId)" class="flex items-center gap-2 pt-2 border-t border-purple-400/30">
                  <svg class="w-4 h-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span class="text-purple-100 text-xs sm:text-sm">
                    Category: <span class="font-semibold text-purple-200">{{ categoryStore.getCategoryById(selectedProperty.categoryId)?.name || 'N/A' }}</span>
                  </span>
                </div>
                
                <div class="flex items-center justify-between pt-2 border-t border-purple-400/30">
                  <div>
                    <p class="text-xs text-purple-200/70 mb-0.5">Price</p>
                    <span class="text-lg sm:text-xl font-bold text-blue-300">₱{{ (selectedProperty.price || 0).toLocaleString() }}</span>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-purple-200/70 mb-0.5">Price per sq ft</p>
                    <span class="text-sm font-semibold text-purple-200">
                      ₱{{ selectedProperty.area ? Math.round((selectedProperty.price || 0) / selectedProperty.area).toLocaleString() : 'N/A' }}
                    </span>
                  </div>
                </div>

                <div class="pt-2">
                  <router-link
                    to="/register"
                    class="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition text-sm font-medium shadow-lg shadow-purple-500/50"
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
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { usePropertyStore, type Property } from '@/stores/property'
import { useCategoryStore } from '@/stores/category'

const propertyStore = usePropertyStore()
const categoryStore = useCategoryStore()

const isOpen = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)
const selectedProperty = ref<Property | null>(null)
const hoveredPropertyId = ref<string | null>(null)

interface ChatMessage {
  id: string
  text: string
  type: 'bot' | 'user'
  timestamp: string
}

const messages = ref<ChatMessage[]>([])

const availableProperties = computed(() => {
  return propertyStore.properties
    .filter(p => p.status === 'available')
    .slice(0, 5) // Show max 5 properties
})

const showPropertyChoices = computed(() => {
  // Always show property choices when chat is open and no property is selected
  return isOpen.value && !selectedProperty.value
})

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    // Ensure properties are loaded when chat opens
    propertyStore.loadFromLocalStorage()
    categoryStore.loadFromLocalStorage()
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// Watch for property changes to ensure choices are always visible
watch(() => propertyStore.properties, () => {
  if (isOpen.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}, { deep: true })

// Generate insights about why a property is cool/interesting (for display)
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

// Generate human-like, conversational comments about a property
const getHumanLikeComment = (property: Property): string => {
  const comments: string[] = []
  const category = categoryStore.getCategoryById(property.categoryId)
  
  // Opening statement
  const openings = [
    `Wow, ${property.title} is absolutely stunning!`,
    `Oh my, you've got to see ${property.title}!`,
    `This is incredible - ${property.title} is a real gem!`,
    `I'm so excited to show you ${property.title}!`,
    `You're going to love ${property.title} - it's fantastic!`
  ]
  comments.push(openings[Math.floor(Math.random() * openings.length)])
  
  // Bedroom comments
  if (property.bedrooms) {
    if (property.bedrooms >= 4) {
      comments.push(`With ${property.bedrooms} bedrooms, this place is perfect for families who need space. Imagine all the room for everyone!`)
    } else if (property.bedrooms === 3) {
      comments.push(`Three bedrooms means you've got the perfect setup - master bedroom, guest room, and maybe even a home office!`)
    } else {
      comments.push(`The ${property.bedrooms} bedroom layout is cozy and intimate - perfect for couples or small families.`)
    }
  }
  
  // Area comments
  if (property.area) {
    if (property.area > 3000) {
      comments.push(`And get this - ${property.area.toLocaleString()} square feet! That's massive! You'll never feel cramped here.`)
    } else if (property.area > 2000) {
      comments.push(`At ${property.area.toLocaleString()} square feet, there's plenty of room to breathe and make it your own.`)
    } else {
      comments.push(`The ${property.area.toLocaleString()} square feet is perfectly sized - not too big, not too small, just right!`)
    }
  }
  
  // Price comments
  if (property.price) {
    const pricePerSqFt = property.area ? Math.round(property.price / property.area) : 0
    if (property.price < 300000) {
      comments.push(`And here's the best part - only ₱${property.price.toLocaleString()}! That's an absolute steal for what you're getting. Seriously, this is a fantastic deal!`)
    } else if (property.price < 500000) {
      comments.push(`Priced at ₱${property.price.toLocaleString()}, this is really competitive for the area. You're getting great value here!`)
      if (pricePerSqFt > 0 && pricePerSqFt < 200) {
        comments.push(`At just ₱${pricePerSqFt.toLocaleString()} per square foot, that's incredible value!`)
      }
    } else {
      comments.push(`Yes, it's premium at ₱${property.price.toLocaleString()}, but trust me - the quality and location make it totally worth it. This is luxury living!`)
    }
  }
  
  // Location comments
  if (property.address) {
    const addr = property.address.toLowerCase()
    if (addr.includes('ocean') || addr.includes('beach') || addr.includes('waterfront')) {
      comments.push(`The location? Absolutely breathtaking! Right by the water - imagine waking up to those views every morning. Pure paradise!`)
    } else if (addr.includes('downtown') || addr.includes('business') || addr.includes('main')) {
      comments.push(`Location-wise, you're in the heart of everything! Downtown means restaurants, shops, and work are all just minutes away. So convenient!`)
    } else if (addr.includes('country') || addr.includes('road') || addr.includes('rural')) {
      comments.push(`And the location is so peaceful - away from all the hustle and bustle. Perfect if you want some quiet and tranquility.`)
    } else {
      comments.push(`The neighborhood looks great too - ${property.address} is in a really nice area.`)
    }
  }
  
  // Category-specific comments
  if (category) {
    if (category.name === 'Residential') {
      comments.push(`This is the kind of home where memories are made. Perfect for settling down and creating your own little haven.`)
    } else if (category.name === 'Commercial') {
      comments.push(`For business owners, this is a goldmine! Prime commercial space that could really boost your business. The potential here is huge!`)
    } else if (category.name === 'Land') {
      comments.push(`Land like this doesn't come around often. You could build your dream home, start a business, or hold it as an investment. The possibilities are endless!`)
    }
  }
  
  // Photo comments
  if (property.photos && property.photos.length > 0) {
    comments.push(`I've got ${property.photos.length} amazing photo${property.photos.length > 1 ? 's' : ''} to show you - wait until you see how beautiful this place is!`)
  }
  
  // Closing statement
  const closings = [
    `This one is definitely worth checking out!`,
    `I think you're going to fall in love with this place!`,
    `This could be the one - it's got everything going for it!`,
    `Honestly, this property is special. You don't want to miss it!`,
    `Take my word for it - this is a fantastic opportunity!`
  ]
  comments.push(closings[Math.floor(Math.random() * closings.length)])
  
  return comments.join(' ')
}

const selectProperty = (property: Property) => {
  selectedProperty.value = property
  // Generate human-like conversational comment
  const humanComment = getHumanLikeComment(property)
  addMessage('bot', humanComment)
  nextTick(() => {
    scrollToBottom()
  })
}

const clearSelection = () => {
  selectedProperty.value = null
  addMessage('bot', 'Would you like to see another property? Choose from the list below!')
  nextTick(() => {
    scrollToBottom()
  })
}

const addMessage = (type: 'bot' | 'user', text: string) => {
  messages.value.push({
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    text,
    type,
    timestamp: new Date().toISOString()
  })
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
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

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
  // Ensure stores are initialized and data is loaded
  propertyStore.loadFromLocalStorage()
  categoryStore.loadFromLocalStorage()
  
  // If no properties exist, initialize seed data
  if (propertyStore.properties.length === 0) {
    // Force initialization by accessing the store's internal method
    // The store should auto-initialize, but we ensure it here
    const saved = localStorage.getItem('properties')
    if (!saved) {
      // Trigger initialization if needed
      propertyStore.loadFromLocalStorage()
    }
  }
  
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

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

