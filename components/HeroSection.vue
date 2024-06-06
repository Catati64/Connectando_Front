<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { heroImageUrl } from '@/utils/hero'

const { optimizeImage } = useOptimizeImage()
const heroImageOptimized = {
  alt: `hero`,
  cover: true,
  ...optimizeImage(
    heroImageUrl,
    {
      placeholder: false,
    },
    true,
  ),
}

const heroImage = heroImageOptimized.src
const bgStyles = heroImageOptimized.bgStyles

const router = useRouter()

// Form state
const tripType = ref('redondo')
const origin = ref('')
const destination = ref('')
const departureDate = ref('')
const returnDate = ref('')
const users = ref(1)
const extraLuggage = ref(false)

const searchTours = async () => {
  try {
    const formData = {
      departureCity: origin.value,
      arrivalCity: destination.value,
      departureDate: departureDate.value,
      returnDate: tripType.value === 'redondo' ? returnDate.value : null,
      isRounded: tripType.value === 'redondo' ? 1 : 0,
      passangers: users.value,
      extraluggage: extraLuggage.value ? 1 : 0
    };
    const response = await axios.post('http://localhost:3010/get-tikectInfo', formData);
    
    // Save form data and response data to localStorage
    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('ticketInfo', JSON.stringify(response.data));
    
    router.push({ name: 'findTour' });
  } catch (error) {
    console.error('Error fetching ticket info:', error);
  }
}
</script>


<template>
  <section>
    <div class="bg-center bg-cover bg-no-repeat blur-none z-0" :style="bgStyles">
      <div class="pb-36 pt-2 px-6 relative rounded-3xl md:pb-48 lg:pb-72 lg:px-12">
        <div class="-mx-4 flex flex-wrap items-center justify-center mt-24 space-y-6 lg:space-y-0">
          <div class="px-4 text-center w-full md:w-8/12 xl:w-6/12">
            <h3 class="font-bold font-serif mb-1 uppercase lg:capitalize dark:text-white text-black">
              Bienvenido
            </h3>
            <p class="mb-4 dark:text-white text-black">
              ¿A donde viajaremos hoy?
            </p>
            <div class="flex justify-center mb-6">
              <button @click="tripType = 'redondo'" :class="tripType === 'redondo' ? 'bg-green-400 text-black' : 'bg-white text-black'" class="py-2 px-4 rounded-l-full">Redondo</button>
              <button @click="tripType = 'sencillo'" :class="tripType === 'sencillo' ? 'bg-green-400 text-black' : 'bg-white text-black'" class="py-2 px-4 rounded-r-full">Sencillo</button>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <div class="mb-4">
                <label class="block mb-2 text-black">Selecciona el origen</label>
                <select v-model="origin" class="w-full p-2 border rounded">
                  <option disabled value="">Selecciona el origen</option>
                  <option value="CDMX">CDMX</option>
                  <option value="LEON">LEON</option>
                  <option value="MONTERREY">MONTERREY</option>
                </select>
              </div>
              <div class="mb-4">
                <label class="block mb-2 text-black">Selecciona el destino</label>
                <select v-model="destination" class="w-full p-2 border rounded">
                  <option disabled value="">Selecciona el destino</option>
                  <option value="CDMX">CDMX</option>
                  <option value="LEON">LEON</option>
                  <option value="MONTERREY">MONTERREY</option>
                </select>
              </div>
              <div class="flex space-x-4 mb-4">
                <div class="w-1/2">
                  <label class="block mb-2 text-black">Salida</label>
                  <input v-model="departureDate" type="date" class="w-full p-2 border rounded" />
                </div>
                <div class="w-1/2" v-if="tripType === 'redondo'">
                  <label class="block mb-2 text-black">Regreso</label>
                  <input v-model="returnDate" type="date" class="w-full p-2 border rounded dark:text-black" />
                </div>
              </div>
              <div class="mb-4">
                <label class="block mb-2  text-black">Usuarios</label>
                <input v-model.number="users" type="number" min="1" class="w-full p-2 border rounded dark:text-black" />
              </div>
              <div class="mb-6">
                <label class="flex items-center space-x-2 text-black">
                  <input v-model="extraLuggage" type="checkbox" />
                  <span>Equipaje Extra</span>
                </label>
              </div>
              <UButton @click="searchTours" label="Buscar Tours" size="xl" trailing class="w-full bg-green-500 text-white rounded">
                Buscar Tours
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
