<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const ticketId = ref('')
const ticketData = ref<any>(null)
const message = ref('')

const fetchTicket = async () => {
  try {
    const response = await axios.post('http://localhost:3010/get-tikectById', { ticketId: ticketId.value })
    ticketData.value = response.data.ticket
    message.value = response.data.message
  } catch (error) {
    console.error(error)
    message.value = 'Error al recuperar el ticket. Por favor, intente nuevamente.'
  }
}

const onSubmit = () => {
  if (ticketId.value) {
    fetchTicket()
  }
}
</script>

<template>
  <div class="pb-12 pt-4 text-center bg-primary-600 dark:bg-primary-200 text-white dark:text-primary-800">
    <div class="container mx-auto px-4">
      <div class="-mx-4 flex flex-wrap">
        <div class="mx-auto px-4 rounded-2xl w-full lg:w-8/12">
          <div class="px-6 py-12 rounded-lg tertiary-card">
            <h2 class="font-bold leading-tight mb-2 text-3xl text-black dark:text-white">Consulta tu Ticket</h2>
            <p class="mb-8 text-black dark:text-white">Ingrese el ID de su ticket para consultar los detalles
            </p>
            <form @submit.prevent="onSubmit" class="mx-auto sm:w-9/12 xl:w-8/12">
              <div class="flex items-center overflow-hidden p-2 rounded-full">
                <label for="ticketId" class="sr-only">ID del ticket:</label>
                <input id="ticketId" v-model="ticketId" class="border-1 flex-1 outline-none px-5 py-2 rounded-full w-full"
                  placeholder="Ingrese el ID del ticket" type="text" required />
                <button type="submit" class="ml-2 bg-secondary-500 text-white px-4 py-2 rounded-full">
                  Buscar
                </button>
              </div>
            </form>
            <div v-if="ticketData" class="mt-8 bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg">
              <h3 class="text-2xl font-semibold mb-4">Detalles del Ticket</h3>
              <p><strong>Email:</strong> {{ ticketData.ticket.email }}</p>
              <p><strong>Nombre:</strong> {{ ticketData.ticket.name }}</p>
              <p><strong>Apellido:</strong> {{ ticketData.ticket.lastName }}</p>
              <p><strong>Teléfono:</strong> {{ ticketData.ticket.phone }}</p>
              <p><strong>Asientos de salida:</strong> {{ ticketData.ticket.departureSeat ?
                ticketData.ticket.departureSeat.join(', ') : 'No disponible' }}</p>
              <div v-if="ticketData.ticket.returnSeat">
                <p><strong>Asientos de regreso:</strong> {{ ticketData.ticket.returnSeat ?
                  ticketData.ticket.returnSeat.join(', ') : 'No disponible' }}</p>
              </div>
              <p><strong>Precio:</strong> ${{ ticketData.ticket.price }} MXN</p>
              <p><strong>Trip ID:</strong> {{ ticketData.ticket.tripId }}</p>
              <div v-if="ticketData.ticket.tripIdReturn">
                <p><strong>Trip ID de regreso:</strong> {{
                  ticketData.ticket.tripIdReturn }}</p>
              </div>
            </div>
            <div v-else class="mt-8" v-if="message">{{ message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-primary-600 {
  background-color: #1a202c;
  /* Ejemplo de color primario oscuro */
}

.dark .bg-primary-200 {
  background-color: #edf2f7;
  /* Ejemplo de color primario claro */
}

.text-primary-800 {
  color: #2d3748;
  /* Ejemplo de color de texto primario oscuro */
}

.tertiary-card {
  background-color: #f7fafc;
  /* Ejemplo de color de fondo para la tarjeta */
}

.dark .tertiary-card {
  background-color: #2d3748;
  /* Ejemplo de color de fondo para la tarjeta en modo oscuro */
}

.bg-secondary-500 {
  background-color: #48bb78;
  /* Ejemplo de color secundario */
}

.text-white {
  color: #fff;
  /* Color de texto blanco */
}
</style>
