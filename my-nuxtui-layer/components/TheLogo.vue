<script setup lang="ts">
import { logoSVGUrl } from '@/utils/logo'
</script>
<template>
  <ULink data-pg-name="Logo" class="flex items-center sm:flex-row" to="/">
    <img :src=logoSVGUrl class="text-2xl" alt="logo" width="200" height="200" />
  </ULink>
</template>
<style scoped></style>
