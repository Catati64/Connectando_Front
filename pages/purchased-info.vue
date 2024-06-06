<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const purchaseInfo = ref<any>(null)
const ticketid = ref<any>(null)
const route = useRoute()

onMounted(() => {
    const storedPurchasedInfoData = localStorage.getItem('purchaseinfo')
    if (storedPurchasedInfoData) {
        purchaseInfo.value = JSON.parse(storedPurchasedInfoData).purchase.buy
        ticketid.value = JSON.parse(storedPurchasedInfoData).purchase.ticketId
    }
})
</script>

<template>
  <section class="p-6 bg-white dark:bg-gray-800 text-black dark:text-white">
    <h2 class="text-2xl font-bold mb-4">Información de la Compra</h2>
    <div v-if="purchaseInfo">
      <p><strong>Email:</strong> {{ purchaseInfo.email }}</p>
      <p><strong>Nombre:</strong> {{ purchaseInfo.name }}</p>
      <p><strong>Apellido:</strong> {{ purchaseInfo.lastName }}</p>
      <p><strong>Teléfono:</strong> {{ purchaseInfo.phone }}</p>
      <p><strong>departureSeat:</strong> {{ purchaseInfo.departureSeat }}</p>
      <p v-if="purchaseInfo.returnSeat "><strong>returnSeat:</strong> {{ purchaseInfo.returnSeat }}</p>
      <p><strong>passengers:</strong> {{ purchaseInfo.passengers }}</p>
      <p><strong>tripId:</strong> {{ purchaseInfo.tripId }}</p>
      <p v-if="purchaseInfo.tripIdReturn "><strong>tripIdReturn:</strong> {{ purchaseInfo.tripIdReturn }}</p>
      <p class="text-2xl font-bold mb-4">{{ticketid}} &LT;-- ANOTA ESTA CLAVE, ES TU TICKET PARA SUBIR AL BUS</p>
    </div>
  </section>
</template>

<style scoped>
/* ... */
</style>
