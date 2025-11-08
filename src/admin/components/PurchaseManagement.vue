<template>
  <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow">
    <div class="px-3 sm:px-6 py-3 sm:py-4 border-b">
      <h3 class="text-lg sm:text-xl font-semibold text-purple-800">Purchase & Appointment Management</h3>
      <p class="text-xs sm:text-sm text-purple-600 mt-1">View all property purchases and appointment schedules</p>
    </div>

    <div class="overflow-x-auto -mx-3 sm:mx-0">
      <table class="w-full min-w-[900px]">
        <thead class="bg-purple-50">
          <tr>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Client</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Property</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Amount</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider hidden md:table-cell">Payment Method</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider hidden lg:table-cell">Appointment</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Status</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md divide-y divide-gray-200">
          <tr v-if="allPayments.length === 0">
            <td colspan="7" class="px-6 py-4 text-center text-purple-500">
              No purchases found
            </td>
          </tr>
          <tr v-for="payment in allPayments" :key="payment.id" class="hover:bg-purple-50">
            <td class="px-3 sm:px-6 py-4 text-sm font-medium text-purple-900">
              {{ payment.clientName }}
            </td>
            <td class="px-3 sm:px-6 py-4 text-sm text-purple-900">
              {{ payment.propertyTitle }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-500">
              ₱{{ (payment.amount || 0).toLocaleString() }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-500 hidden md:table-cell">
              {{ payment.paymentMethod }}
            </td>
            <td class="px-3 sm:px-6 py-4 text-sm text-purple-500 hidden lg:table-cell">
              <div v-if="payment.appointmentDate && payment.appointmentTime" class="space-y-1">
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ formatDate(payment.appointmentDate) }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{{ formatTime(payment.appointmentTime) }}</span>
                </div>
                <div v-if="payment.appointmentStatus" class="mt-1">
                  <span :class="getAppointmentStatusClass(payment.appointmentStatus)">
                    {{ getAppointmentStatusLabel(payment.appointmentStatus) }}
                  </span>
                </div>
                <div v-if="payment.appointmentNotes" class="text-xs text-purple-400 mt-1">
                  {{ payment.appointmentNotes }}
                </div>
              </div>
              <span v-else class="text-purple-400 italic">No appointment</span>
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
              <span :class="getStatusClass(payment.status)">
                {{ payment.status }}
              </span>
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
              <div class="flex flex-col gap-1 sm:gap-2">
                <!-- Payment Status Actions -->
                <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                  <button
                    @click="updatePaymentStatus(payment.id, 'completed')"
                    v-if="payment.status === 'pending'"
                    class="text-green-600 hover:text-green-900 text-left sm:text-center"
                  >
                    Mark Payment Complete
                  </button>
                  <button
                    @click="updatePaymentStatus(payment.id, 'cancelled')"
                    v-if="payment.status === 'pending'"
                    class="text-red-600 hover:text-red-900 text-left sm:text-center"
                  >
                    Cancel Payment
                  </button>
                </div>
                <!-- Appointment Status Actions -->
                <div v-if="payment.appointmentDate && payment.appointmentTime" class="flex flex-col sm:flex-row gap-1 sm:gap-2 border-t pt-1 sm:border-t-0 sm:pt-0">
                  <button
                    @click="updateAppointmentStatus(payment.id, 'confirmed')"
                    v-if="payment.appointmentStatus === 'pending'"
                    class="text-blue-600 hover:text-blue-900 text-left sm:text-center"
                  >
                    Confirm Appointment
                  </button>
                  <button
                    @click="updateAppointmentStatus(payment.id, 'completed')"
                    v-if="payment.appointmentStatus && payment.appointmentStatus !== 'completed' && payment.appointmentStatus !== 'cancelled'"
                    class="text-green-600 hover:text-green-900 text-left sm:text-center"
                  >
                    Mark Appointment Complete
                  </button>
                  <button
                    @click="updateAppointmentStatus(payment.id, 'cancelled')"
                    v-if="payment.appointmentStatus && payment.appointmentStatus !== 'cancelled'"
                    class="text-red-600 hover:text-red-900 text-left sm:text-center"
                  >
                    Cancel Appointment
                  </button>
                </div>
                <!-- Details Button -->
                <button
                  @click="viewDetails(payment)"
                  class="text-purple-300 hover:text-purple-100 text-left sm:text-center border-t pt-1 sm:border-t-0 sm:pt-0"
                >
                  Details
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal && selectedPayment" class="fixed inset-0 bg-purple-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-2 sm:p-4" @click.self="closeDetailsModal">
      <div class="relative top-2 sm:top-10 mx-auto p-4 sm:p-5 border w-full max-w-2xl shadow-lg rounded-md bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md my-2 sm:my-10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div class="mt-3">
          <h3 class="text-base sm:text-lg font-medium text-purple-900 mb-4">Purchase Details</h3>
          <div class="space-y-3 sm:space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p class="text-sm text-purple-600">Client Name</p>
                <p class="font-semibold text-purple-900">{{ selectedPayment.clientName }}</p>
              </div>
              <div>
                <p class="text-sm text-purple-600">Property</p>
                <p class="font-semibold text-purple-900">{{ selectedPayment.propertyTitle }}</p>
              </div>
              <div>
                <p class="text-sm text-purple-600">Amount</p>
                <p class="font-semibold text-purple-300">₱{{ (selectedPayment.amount || 0).toLocaleString() }}</p>
              </div>
              <div>
                <p class="text-sm text-purple-600">Payment Method</p>
                <p class="font-semibold text-purple-900">{{ selectedPayment.paymentMethod }}</p>
              </div>
              <div>
                <p class="text-sm text-purple-600">Payment Date</p>
                <p class="font-semibold text-purple-900">{{ formatDate(selectedPayment.paymentDate) }}</p>
              </div>
              <div>
                <p class="text-sm text-purple-600">Status</p>
                <span :class="getStatusClass(selectedPayment.status)">
                  {{ selectedPayment.status }}
                </span>
              </div>
            </div>

            <div v-if="selectedPayment.appointmentDate && selectedPayment.appointmentTime" class="border-t pt-4">
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-semibold text-purple-900">Appointment Details</h4>
                <div v-if="selectedPayment.appointmentStatus" class="flex gap-2">
                  <span :class="getAppointmentStatusClass(selectedPayment.appointmentStatus)">
                    {{ getAppointmentStatusLabel(selectedPayment.appointmentStatus) }}
                  </span>
                </div>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="font-semibold">Date:</span>
                  <span>{{ formatDate(selectedPayment.appointmentDate) }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="font-semibold">Time:</span>
                  <span>{{ formatTime(selectedPayment.appointmentTime) }}</span>
                </div>
                <div v-if="selectedPayment.appointmentNotes">
                  <p class="font-semibold mb-1">Notes:</p>
                  <p class="text-purple-700 bg-purple-50 p-3 rounded">{{ selectedPayment.appointmentNotes }}</p>
                </div>
                <!-- Appointment Status Actions in Modal -->
                <div v-if="selectedPayment.appointmentStatus" class="flex flex-wrap gap-2 pt-2 border-t">
                  <button
                    @click="updateAppointmentStatus(selectedPayment.id, 'confirmed')"
                    v-if="selectedPayment.appointmentStatus === 'pending'"
                    class="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Confirm Appointment
                  </button>
                  <button
                    @click="updateAppointmentStatus(selectedPayment.id, 'completed')"
                    v-if="selectedPayment.appointmentStatus !== 'completed' && selectedPayment.appointmentStatus !== 'cancelled'"
                    class="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    Mark Appointment Complete
                  </button>
                  <button
                    @click="updateAppointmentStatus(selectedPayment.id, 'cancelled')"
                    v-if="selectedPayment.appointmentStatus !== 'cancelled'"
                    class="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>

            <div v-if="selectedPayment.notes" class="border-t pt-4">
              <p class="text-sm text-purple-600 mb-1">Payment Notes</p>
              <p class="text-purple-700 bg-purple-50 p-3 rounded">{{ selectedPayment.notes }}</p>
            </div>

            <div class="flex justify-end pt-4 border-t">
              <button
                @click="closeDetailsModal"
                class="px-4 py-2 bg-purple-200 text-purple-800 rounded-lg hover:bg-purple-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePaymentStore, type Payment } from '@/stores/payment'

const paymentStore = usePaymentStore()

const showDetailsModal = ref(false)
const selectedPayment = ref<Payment | null>(null)

const allPayments = computed(() => {
  return paymentStore.payments
    .filter(p => p && p.id && p.clientName && p.propertyTitle) // Filter out invalid payments
    .map(p => ({
      ...p,
      amount: p.amount || 0,
      paymentMethod: p.paymentMethod || 'N/A',
      status: p.status || 'pending',
      paymentDate: p.paymentDate || p.createdAt || new Date().toISOString()
    }))
    .sort((a, b) => {
      const dateA = new Date(a.createdAt || a.paymentDate || 0).getTime()
      const dateB = new Date(b.createdAt || b.paymentDate || 0).getTime()
      return dateB - dateA
    })
})

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString()
  } catch {
    return 'Invalid Date'
  }
}

