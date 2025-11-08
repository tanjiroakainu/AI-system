<template>
  <div class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md rounded-lg shadow">
    <div class="px-3 sm:px-6 py-3 sm:py-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
      <h3 class="text-lg sm:text-xl font-semibold text-purple-800">Payment Method Management</h3>
      <button
        @click="openAddModal"
        class="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Payment Method</span>
      </button>
    </div>

    <div class="overflow-x-auto -mx-3 sm:mx-0">
      <table class="w-full min-w-[500px]">
        <thead class="bg-purple-50">
          <tr>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Name</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Description</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Status</th>
            <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-purple-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md divide-y divide-gray-200">
          <tr v-if="paymentMethodStore.paymentMethods.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-purple-500">
              No payment methods found. Add your first payment method!
            </td>
          </tr>
          <tr v-for="method in paymentMethodStore.paymentMethods" :key="method.id" class="hover:bg-purple-50">
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-900">
              {{ method.name }}
            </td>
            <td class="px-3 sm:px-6 py-4 text-sm text-purple-500">
              {{ method.description }}
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
              <span
                :class="method.isActive
                  ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'
                  : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'"
              >
                {{ method.isActive ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
              <div class="flex flex-col sm:flex-row gap-1 sm:gap-2">
                <button
                  @click="openEditModal(method)"
                  class="text-purple-300 hover:text-purple-100"
                >
                  Edit
                </button>
                <button
                  @click="handleDelete(method.id)"
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
      <div class="relative top-2 sm:top-10 mx-auto p-4 sm:p-5 border w-full max-w-md shadow-lg rounded-md bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-purple-800/90 backdrop-blur-md my-2 sm:my-10">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-purple-900 mb-4">
            {{ editingMethod ? 'Edit Payment Method' : 'Add Payment Method' }}
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label for="methodName" class="block text-sm font-medium text-purple-700 mb-2">
                Name *
              </label>
              <input
                id="methodName"
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                placeholder="Enter payment method name"
              />
            </div>
            <div>
              <label for="methodDescription" class="block text-sm font-medium text-purple-700 mb-2">
                Description *
              </label>
              <textarea
                id="methodDescription"
                v-model="form.description"
                required
                rows="3"
                class="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="form.isActive"
                  class="rounded border-purple-300 text-purple-300 focus:ring-purple-400"
                />
                <span class="ml-2 text-sm text-purple-700">Active</span>
              </label>
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
                {{ editingMethod ? 'Update' : 'Add' }}
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
import { usePaymentMethodStore, type PaymentMethod } from '@/stores/paymentMethod'

const paymentMethodStore = usePaymentMethodStore()

const showModal = ref(false)
const editingMethod = ref<PaymentMethod | null>(null)
const form = ref({
  name: '',
  description: '',
  isActive: true
})

onMounted(() => {
  paymentMethodStore.loadFromLocalStorage()
})

const openAddModal = () => {
  editingMethod.value = null
  form.value = { name: '', description: '', isActive: true }
  showModal.value = true
}

const openEditModal = (method: PaymentMethod) => {
  editingMethod.value = method
  form.value = {
    name: method.name,
    description: method.description,
    isActive: method.isActive
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingMethod.value = null
  form.value = { name: '', description: '', isActive: true }
}

const handleSubmit = () => {
  if (editingMethod.value) {
    paymentMethodStore.updatePaymentMethod(
      editingMethod.value.id,
      form.value.name,
      form.value.description,
      form.value.isActive
    )
  } else {
    paymentMethodStore.addPaymentMethod(form.value.name, form.value.description)
  }
  closeModal()
}

const handleDelete = (id: string) => {
  if (confirm('Are you sure you want to delete this payment method?')) {
    paymentMethodStore.deletePaymentMethod(id)
  }
}
</script>

