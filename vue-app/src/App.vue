<script setup lang="ts">
import TaskList from "./components/TaskList.vue";
import { useTasks } from "./composables/useTasks";

const {
  newTitle,
  filter,
  doneCount,
  cleanTaskCount,
  activeCount,
  filteredTasks,
  addTask,
  toggleTask,
  removeTask,
  editTask,
  setFilter,
} = useTasks();
</script>

<template>
  <main>
    <p>done: {{ doneCount }} / active: {{ activeCount }} / 掃除: {{ cleanTaskCount }} </p>

    <div>
      <button type="button" @click="setFilter('all')">all</button>
      <button type="button" @click="setFilter('active')">active</button>
      <button type="button" @click="setFilter('done')">done</button>
      <span>（current: {{ filter }}）</span>
    </div>

    <h1>Tasks</h1>

    <form @submit.prevent="addTask">
      <input v-model="newTitle" placeholder="New task" />
      <button type="submit">追加</button>
    </form>

    <TaskList v-bind:tasks="filteredTasks" @toggle="toggleTask" @remove="removeTask" @edit="editTask" />
  </main>
</template>