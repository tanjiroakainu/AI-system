import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface PaymentMethod {
  id: string
  name: string
  description: string
  isActive: boolean
  createdAt: string
}

export const usePaymentMethodStore = defineStore('paymentMethod', () => {
  const paymentMethods = ref<PaymentMethod[]>([])

  const addPaymentMethod = (name: string, description: string): PaymentMethod => {
    const newMethod: PaymentMethod = {
      id: `pm-${Date.now()}`,
      name,
      description,
      isActive: true,
      createdAt: new Date().toISOString()
    }
    paymentMethods.value.push(newMethod)
    saveToLocalStorage()
    return newMethod
  }

  const updatePaymentMethod = (id: string, name: string, description: string, isActive: boolean): boolean => {
    const method = paymentMethods.value.find(m => m.id === id)
    if (method) {
      method.name = name
      method.description = description
      method.isActive = isActive
      saveToLocalStorage()
      return true
    }
    return false
  }

  const deletePaymentMethod = (id: string): boolean => {
    const index = paymentMethods.value.findIndex(m => m.id === id)
    if (index !== -1) {
      paymentMethods.value.splice(index, 1)
      saveToLocalStorage()
      return true
    }
    return false
  }

  const getPaymentMethodById = (id: string): PaymentMethod | undefined => {
    return paymentMethods.value.find(m => m.id === id)
  }

  const getActivePaymentMethods = (): PaymentMethod[] => {
    return paymentMethods.value.filter(m => m.isActive)
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('paymentMethods')
    if (saved) {
      paymentMethods.value = JSON.parse(saved)
    } else {
      // Initialize with default payment methods
      initializeDefaultMethods()
    }
  }

  const initializeDefaultMethods = () => {
    const defaultMethods: PaymentMethod[] = [
      {
        id: 'pm-1',
        name: 'Cash',
        description: 'Cash payment',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'pm-2',
        name: 'Bank Transfer',
        description: 'Bank transfer payment',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'pm-3',
        name: 'Credit Card',
        description: 'Credit card payment',
        isActive: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'pm-4',
        name: 'Check',
        description: 'Check payment',
        isActive: true,
        createdAt: new Date().toISOString()
      }
    ]
    paymentMethods.value = defaultMethods
    saveToLocalStorage()
  }

  return {
    paymentMethods,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    getPaymentMethodById,
    getActivePaymentMethods,
    loadFromLocalStorage
  }
})

