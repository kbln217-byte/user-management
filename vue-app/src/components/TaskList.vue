<script setup lang="ts">
import TaskItem from "./TaskItem.vue"

type Task = { id:number; title:string; done:boolean }

const props = defineProps<{ tasks:Task[] }>()

const emit = defineEmits([
  "toggle",
  "remove",
  "edit"
])
</script>

<template>
  <ul>
    <TaskItem
      v-for="t in props.tasks"
      v-bind:key="t.id"
      v-bind:task="t"
      @toggle="(id,done)=>emit('toggle',id,done)"
      @remove="(id)=>emit('remove',id)"
      @edit="(id)=>emit('edit',id)"
    />
  </ul>
</template>