const formatTime = (timeString: string | undefined) => {
  if (!timeString) return 'N/A'
  try {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    if (isNaN(hour)) return timeString
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes || '00'} ${ampm}`
  } catch {
    return timeString
  }
}

const getStatusClass = (status: string | undefined) => {
  const classes = {
    pending: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800',
    completed: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800',
    cancelled: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
  }
  return classes[(status || 'pending') as keyof typeof classes] || classes.pending
}

const getAppointmentStatusClass = (status: string | undefined) => {
  if (!status) return ''
  const classes = {
    pending: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800',
    confirmed: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800',
    completed: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800',
    cancelled: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || classes.pending
}

const getAppointmentStatusLabel = (status: string | undefined) => {
  if (!status) return ''
  const labels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    completed: 'Completed',
    cancelled: 'Cancelled'
  }
  return labels[status as keyof typeof labels] || status
}

const updatePaymentStatus = (id: string, status: 'completed' | 'cancelled') => {
  if (confirm(`Are you sure you want to mark this payment as ${status}?`)) {
    paymentStore.updatePayment(id, { status })
    // Refresh selected payment if it's the one being updated
    if (selectedPayment.value && selectedPayment.value.id === id) {
      const updated = paymentStore.getPaymentById(id)
      if (updated) {
        selectedPayment.value = updated
      }
    }
  }
}

const updateAppointmentStatus = (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)
  if (confirm(`Are you sure you want to mark this appointment as ${statusLabel}?`)) {
    paymentStore.updatePayment(id, { appointmentStatus: status })
    // Refresh selected payment if it's the one being updated
    if (selectedPayment.value && selectedPayment.value.id === id) {
      const updated = paymentStore.getPaymentById(id)
      if (updated) {
        selectedPayment.value = updated
      }
    }
  }
}

const viewDetails = (payment: Payment) => {
  selectedPayment.value = payment
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedPayment.value = null
}

onMounted(() => {
  paymentStore.loadFromLocalStorage()
})
</script>

