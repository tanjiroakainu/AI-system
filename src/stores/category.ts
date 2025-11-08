import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Category {
  id: string
  name: string
  description: string
  createdAt: string
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])

  const addCategory = (name: string, description: string): Category => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      description,
      createdAt: new Date().toISOString()
    }
    categories.value.push(newCategory)
    saveToLocalStorage()
    return newCategory
  }

  const updateCategory = (id: string, name: string, description: string): boolean => {
    const category = categories.value.find(c => c.id === id)
    if (category) {
      category.name = name
      category.description = description
      saveToLocalStorage()
      return true
    }
    return false
  }

  const deleteCategory = (id: string): boolean => {
    const index = categories.value.findIndex(c => c.id === id)
    if (index !== -1) {
      categories.value.splice(index, 1)
      saveToLocalStorage()
      return true
    }
    return false
  }

  const getCategoryById = (id: string): Category | undefined => {
    return categories.value.find(c => c.id === id)
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('categories', JSON.stringify(categories.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('categories')
    if (saved) {
      categories.value = JSON.parse(saved)
    } else {
      // Initialize with seed data
      initializeSeedData()
    }
  }

  const initializeSeedData = () => {
    if (categories.value.length === 0) {
      const seedCategories: Category[] = [
        {
          id: 'cat-1',
          name: 'Residential',
          description: 'Houses, apartments, and residential properties',
          createdAt: new Date().toISOString()
        },
        {
          id: 'cat-2',
          name: 'Commercial',
          description: 'Office spaces, retail stores, and commercial buildings',
          createdAt: new Date().toISOString()
        },
        {
          id: 'cat-3',
          name: 'Land',
          description: 'Vacant land and plots for development',
          createdAt: new Date().toISOString()
        }
      ]
      categories.value = seedCategories
      saveToLocalStorage()
    }
  }

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    loadFromLocalStorage
  }
})

