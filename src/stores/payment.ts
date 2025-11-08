import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Payment {
  id: string
  propertyId: string
  propertyTitle: string
  clientId: string
  clientName: string
  amount: number
  paymentMethod: string
  paymentDate: string
  status: 'pending' | 'completed' | 'cancelled'
  notes?: string
  appointmentDate?: string
  appointmentTime?: string
  appointmentNotes?: string
  appointmentStatus?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

export const usePaymentStore = defineStore('payment', () => {
  const payments = ref<Payment[]>([])

  const addPayment = (paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>): Payment => {
    const newPayment: Payment = {
      ...paymentData,
      id: `pay-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    payments.value.push(newPayment)
    saveToLocalStorage()
    return newPayment
  }

  const updatePayment = (id: string, paymentData: Partial<Omit<Payment, 'id' | 'createdAt'>>): boolean => {
    const payment = payments.value.find(p => p.id === id)
    if (payment) {
      Object.assign(payment, {
        ...paymentData,
        updatedAt: new Date().toISOString()
      })
      saveToLocalStorage()
      return true
    }
    return false
  }

  const deletePayment = (id: string): boolean => {
    const index = payments.value.findIndex(p => p.id === id)
    if (index !== -1) {
      payments.value.splice(index, 1)
      saveToLocalStorage()
      return true
    }
    return false
  }

  const getPaymentById = (id: string): Payment | undefined => {
    return payments.value.find(p => p.id === id)
  }

  const getPaymentsByClient = (clientId: string): Payment[] => {
    return payments.value.filter(p => p.clientId === clientId)
  }

  const getPaymentsByProperty = (propertyId: string): Payment[] => {
    return payments.value.filter(p => p.propertyId === propertyId)
  }

  const buyProperty = (
    propertyId: string,
    propertyTitle: string,
    clientId: string,
    clientName: string,
    amount: number,
    paymentMethod: string,
    notes?: string,
    appointmentDate?: string,
    appointmentTime?: string,
    appointmentNotes?: string
  ): Payment => {
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      propertyId,
      propertyTitle,
      clientId,
      clientName,
      amount,
      paymentMethod,
      paymentDate: new Date().toISOString(),
      status: 'pending',
      notes,
    appointmentDate,
    appointmentTime,
    appointmentNotes,
    appointmentStatus: appointmentDate && appointmentTime ? 'pending' : undefined,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
    }
    payments.value.push(payment)
    saveToLocalStorage()
    return payment
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('payments', JSON.stringify(payments.value))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('payments')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Validate and clean up payment data
        payments.value = parsed
          .filter((p: any) => p && p.id) // Remove invalid entries
          .map((p: any) => ({
            ...p,
            amount: typeof p.amount === 'number' ? p.amount : 0,
            status: p.status || 'pending',
            paymentMethod: p.paymentMethod || 'N/A',
            paymentDate: p.paymentDate || p.createdAt || new Date().toISOString(),
            createdAt: p.createdAt || new Date().toISOString(),
            updatedAt: p.updatedAt || new Date().toISOString()
          }))
      } catch (error) {
        console.error('Error loading payments from localStorage:', error)
        payments.value = []
      }
    }
  }

  return {
    payments,
    addPayment,
    updatePayment,
    deletePayment,
    getPaymentById,
    getPaymentsByClient,
    getPaymentsByProperty,
    buyProperty,
    loadFromLocalStorage
  }
})

