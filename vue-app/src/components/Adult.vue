<script setup>
const props = defineProps({
  message: String
})

const emit =defineEmits (["notify"])

function send(){
    emit("notify", props.message)
}
</script>

<template>

  <h1>{{ props.message }}</h1>
  <button @click="send">親に通知</button>

</template>