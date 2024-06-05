<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const purchaseData = ref<any>(null)
const form = reactive({
  email: '',
  name: '',
  lastName: '',
  phone: '',
  departureSeat: [],
  returnSeat: [],
  paymentData: {
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  }
})

const router = useRouter()

onMounted(() => {
  const storedPurchaseData = localStorage.getItem('purchaseData')

  if (storedPurchaseData) {
    purchaseData.value = JSON.parse(storedPurchaseData)
  }
})

const selectSeat = (type, index) => {
  const seatArray = type === 'departure' ? form.departureSeat : form.returnSeat
  if (seatArray.includes(index)) {
    seatArray.splice(seatArray.indexOf(index), 1)
  } else if (seatArray.length < purchaseData.value.passangers) {
    seatArray.push(index)
  }
}

const submitForm = async () => {
  const payload = {
    email: form.email,
    name: form.name,
    lastName: form.lastName,
    phone: form.phone,
    departureSeat: form.departureSeat,
    returnSeat: purchaseData.value.isRounded ? form.returnSeat : null,
    passengers: purchaseData.value.passangers,
    paymentData: form.paymentData,
    tripId: purchaseData.value.tripId,
    tripIdReturn: purchaseData.value.isRounded ? purchaseData.value.tripIdReturn : null,
    price: purchaseData.value.price
  }

  try {
    const response = await axios.post('http://localhost:3010/purchase-tikect', payload)
    console.log(response.data)
    localStorage.setItem('purchaseinfo', JSON.stringify(response.data))
    router.push({ name: 'purchased-info' })
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <section class="p-6 bg-white dark:bg-gray-800 text-black dark:text-white">
    <h2 class="text-2xl font-bold mb-4">Detalles de tu selección</h2>
    <div v-if="purchaseData">
      <p><strong>Origen:</strong> {{ purchaseData.departureCity }}</p>
      <p><strong>Destino:</strong> {{ purchaseData.arrivalCity }}</p>
      <p><strong>Fecha de salida:</strong> {{ purchaseData.departureDate }}</p>
      <p v-if="purchaseData.returnDate"><strong>Fecha de regreso:</strong> {{ purchaseData.returnDate }}</p>
      <p><strong>Pasajeros:</strong> {{ purchaseData.passangers }}</p>
      <p><strong>Equipaje extra:</strong> {{ purchaseData.extraluggage ? 'Sí' : 'No' }}</p>
      <p><strong>Precio total:</strong> ${{ purchaseData.price }} MXN</p>
      <p><strong>Trip Id:</strong> {{ purchaseData.tripId }}</p>
      <p v-if="purchaseData.isRounded"><strong>Trip Id de regreso:</strong> {{ purchaseData.tripIdReturn }}</p>
    </div>

    <h2 class="text-2xl font-bold mt-6 mb-4">Formulario de compra</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Email</label>
        <input v-model="form.email" type="email" class="w-full p-2 border rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Nombre</label>
        <input v-model="form.name" type="text" class="w-full p-2 border rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Apellido</label>
        <input v-model="form.lastName" type="text" class="w-full p-2 border rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Teléfono</label>
        <input v-model="form.phone" type="tel" class="w-full p-2 border rounded-lg" required />
      </div>
      <div v-if="purchaseData">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Asiento de salida</label>
          <div class="grid grid-cols-4 gap-2">
            <button v-for="(seat, index) in purchaseData.departureSeat" :key="index" :class="[
              'p-2 rounded-lg border',
              form.departureSeat.includes(index) ? 'text-white bg-green-500 border-green-500' : 'text-black border-gray-300',
              seat !== 'available' ? 'bg-red-200' : 'bg-white'
            ]" :disabled="seat !== 'available'" @click.prevent="selectSeat('departure', index)">
              {{ index + 1 }}
            </button>
          </div>
        </div>
        <div v-if="purchaseData.isRounded" class="mb-4">
          <label class="block text-sm font-medium mb-2">Asiento de regreso</label>
          <div class="grid grid-cols-4 gap-2">
            <button v-for="(seat, index) in purchaseData.returnSeat" :key="index" :class="[
              'p-2 rounded-lg border',
              form.returnSeat.includes(index) ? 'text-white bg-green-500 border-green-500' : 'text-black border-gray-300',
              seat !== 'available' ? 'bg-red-200' : 'bg-white'
            ]" :disabled="seat !== 'available'" @click.prevent="selectSeat('return', index)">
              {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
      <h3 class="text-xl font-semibold mt-6 mb-4">Datos de pago</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Nombre del titular</label>
        <input v-model="form.paymentData.cardHolderName" type="text" class="w-full p-2 border rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Número de tarjeta</label>
        <input v-model="form.paymentData.cardNumber" type="text" class="w-full p-2 border rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Fecha de expiración</label>
        <input v-model="form.paymentData.expiryDate" type="text" class="w-full p-2 border rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">CVV</label>
        <input v-model="form.paymentData.cvv" type="text" class="w-full p-2 border rounded-lg" required />
      </div>
      <h3 class="text-xl font-semibold mt-6 mb-4">Dirección de facturación</h3>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Calle</label>
        <input v-model="form.paymentData.billingAddress.street" type="text" class="w-full p-2 border rounded-lg"
          required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Ciudad</label>
        <input v-model="form.paymentData.billingAddress.city" type="text" class="w-full p-2 border rounded-lg" required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Estado</label>
        <input v-model="form.paymentData.billingAddress.state" type="text" class="w-full p-2 border rounded-lg"
          required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">País</label>
        <input v-model="form.paymentData.billingAddress.country" type="text" class="w-full p-2 border rounded-lg"
          required />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium mb-2">Código postal</label>
        <input v-model="form.paymentData.billingAddress.zipCode" type="text" class="w-full p-2 border rounded-lg"
          required />
      </div>
      <button type="submit" class="bg-green-500 text-white p-4 rounded-lg shadow-lg">Realizar Compra</button>
    </form>
  </section>
</template>

<style scoped>
.bg-green-500 {
  background-color: #48bb78;
}

.bg-gray-200 {
  background-color: #e2e8f0;
}

.text-white {
  color: white;
}
</style>
