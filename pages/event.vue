<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const trips = ref([])

onMounted(async () => {
    const response = await axios.post('http://localhost:3010/get-all-trips')
    if (response.data.message === 'success') {
        trips.value = response.data.trips
    }
})
</script>

<template>
    <section class="p-6">

        <h2 class="text-2xl font-bold mb-4">Eventos Próximos</h2>
        <h3 class="text-lg mb-4">Descubre los mejores eventos en nuestros destinos.</h3>
        <div class="bg-gray-800 dark:bg-white rounded-lg p-8">
        <div v-if="trips.length">
            <div v-for="trip in trips" :key="trip.tripId" class="bg-white dark:bg-gray-800 p-4 border rounded-lg mb-4">
                <h3 class="text-lg font-semibold">Origen: {{ trip.departureCity }}</h3>
                <h3 class="text-lg font-semibold">Destino: {{ trip.arrivalCity }}</h3>
                <p><strong>Fecha de salida:</strong> {{ new Date(trip.departureDate._seconds *
                    1000).toLocaleDateString() }}
                </p>
                <p><strong>Precio:</strong> ${{ trip.price }} MXN</p>
                <p><strong>Asientos disponibles:</strong> {{ trip.availableSeats }}</p>
            </div>
        </div>
        </div>

    </section>
</template>
  
 
  
<style scoped>
/* ... */
</style>
  