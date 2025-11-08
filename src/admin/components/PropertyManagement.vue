<template>
  <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow">
    <div class="px-3 sm:px-6 py-3 sm:py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
      <h3 class="text-lg sm:text-xl font-semibold text-purple-800">Property Management</h3>
      <button
        @click="openAddModal"
        class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition flex items-center justify-center gap-2 text-sm sm:text-base"
        :disabled="categoryStore.categories.length === 0"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Property</span>
      </button>
    </div>

    <div v-if="categoryStore.categories.length === 0" class="p-6 text-center text-purple-500">
      Please create at least one category before adding properties.
    </div>

    <div v-else class="overflow-x-auto -mx-3 sm:mx-0">
      <table class="w-full min-w-[640px]">
        <thead class="bg-purple-50">
          <tr>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Title</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider hidden md:table-cell">Category</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Price</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Status</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider hidden lg:table-cell">Address</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md divide-y divide-gray-200">
          <tr v-if="propertyStore.properties.length === 0">
            <td colspan="6" class="px-6 py-4 text-center text-purple-500">
              No properties found. Add your first property!
            </td>
          </tr>
          <tr v-for="property in propertyStore.properties" :key="property.id" class="hover:bg-purple-50">
            <td class="px-3 sm:px-6 py-4 text-sm font-medium text-purple-900">
              {{ property.title }}
            </td>
            <td class="px-3 sm:px-6 py-4 text-sm text-purple-500 hidden md:table-cell">
              {{ getCategoryName(property.categoryId) }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-500">
              ₱{{ (property.price || 0).toLocaleString() }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
              <span
                :class="property.status === 'available' 
                  ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                  : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'"
              >
                {{ property.status === 'available' ? 'Available' : 'Not Available' }}
              </span>
            </td>
            <td class="px-3 sm:px-6 py-4 text-sm text-purple-500 hidden lg:table-cell">
              {{ property.address }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
              <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <button
                  @click="viewPhotos(property)"
                  class="text-blue-600 hover:text-blue-900 text-left sm:text-center"
                >
                  Photos ({{ property.photos?.length || 0 }})
                </button>
                <button
                  @click="toggleStatus(property.id)"
                  :class="property.status === 'available'
                    ? 'text-yellow-600 hover:text-yellow-900'
                    : 'text-green-600 hover:text-green-900'"
                >
                  {{ property.status === 'available' ? 'Unavailable' : 'Available' }}
                </button>
                <button
                  @click="openEditModal(property)"
                  class="text-purple-300 hover:text-purple-100"
                >
                  Edit
                </button>
                <button
                  @click="handleDelete(property.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Photos Modal -->
    <div v-if="showPhotosModal" class="fixed inset-0 bg-purple-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-2 sm:p-4" @click.self="closePhotosModal">
      <div class="relative top-2 sm:top-10 mx-auto p-4 sm:p-5 border w-full max-w-4xl shadow-lg rounded-md bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md my-2 sm:my-10">
        <div class="mt-3">
          <h3 class="text-base sm:text-lg font-medium text-purple-900 mb-4">
            Property Photos - {{ viewingProperty?.title }}
          </h3>
          <div v-if="viewingProperty && viewingProperty.photos && viewingProperty.photos.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <div v-for="(photo, index) in viewingProperty.photos" :key="index" class="relative group">
              <img :src="photo" alt="Property photo" class="w-full h-48 object-cover rounded border border-purple-300" />
              <button
                @click="deletePhoto(viewingProperty.id, index)"
                class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition"
              >
                ×
              </button>
            </div>
          </div>
          <div v-else class="text-center text-purple-500 py-8">
            No photos uploaded for this property
          </div>
          <div class="mt-6 flex justify-end">
            <button
              @click="closePhotosModal"
              class="px-4 py-2 bg-purple-200 text-purple-800 rounded-lg hover:bg-purple-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-purple-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-2 sm:p-4" @click.self="closeModal">
      <div class="relative top-2 sm:top-10 mx-auto p-4 sm:p-5 border w-full max-w-3xl shadow-lg rounded-md bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md my-2 sm:my-10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div class="mt-3">
          <h3 class="text-base sm:text-lg font-medium text-purple-900 mb-4">
            {{ editingProperty ? 'Edit Property' : 'Add Property' }}
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label for="propertyTitle" class="block text-sm font-medium text-purple-700 mb-2">
                  Title *
                </label>
                <input
                  id="propertyTitle"
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  placeholder="Property title"
                />
              </div>
              <div>
                <label for="propertyCategory" class="block text-sm font-medium text-purple-700 mb-2">
                  Category *
                </label>
                <select
                  id="propertyCategory"
                  v-model="form.categoryId"
                  required
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                >
                  <option value="">Select a category</option>
                  <option v-for="cat in categoryStore.categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label for="propertyDescription" class="block text-sm font-medium text-purple-700 mb-2">
                Description *
              </label>
              <textarea
                id="propertyDescription"
                v-model="form.description"
                required
                rows="3"
                class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                placeholder="Property description"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label for="propertyPrice" class="block text-sm font-medium text-purple-700 mb-2">
                  Price *
                </label>
                <input
                  id="propertyPrice"
                  v-model.number="form.price"
                  type="number"
                  required
                  min="0"
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                  placeholder="0"
                />
              </div>
              <div>
                <label for="propertyStatus" class="block text-sm font-medium text-purple-700 mb-2">
                  Status *
                </label>
                <select
                  id="propertyStatus"
                  v-model="form.status"
                  required
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                >
                  <option value="available">Available</option>
                  <option value="not_available">Not Available</option>
                </select>
              </div>
            </div>

            <div>
              <label for="propertyAddress" class="block text-sm font-medium text-purple-700 mb-2">
                Address *
              </label>
              <input
                id="propertyAddress"
                v-model="form.address"
                type="text"
                required
                class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                placeholder="Property address"
              />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label for="propertyBedrooms" class="block text-sm font-medium text-purple-700 mb-2">
                  Bedrooms
                </label>
                <input
                  id="propertyBedrooms"
                  v-model.number="form.bedrooms"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                  placeholder="0"
                />
              </div>
              <div>
                <label for="propertyBathrooms" class="block text-sm font-medium text-purple-700 mb-2">
                  Bathrooms
                </label>
                <input
                  id="propertyBathrooms"
                  v-model.number="form.bathrooms"
                  type="number"
                  min="0"
                  step="0.5"
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                  placeholder="0"
                />
              </div>
              <div>
                <label for="propertyArea" class="block text-sm font-medium text-purple-700 mb-2">
                  Area (sq ft)
                </label>
                <input
                  id="propertyArea"
                  v-model.number="form.area"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                  placeholder="0"
                />
              </div>
            </div>

            <!-- Photo Upload Section -->
            <div>
              <label class="block text-sm font-medium text-purple-700 mb-2">
                Property Photos (Max 5)
              </label>
              <div class="space-y-2">
                <!-- Display existing photos -->
                <div v-if="form.photos && form.photos.length > 0" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-4">
                  <div v-for="(photo, index) in form.photos" :key="index" class="relative">
                    <img :src="photo" alt="Property photo" class="w-full h-20 sm:h-24 object-cover rounded border border-purple-300" />
                    <button
                      type="button"
                      @click="removePhoto(index)"
                      class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <!-- File inputs for remaining slots -->
                <div v-if="!form.photos || form.photos.length < 5" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                  <div v-for="i in (5 - (form.photos?.length || 0))" :key="`upload-${i}`" class="relative">
                    <input
                      :id="`photo-upload-${editingProperty?.id || 'new'}-${i}`"
                      type="file"
                      accept="image/*"
                      @change="handlePhotoUpload($event)"
                      class="hidden"
                    />
                    <label
                      :for="`photo-upload-${editingProperty?.id || 'new'}-${i}`"
                      class="block w-full h-20 sm:h-24 border-2 border-dashed rounded-lg cursor-pointer flex items-center justify-center text-xs sm:text-sm text-purple-500 hover:border-purple-400 hover:text-purple-400 transition"
                    >
                      + Add Photo
                    </label>
                  </div>
                </div>
                <p class="text-xs text-purple-500 mt-2">
                  {{ form.photos?.length || 0 }}/5 photos uploaded
                </p>
              </div>
            </div>

            <div class="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 sm:space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="w-full sm:w-auto px-4 py-2 bg-purple-200 text-purple-800 rounded-lg hover:bg-purple-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition"
              >
                {{ editingProperty ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePropertyStore, type Property } from '@/stores/property'
import { useCategoryStore } from '@/stores/category'

const propertyStore = usePropertyStore()
const categoryStore = useCategoryStore()

const showModal = ref(false)
const showPhotosModal = ref(false)
const viewingProperty = ref<Property | null>(null)
const editingProperty = ref<Property | null>(null)
const photoInputs = ref<(HTMLInputElement | null)[]>([])
const form = ref({
  title: '',
  description: '',
  price: 0,
  address: '',
  categoryId: '',
  status: 'available' as 'available' | 'not_available',
  bedrooms: undefined as number | undefined,
  bathrooms: undefined as number | undefined,
  area: undefined as number | undefined,
  photos: [] as string[]
})

onMounted(() => {
  propertyStore.loadFromLocalStorage()
  categoryStore.loadFromLocalStorage()
})

const openAddModal = () => {
  editingProperty.value = null
  form.value = {
    title: '',
    description: '',
    price: 0,
    address: '',
    categoryId: '',
    status: 'available',
    bedrooms: undefined,
    bathrooms: undefined,
    area: undefined,
    photos: []
  }
  photoInputs.value = []
  showModal.value = true
}

const openEditModal = (property: Property) => {
  editingProperty.value = property
  form.value = {
    title: property.title,
    description: property.description,
    price: property.price,
    address: property.address,
    categoryId: property.categoryId,
    status: property.status,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    photos: property.photos ? [...property.photos] : []
  }
  photoInputs.value = []
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingProperty.value = null
  form.value = {
    title: '',
    description: '',
    price: 0,
    address: '',
    categoryId: '',
    status: 'available',
    bedrooms: undefined,
    bathrooms: undefined,
    area: undefined,
    photos: []
  }
  photoInputs.value = []
}

const viewPhotos = (property: Property) => {
  viewingProperty.value = property
  showPhotosModal.value = true
}

const closePhotosModal = () => {
  showPhotosModal.value = false
  viewingProperty.value = null
}

const handlePhotoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      input.value = ''
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      if (!form.value.photos) {
        form.value.photos = []
      }
      if (form.value.photos.length < 5) {
        form.value.photos.push(result)
      }
      input.value = ''
    }
    reader.readAsDataURL(file)
  }
}

const removePhoto = (index: number) => {
  if (form.value.photos) {
    form.value.photos.splice(index, 1)
  }
}

const deletePhoto = (propertyId: string, photoIndex: number) => {
  if (confirm('Are you sure you want to delete this photo?')) {
    propertyStore.removePropertyPhoto(propertyId, photoIndex)
    if (viewingProperty.value) {
      viewingProperty.value = propertyStore.getPropertyById(propertyId) || null
    }
  }
}

const handleSubmit = () => {
  if (editingProperty.value) {
    propertyStore.updateProperty(editingProperty.value.id, form.value)
  } else {
    propertyStore.addProperty(form.value)
  }
  closeModal()
}

const handleDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this property?')) {
    propertyStore.deleteProperty(id)
  }
}

const toggleStatus = (id: string) => {
  propertyStore.togglePropertyStatus(id)
}

const getCategoryName = (categoryId: string): string => {
  const category = categoryStore.getCategoryById(categoryId)
  return category ? category.name : 'Unknown'
}
</script>

