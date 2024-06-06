<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const ticketInfo = ref<any>(null)
const formData = ref<any>(null)
const selectedTicketIda = ref<string | null>(null)
const selectedTicketVuelta = ref<string | null>(null)
const selectedTicketIdaSeats = ref<string | null>(null)
const selectedTicketVueltaSeats = ref<string | null>(null)
const router = useRouter()

const totalPrice = computed(() => {
  let total = 0
  const pricePerPerson = selectedTicketIda.value ? ticketInfo.value.ticketInfo.find(ticket => ticket.id === selectedTicketIda.value).price : 0
  const returnPricePerPerson = selectedTicketVuelta.value ? ticketInfo.value.ticketInfoReturn.find(ticket => ticket.id === selectedTicketVuelta.value).price : 0
  total += pricePerPerson * (formData.value?.passangers || 0)
  total += returnPricePerPerson * (formData.value?.passangers || 0)
  total += formData.value.extraluggage ? 100 : 0
  return total
})

onMounted(() => {
  const storedTicketInfo = localStorage.getItem('ticketInfo')
  const storedFormData = localStorage.getItem('formData')

  if (storedTicketInfo) {
    ticketInfo.value = JSON.parse(storedTicketInfo)
  }

  if (storedFormData) {
    formData.value = JSON.parse(storedFormData)
  }
})

const selectTicket = (type, ticketId, seats) => {
  if (type === 'ida') {
    selectedTicketIda.value = selectedTicketIda.value === ticketId ? null : ticketId;
    selectedTicketIdaSeats.value = seats;
  } else if (type === 'vuelta') {
    selectedTicketVuelta.value = selectedTicketVuelta.value === ticketId ? null : ticketId;
    selectedTicketVueltaSeats.value = seats;
  }
}

const continueSelection = () => {
  const purchaseData = {
    departureCity: formData.value.departureCity,
    arrivalCity: formData.value.arrivalCity,
    departureDate: formData.value.departureDate,
    returnDate: formData.value.returnDate,
    isRounded: !!formData.value.returnDate,
    passangers: formData.value.passangers,
    extraluggage: formData.value.extraluggage,
    tripId: selectedTicketIda.value,
    tripIdReturn: selectedTicketVuelta.value,
    departureSeat: selectedTicketIdaSeats.value,
    returnSeat: selectedTicketVueltaSeats.value,
    price: totalPrice.value,
  }
  localStorage.setItem('purchaseData', JSON.stringify(purchaseData))
  router.push({ name: 'purchaseTicket' })
}
</script>

<template>
  <section class="p-6 bg-white dark:bg-gray-800 text-black dark:text-white">
    <h2 class="text-2xl font-bold mb-4">Resultados de Tours</h2>
    <div v-if="formData" class="mb-6 flex flex-wrap -mx-4">
      <div class="w-full lg:w-1/2 px-4">
        <p><strong>Origen:</strong> {{ formData.departureCity }}</p>
        <p><strong>Destino:</strong> {{ formData.arrivalCity }}</p>
        <p><strong>Fecha de salida:</strong> {{ formData.departureDate }}</p>
        <div class=" text-center m-2">
          <p><strong>Pasajeros:</strong> {{ formData.passangers }}
            <strong> | Equipaje extra:</strong> {{ formData.extraluggage ? 'Sí' : 'No' }}
          </p>
        </div>
      </div>
      <div v-if="formData.returnDate" class="w-full lg:w-1/2 px-4">
        <p><strong>Origen:</strong> {{ formData.arrivalCity }}</p>
        <p><strong>Destino:</strong> {{ formData.departureCity }}</p>
        <p><strong>Fecha de regreso:</strong> {{ formData.returnDate }}</p>
        <div class=" text-center m-2">
          <p><strong>Pasajeros:</strong> {{ formData.passangers }}
            <strong> | Equipaje extra:</strong> {{ formData.extraluggage ? 'Sí' : 'No' }}
          </p>
        </div>
      </div>

    </div>
    <div class="flex flex-wrap -mx-4">
      <div class="w-full lg:w-1/2 px-4">
        <h3 class="text-xl font-semibold mb-4">SELECCIONA TU TOUR DE IDA</h3>
        <div class="bg-gray-800 dark:bg-white rounded-lg p-8">
          <div v-if="ticketInfo && ticketInfo.ticketInfo.length">
            <div v-for="ticket in ticketInfo.ticketInfo" :key="ticket.id"
              :class="['bg-white dark:bg-gray-800 gray-100 p-4 border rounded-lg mb-4', selectedTicketIda === ticket.id ? 'border-green-500' : 'border-gray-300']"
              @click="selectTicket('ida', ticket.id, ticket.seats)">
              <h3 class="text-lg font-semibold">Ubicacion de recogida: {{ ticket.departureLocation }}</h3>
              <h3 class="text-lg font-semibold"> Ubicacion de llegada: {{ ticket.arrivalLocation }}</h3>
              <p><strong>Fecha:</strong> {{ new Date(ticket.departureDate._seconds * 1000).toLocaleDateString() }}</p>
              <p><strong>Salida:</strong> {{ ticket.itinerary[0] }} <strong>Llegada:</strong> {{ ticket.itinerary[1] }}
              </p>
              <p><strong>Precio:</strong> ${{ ticket.price }} MXN</p>
              <p><strong>Asientos disponibles:</strong> {{ ticket.avaavailableSeats }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-1/2 px-4" v-if="ticketInfo && ticketInfo.ticketInfoReturn">
        <h3 class="text-xl font-semibold mb-4">SELECCIONA TU TOUR DE REGRESO</h3>
        <div class="bg-gray-800 dark:bg-white rounded-lg p-8">
          <div v-if="ticketInfo.ticketInfoReturn.length">
            <div v-for="ticket in ticketInfo.ticketInfoReturn" :key="ticket.id"
              :class="['bg-white dark:bg-gray-800 p-4 border rounded-lg mb-4', selectedTicketVuelta === ticket.id ? 'border-green-500' : 'border-gray-300']"
              @click="selectTicket('vuelta', ticket.id, ticket.seats)">
              <h3 class="text-lg font-semibold">Ubicacion de recogida: {{ ticket.departureLocation }}</h3>
              <h3 class="text-lg font-semibold"> Ubicacion de llegada: {{ ticket.arrivalLocation }}</h3>
              <p><strong>Fecha:</strong> {{ new Date(ticket.departureDate._seconds * 1000).toLocaleDateString() }}</p>
              <p><strong>Salida:</strong> {{ ticket.itinerary[0] }} <strong>Llegada:</strong> {{ ticket.itinerary[1] }}
              </p>
              <p><strong>Precio:</strong> ${{ ticket.price }} MXN</p>
              <p><strong>Asientos disponibles:</strong> {{ ticket.avaavailableSeats }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedTicketIda && (!ticketInfo.ticketInfoReturn || selectedTicketVuelta)"
      class="mt-6 flex justify-center">
      <button @click="continueSelection" class="bg-green-500 text-white p-4 rounded-lg shadow-lg animate-slideUp">
        CONTINUAR CON MI SELECCIÓN
        <br />
        <span>Total: ${{ totalPrice }} MXN</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
/* ... */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slideUp {
  animation: slideUp 0.5s ease-out forwards;
}


/* ... */
.border-green-500 {
  border-color: #48bb78;
  border-width: 8px;
  /* Green-500 color */
}

.bg-green-500 {
  background-color: #48bb78;
  /* Green-500 color */
}
</style>
