<script setup lang="ts">
  import site from '@/site'
  const { name, logo } = site
</script>
<template>
    <ULink data-pg-name="Logo" class="flex items-center sm:flex-row" to="/">
        <UIcon :name="logo" class="text-4xl"></UIcon>
        <h6 class="dark:text-white font-extrabold font-serif ml-2 mt-4 text-2xl text-black">{{ name }}</h6>
    </ULink>
</template>
<style scoped></style>
