<template>
  <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow">
    <div class="px-3 sm:px-6 py-3 sm:py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
      <h3 class="text-lg sm:text-xl font-semibold text-purple-800">Payment Management</h3>
      <button
        @click="openAddModal"
        class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Payment</span>
      </button>
    </div>

    <div class="overflow-x-auto -mx-3 sm:mx-0">
      <table class="w-full min-w-[800px]">
        <thead class="bg-purple-50">
          <tr>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Property</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Amount</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider hidden md:table-cell">Payment Method</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider hidden lg:table-cell">Payment Date</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider hidden lg:table-cell">Appointment</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Status</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md divide-y divide-gray-200">
          <tr v-if="clientPayments.length === 0">
            <td colspan="7" class="px-6 py-4 text-center text-purple-500">
              No payments found. Add your first payment or buy a property!
            </td>
          </tr>
          <tr v-for="payment in clientPayments" :key="payment.id" class="hover:bg-purple-50">
            <td class="px-3 sm:px-6 py-4 text-sm font-medium text-purple-900">
              {{ payment.propertyTitle }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-500">
              ₱{{ (payment.amount || 0).toLocaleString() }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-500 hidden md:table-cell">
              {{ payment.paymentMethod }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-500 hidden lg:table-cell">
              {{ formatDate(payment.paymentDate) }}
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
              <span
                :class="getStatusClass(payment.status)"
              >
                {{ payment.status }}
              </span>
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
              <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <button
                  @click="openEditModal(payment)"
                  class="text-purple-300 hover:text-purple-100"
                >
                  Edit
                </button>
                <button
                  @click="handleDelete(payment.id)"
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

    <!-- Add/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-purple-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-2 sm:p-4" @click.self="closeModal">
      <div class="relative top-2 sm:top-10 mx-auto p-4 sm:p-5 border w-full max-w-2xl shadow-lg rounded-md bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md my-2 sm:my-10 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div class="mt-3">
          <h3 class="text-base sm:text-lg font-medium text-purple-900 mb-4">
            {{ editingPayment ? 'Edit Payment' : 'Add Payment' }}
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4">
            <div>
              <label for="paymentProperty" class="block text-sm font-medium text-purple-700 mb-2">
                Property *
              </label>
              <select
                id="paymentProperty"
                v-model="form.propertyId"
                required
                class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
              >
                <option value="">Select a property</option>
                <option v-for="prop in availableProperties" :key="prop.id" :value="prop.id">
                  {{ prop.title }} - ${{ (prop.price || 0).toLocaleString() }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label for="paymentAmount" class="block text-sm font-medium text-purple-700 mb-2">
                  Amount *
                </label>
                <input
                  id="paymentAmount"
                  v-model.number="form.amount"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label for="paymentMethod" class="block text-sm font-medium text-purple-700 mb-2">
                  Payment Method *
                </label>
                <select
                  id="paymentMethod"
                  v-model="form.paymentMethod"
                  required
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                >
                  <option value="">Select payment method</option>
                  <option v-for="method in activePaymentMethods" :key="method.id" :value="method.name">
                    {{ method.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label for="paymentDate" class="block text-sm font-medium text-purple-700 mb-2">
                  Payment Date *
                </label>
                <input
                  id="paymentDate"
                  v-model="form.paymentDate"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                />
              </div>
              <div>
                <label for="paymentStatus" class="block text-sm font-medium text-purple-700 mb-2">
                  Status *
                </label>
                <select
                  id="paymentStatus"
                  v-model="form.status"
                  required
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none text-base"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <!-- Appointment Section -->
            <div class="border-t pt-4 mt-4">
              <h4 class="text-sm sm:text-md font-semibold text-purple-800 mb-3">Appointment Details</h4>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label for="appointmentDate" class="block text-sm font-medium text-purple-700 mb-2">
                    Appointment Date
                  </label>
                  <input
                    id="appointmentDate"
                    v-model="form.appointmentDate"
                    type="date"
                    class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label for="appointmentTime" class="block text-sm font-medium text-purple-700 mb-2">
                    Appointment Time
                  </label>
                  <input
                    id="appointmentTime"
                    v-model="form.appointmentTime"
                    type="time"
                    class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label for="appointmentNotes" class="block text-sm font-medium text-purple-700 mb-2">
                  Appointment Notes
                </label>
                <textarea
                  id="appointmentNotes"
                  v-model="form.appointmentNotes"
                  rows="2"
                  class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                  placeholder="Appointment notes..."
                ></textarea>
              </div>
            </div>

            <div>
              <label for="paymentNotes" class="block text-sm font-medium text-purple-700 mb-2">
                Payment Notes
              </label>
              <textarea
                id="paymentNotes"
                v-model="form.notes"
                rows="3"
                class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                placeholder="Additional notes..."
              ></textarea>
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
                {{ editingPayment ? 'Update' : 'Add' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePaymentStore, type Payment } from '@/stores/payment'
import { usePropertyStore } from '@/stores/property'
import { useAuthStore } from '@/stores/auth'
import { usePaymentMethodStore } from '@/stores/paymentMethod'

const paymentStore = usePaymentStore()
const propertyStore = usePropertyStore()
const authStore = useAuthStore()
const paymentMethodStore = usePaymentMethodStore()

const showModal = ref(false)
const editingPayment = ref<Payment | null>(null)
const form = ref({
  propertyId: '',
  amount: 0,
  paymentMethod: 'cash' as Payment['paymentMethod'],
  paymentDate: new Date().toISOString().split('T')[0],
  status: 'pending' as Payment['status'],
  notes: '',
  appointmentDate: '',
  appointmentTime: '',
  appointmentNotes: ''
})

const clientPayments = computed(() => {
  if (!authStore.user) return []
  return paymentStore.getPaymentsByClient(authStore.user.id)
    .filter(p => p && p.id) // Filter out invalid payments
    .map(p => ({
      ...p,
      amount: p.amount || 0,
      paymentMethod: p.paymentMethod || 'N/A',
      status: p.status || 'pending'
    }))
})

const availableProperties = computed(() => {
  return propertyStore.properties
})

const activePaymentMethods = computed(() => {
  return paymentMethodStore.getActivePaymentMethods()
})

onMounted(() => {
  paymentStore.loadFromLocalStorage()
  propertyStore.loadFromLocalStorage()
  paymentMethodStore.loadFromLocalStorage()
})

const openAddModal = () => {
  editingPayment.value = null
  form.value = {
    propertyId: '',
    amount: 0,
    paymentMethod: activePaymentMethods.value.length > 0 ? activePaymentMethods.value[0].name : '',
    paymentDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    notes: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentNotes: ''
  }
  showModal.value = true
}

const openEditModal = (payment: Payment) => {
  editingPayment.value = payment
  form.value = {
    propertyId: payment.propertyId,
    amount: payment.amount || 0,
    paymentMethod: payment.paymentMethod || '',
    paymentDate: payment.paymentDate ? payment.paymentDate.split('T')[0] : new Date().toISOString().split('T')[0],
    status: payment.status || 'pending',
    notes: payment.notes || '',
    appointmentDate: payment.appointmentDate || '',
    appointmentTime: payment.appointmentTime || '',
    appointmentNotes: payment.appointmentNotes || ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingPayment.value = null
  form.value = {
    propertyId: '',
    amount: 0,
    paymentMethod: '',
    paymentDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    notes: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentNotes: ''
  }
}

const handleSubmit = () => {
  if (!authStore.user) return

  const property = propertyStore.getPropertyById(form.value.propertyId)
  if (!property) return

  if (editingPayment.value) {
    paymentStore.updatePayment(editingPayment.value.id, {
      propertyId: form.value.propertyId,
      propertyTitle: property.title,
      amount: form.value.amount,
      paymentMethod: form.value.paymentMethod,
      paymentDate: form.value.paymentDate,
      status: form.value.status,
      notes: form.value.notes,
      appointmentDate: form.value.appointmentDate || undefined,
      appointmentTime: form.value.appointmentTime || undefined,
      appointmentNotes: form.value.appointmentNotes || undefined
    })
  } else {
    paymentStore.addPayment({
      propertyId: form.value.propertyId,
      propertyTitle: property.title,
      clientId: authStore.user.id,
      clientName: authStore.user.name,
      amount: form.value.amount,
      paymentMethod: form.value.paymentMethod,
      paymentDate: form.value.paymentDate,
      status: form.value.status,
      notes: form.value.notes,
      appointmentDate: form.value.appointmentDate || undefined,
      appointmentTime: form.value.appointmentTime || undefined,
      appointmentNotes: form.value.appointmentNotes || undefined
    })
  }
  closeModal()
}

const handleDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this payment?')) {
    paymentStore.deletePayment(id)
  }
}

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
    // Convert 24-hour time to 12-hour format
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

const getStatusClass = (status: string) => {
  const classes = {
    pending: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800',
    completed: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800',
    cancelled: 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || classes.pending
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
</script>

