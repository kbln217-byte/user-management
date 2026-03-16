<script setup>
const props = defineProps({
  message: String,
  title: String
})

</script>

<template>
  <h1>{{ props.title }}</h1>
  <h2>{{ props.message }}</h2>

</template>