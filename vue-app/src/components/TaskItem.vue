<script setup lang="ts">
type Task = { id:number; title:string; done:boolean }

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits([
  "toggle",
  "remove",
  "edit"
])

// function addTask() {
//   if (!newTitle.value.trim()) return;
//   tasks.value.push({ id: nextId++, title: newTitle.value.trim(), done: false });
//   newTitle.value = "";
// }


</script>

<template>
  <li>
    <label>
      <input
        type="checkbox"
        v-bind:checked="props.task.done"
        @change="emit('toggle', props.task.id, !props.task.done)"
      />
      {{ props.task.title }}
    </label>

    <button @click="emit('remove', props.task.id)">
      削除
    </button>

    <button @click="emit('edit', props.task.id)">
      編集
    </button>

  </li>



</template>