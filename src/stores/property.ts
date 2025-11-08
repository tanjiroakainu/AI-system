import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Property {
  id: string
  title: string
  description: string
  price: number
  address: string
  categoryId: string
  status: 'available' | 'not_available'
  bedrooms?: number
  bathrooms?: number
  area?: number
  photos?: string[] // Array of base64 image strings (max 5)
  createdAt: string
  updatedAt: string
}

export const usePropertyStore = defineStore('property', () => {
  const properties = ref<Property[]>([])

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>): Property => {
    const newProperty: Property = {
      ...propertyData,
      id: `prop-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    properties.value.push(newProperty)
    saveToLocalStorage()
    return newProperty
  }

  const updateProperty = (id: string, propertyData: Partial<Omit<Property, 'id' | 'createdAt'>>): boolean => {
    const property = properties.value.find(p => p.id === id)
    if (property) {
      // Ensure photos array doesn't exceed 5
      if (propertyData.photos && propertyData.photos.length > 5) {
        propertyData.photos = propertyData.photos.slice(0, 5)
      }
      Object.assign(property, {
        ...propertyData,
        updatedAt: new Date().toISOString()
      })
      saveToLocalStorage()
      return true
    }
    return false
  }

  const addPropertyPhoto = (id: string, photo: string): boolean => {
    const property = properties.value.find(p => p.id === id)
    if (property) {
      if (!property.photos) {
        property.photos = []
      }
      if (property.photos.length < 5) {
        property.photos.push(photo)
        property.updatedAt = new Date().toISOString()
        saveToLocalStorage()
        return true
      }
    }
    return false
  }

  const removePropertyPhoto = (id: string, photoIndex: number): boolean => {
    const property = properties.value.find(p => p.id === id)
    if (property && property.photos && photoIndex >= 0 && photoIndex < property.photos.length) {
      property.photos.splice(photoIndex, 1)
      property.updatedAt = new Date().toISOString()
      saveToLocalStorage()
      return true
    }
    return false
  }

  const deleteProperty = (id: string): boolean => {
    const index = properties.value.findIndex(p => p.id === id)
    if (index !== -1) {
      properties.value.splice(index, 1)
      saveToLocalStorage()
      return true
    }
    return false
  }

  const getPropertyById = (id: string): Property | undefined => {
    return properties.value.find(p => p.id === id)
  }

  const getPropertiesByCategory = (categoryId: string): Property[] => {
    return properties.value.filter(p => p.categoryId === categoryId)
  }

  const getAvailableProperties = (): Property[] => {
    return properties.value.filter(p => p.status === 'available')
  }

  const togglePropertyStatus = (id: string): boolean => {
    const property = properties.value.find(p => p.id === id)
    if (property) {
      property.status = property.status === 'available' ? 'not_available' : 'available'
      property.updatedAt = new Date().toISOString()
      saveToLocalStorage()
      return true
    }
    return false
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('properties', JSON.stringify(properties.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('properties')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Validate and clean up property data
        properties.value = parsed
          .filter((p: any) => p && p.id && p.title) // Remove invalid entries
          .map((p: any) => ({
            ...p,
            price: typeof p.price === 'number' ? p.price : 0,
            status: p.status || 'available',
            description: p.description || '',
            address: p.address || '',
            categoryId: p.categoryId || '',
            createdAt: p.createdAt || new Date().toISOString(),
            updatedAt: p.updatedAt || new Date().toISOString()
          }))
      } catch (error) {
        console.error('Error loading properties from localStorage:', error)
        properties.value = []
        initializeSeedData()
      }
    } else {
      // Initialize with seed data
      initializeSeedData()
    }
  }

  const initializeSeedData = () => {
    if (properties.value.length === 0) {
      const now = new Date().toISOString()
      const seedProperties: Property[] = [
        {
          id: 'prop-1',
          title: 'Modern Luxury Villa',
          description: 'Beautiful 4-bedroom villa with ocean view, modern amenities, and spacious garden.',
          price: 850000,
          address: '123 Ocean Drive, Miami, FL 33139',
          categoryId: 'cat-1',
          status: 'available',
          bedrooms: 4,
          bathrooms: 3,
          area: 3500,
          createdAt: now,
          updatedAt: now
        },
        {
          id: 'prop-2',
          title: 'Downtown Office Space',
          description: 'Prime commercial office space in the heart of downtown, perfect for businesses.',
          price: 450000,
          address: '456 Business Ave, New York, NY 10001',
          categoryId: 'cat-2',
          status: 'available',
          area: 2500,
          createdAt: now,
          updatedAt: now
        },
        {
          id: 'prop-3',
          title: 'Cozy Family Home',
          description: 'Charming 3-bedroom family home with backyard and garage in quiet neighborhood.',
          price: 320000,
          address: '789 Maple Street, Austin, TX 78701',
          categoryId: 'cat-1',
          status: 'available',
          bedrooms: 3,
          bathrooms: 2,
          area: 2200,
          createdAt: now,
          updatedAt: now
        },
        {
          id: 'prop-4',
          title: 'Development Land Plot',
          description: 'Large 5-acre plot zoned for residential development, utilities available.',
          price: 275000,
          address: '321 Country Road, Phoenix, AZ 85001',
          categoryId: 'cat-3',
          status: 'available',
          area: 217800,
          createdAt: now,
          updatedAt: now
        },
        {
          id: 'prop-5',
          title: 'Retail Store Front',
          description: 'High-traffic retail space with large display windows and parking.',
          price: 380000,
          address: '654 Main Street, Los Angeles, CA 90001',
          categoryId: 'cat-2',
          status: 'available',
          area: 1800,
          createdAt: now,
          updatedAt: now
        }
      ]
      properties.value = seedProperties
      saveToLocalStorage()
    }
  }

  return {
    properties,
    addProperty,
    updateProperty,
    deleteProperty,
    getPropertyById,
    getPropertiesByCategory,
    getAvailableProperties,
    togglePropertyStatus,
    addPropertyPhoto,
    removePropertyPhoto,
    loadFromLocalStorage
  }
})

