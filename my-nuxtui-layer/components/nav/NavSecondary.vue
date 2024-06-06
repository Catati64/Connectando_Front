<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const { navlinksSecondary } = useNav()
const router = useRouter()

const isLoggedIn = ref(false)
const avatarUrl = ref('https://avatars.githubusercontent.com/u/73910005?v=4')
const dropdownItems = ref([])

const checkSession = () => {
  const token = localStorage.getItem('token')
  const imgURL = localStorage.getItem('imgURL')

  if (token) {
    isLoggedIn.value = true
    if (imgURL) {
      avatarUrl.value = imgURL
    }
  } else {
    isLoggedIn.value = false
    avatarUrl.value = 'https://avatars.githubusercontent.com/u/73910005?v=4'
  }

  updateDropdownItems()
}

onMounted(() => {
  checkSession()
})

watch(() => localStorage.getItem('token'), () => {
  checkSession()
})

const updateDropdownItems = () => {
  dropdownItems.value = [
    [
      {
        slot: 'account',
        disabled: true
      },
      ...navlinksSecondary.value.map((navlink) => ({
        slot: navlink.link.replace(/^\//, '').replaceAll('/', '-'),
        label: navlink.text,
        icon: navlink.icon,
        to: navlink.link,
        activeClass: 'text-primary',
        disabled: false
      })),
      isLoggedIn.value
        ? {
            slot: 'logout',
            label: 'Cerrar Sesión',
            icon: 'i-mdi-logout',
            onClick: logout,
            disabled: false
          }
        : {
            slot: 'login',
            label: 'Sign In / Join Us',
            icon: 'i-mdi-login',
            onClick: () => router.push({ name: 'login' }),
            disabled: false
          }
    ],
  ]
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('imgURL')
  isLoggedIn.value = false
  avatarUrl.value = 'https://avatars.githubusercontent.com/u/73910005?v=4'
  updateDropdownItems()
  router.push('/')
}
</script>

<template>
  <UDropdown
    :popper="{ placement: 'bottom-start' }"
    :ui="{
      container: '!-ml-2 sm:ml-auto',
      rounded: '',
      width: 'w-full sm:w-48',
      item: { disabled: 'cursor-text select-text opacity-100' },
    }"
    :items="dropdownItems"
  >
    <UAvatar
      :src="avatarUrl"
      alt="Avatar"
      size="lg"
      class="sm:ml-2"
    />
    <template #account>
      <div class="my-1 space-x-1 w-full">
        <ProfileActions class="sm:!hidden" />
        <UButton
          v-if="isLoggedIn"
          class="font-bold my-4 sm:my-2"
          @click="logout"
        >
          Cerrar Sesión
        </UButton>
        <UButton
          v-else
          class="font-bold my-4 sm:my-2"
          @click="() => router.push({ name: 'login' })"
        >
          Sign In / Join Us
        </UButton>
      </div>
    </template>
  </UDropdown>
</template>

<style scoped></style>
