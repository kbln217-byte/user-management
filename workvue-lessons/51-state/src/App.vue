<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "./stores/todoStore";
import { useUiStore } from "./stores/uiStore";

const store = useTodoStore();
const uiStore = useUiStore();
const input = ref("");
</script>

<template>
  <main style="max-width:720px; margin: 0 auto; padding:16px;">
    <h1>Pinia Todo</h1>

    <div style="display:flex; gap:8px; margin:12px 0;">
      <input v-model="input" placeholder="title" style="flex:1; padding:8px;" />
      <button @click="store.add(input); input='';">Add</button>
    </div>

    <div style="display:flex; gap:8px; align-items:center; margin:12px 0;">
      <span>filter:</span>
      <button @click="uiStore.setFilter('all')">all</button>
      <button @click="uiStore.setFilter('active')">active</button>
      <button @click="uiStore.setFilter('done')">done</button>
      <span style="margin-left:auto;">remaining: {{ store.remainingCount }}</span>
      <span style="margin-left:auto;">done: {{ store.doneCount }}</span>
    </div>

    <ul>
      <li v-for="t in uiStore.filteredTodos" :key="t.id" style="display:flex; gap:8px; margin:6px 0;">
        <input type="checkbox" :checked="t.done" @change="store.toggle(t.id)" />
        <span :style="{ textDecoration: t.done ? 'line-through' : 'none' }">{{ t.title }}</span>
        <button style="margin-left:auto;" @click="store.remove(t.id)">Delete</button>
      </li>
    </ul>
  </main>
</template>