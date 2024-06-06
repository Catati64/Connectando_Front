<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const isAuthenticated = () => {
  return !!localStorage.getItem('token')
}

onMounted(() => {
  if (!isAuthenticated()) {
    router.push({ name: 'login' })
  }
})

const form = ref({
  userId: localStorage.getItem('userId') || '', 
  departureCity: '',
  arrivalCity: '',
  departureDate: '',
  price: '',
  itineraryStart: '',
  itineraryEnd: '',
  departureLocation: '',
  arrivalLocation: '',
  seatsCount: 0,
  extraluggage: 0
})

const availableCities = ['CDMX', 'LEON', 'MONTERREY']

const submitForm = async () => {
  const itinerary = [form.value.itineraryStart, form.value.itineraryEnd]
  const seats = Array(Number(form.value.seatsCount)).fill('available')

  const tripData = {
    userId: form.value.userId,
    departureCity: form.value.departureCity,
    arrivalCity: form.value.arrivalCity,
    departureDate: form.value.departureDate,
    price: form.value.price,
    itinerary: itinerary,
    departureLocation: form.value.departureLocation,
    arrivalLocation: form.value.arrivalLocation,
    seats: seats,
    extraluggage: form.value.extraluggage
  }

  try {
    const response = await axios.post('http://localhost:3010/create-trip', tripData)
    alert(`Trip created successfully: ${JSON.stringify(response.data)}`)
    router.push('/')
  } catch (error) {
    console.error(error)
    alert('Error al crear el viaje. Por favor, intente nuevamente.')
  }
}
</script>

<template>
  <div class="container mx-auto dark:text-black px-4 py-12">
    <div class="mx-auto w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
      <h2 class="text-center text-3xl font-bold">Crear Nuevo Viaje</h2>
      <form @submit.prevent="submitForm">
        <div class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Ciudad de Salida</label>
            <select v-model="form.departureCity" class="w-full p-2 border rounded" required>
              <option v-for="city in availableCities" :key="city" :value="city">{{ city }}</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">Ciudad de Llegada</label>
            <select v-model="form.arrivalCity" class="w-full p-2 border rounded" required>
              <option v-for="city in availableCities" :key="city" :value="city">{{ city }}</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 font-medium">Fecha de Salida</label>
            <input v-model="form.departureDate" type="date" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Precio</label>
            <input v-model="form.price" type="number" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Itinerario</label>
            <div class="flex space-x-2">
              <input v-model="form.itineraryStart" type="time" class="w-full p-2 border rounded" required />
              <input v-model="form.itineraryEnd" type="time" class="w-full p-2 border rounded" required />
            </div>
          </div>
          <div>
            <label class="block mb-1 font-medium">Lugar de Salida</label>
            <input v-model="form.departureLocation" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Lugar de Llegada</label>
            <input v-model="form.arrivalLocation" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Número de Asientos</label>
            <input v-model="form.seatsCount" type="number" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Equipaje Extra</label>
            <input v-model="form.extraluggage" type="number" class="w-full p-2 border rounded" required />
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white rounded">Crear Viaje</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: #f7fafc;
}

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
