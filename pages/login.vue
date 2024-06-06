<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const isLoginMode = ref(true)
const router = useRouter()
const form = ref({
  email: '',
  password: '',
  name: '',
  apaterno: '',
  amaterno: '',
  direccion: '',
  telefono: '',
  imgURL: ''
})

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  resetForm()
}

const resetForm = () => {
  form.value = {
    email: '',
    password: '',
    name: '',
    apaterno: '',
    amaterno: '',
    direccion: '',
    telefono: '',
    imgURL: ''
  }
}

const submitForm = async () => {
  if (isLoginMode.value) {
    try {
      const response = await axios.post('http://localhost:3010/login', {
        email: form.value.email,
        password: form.value.password
      })
      const { token, imgURL, email } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('imgURL', imgURL)
      localStorage.setItem('userId', email)
      router.push('/')
    } catch (error) {
      console.error(error)
      alert('Error al iniciar sesión. Por favor, intente nuevamente.')
    }
  } else {
    try {
      await axios.post('http://localhost:3010/register', {
        email: form.value.email,
        password: form.value.password,
        name: form.value.name,
        apaterno: form.value.apaterno,
        amaterno: form.value.amaterno,
        direccion: form.value.direccion,
        telefono: form.value.telefono,
        imgURL: form.value.imgURL
      })
      alert('Cuenta creada correctamente.')
      toggleMode()
    } catch (error) {
      console.error(error)
      alert('Error al registrar. Por favor, intente nuevamente.')
    }
  }
}
</script>

<template>
  <div class="container dark:text-black mx-auto px-4 py-12">
    <div class="mx-auto w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
      <h2 class="text-center text-3xl font-bold">
        {{ isLoginMode ? 'Iniciar Sesión' : 'Registrar' }}
      </h2>
      <form @submit.prevent="submitForm">
        <div v-if="!isLoginMode" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium ">Nombre</label>
            <input v-model="form.name" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Apellido Paterno</label>
            <input v-model="form.apaterno" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Apellido Materno</label>
            <input v-model="form.amaterno" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Dirección</label>
            <input v-model="form.direccion" type="text" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Teléfono</label>
            <input v-model="form.telefono" type="tel" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">URL de Imagen</label>
            <input v-model="form.imgURL" type="text" class="w-full p-2 border rounded" required />
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Email</label>
            <input v-model="form.email" type="email" class="w-full p-2 border rounded" required />
          </div>
          <div>
            <label class="block mb-1 font-medium">Contraseña</label>
            <input v-model="form.password" type="password" class="w-full p-2 border rounded" required />
          </div>
        </div>
        <div class="mt-6">
          <button type="submit" class="w-full py-2 px-4 bg-blue-600 text-white rounded">
            {{ isLoginMode ? 'Iniciar Sesión' : 'Registrar' }}
          </button>
        </div>
      </form>
      <div class="text-center">
        <button @click="toggleMode" class="text-blue-600 hover:underline">
          {{ isLoginMode ? '¿No tienes una cuenta? Regístrate' : '¿Ya tienes una cuenta? Inicia sesión' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
