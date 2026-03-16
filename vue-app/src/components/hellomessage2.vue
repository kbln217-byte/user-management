<script setup lang="ts">
import { ref, computed } from "vue";
type Task = { id: number; title: string; done: boolean };

const tasks = ref<Task[]>([]);
const newTitle = ref("");

const sortedTasks = computed(() => {
const copied = tasks.value.slice();

copied.sort((a,b) =>{
  if(a.done === b.done) return 0;
  if(a.done)return 1;
  return -1;
});

return copied;
});

let nextId = 1;

const numbers = [5,2,8]
// faulsは０trueは１で評価されるためfaulsを先に記載する
numbers.sort((a,b) => {
  if(a === b) return 0;
  if(a>b)return 1;
  return -1;
});

function addTask() {
  if (!newTitle.value.trim()) return;
  tasks.value.push({ id: nextId++, title: newTitle.value.trim(), done: false });
  newTitle.value = "";
}

const doneCount = computed(() =>
  tasks.value.filter(t => t.done ).length
);

</script>

<template>

  <input v-model="newTitle" placeholder="task title" />
  <!-- ↑テキストボックス -->
  <button @click="addTask">追加</button>

 <p>count: {{ doneCount }}</p>
  
    <li v-for="t in sortedTasks" :key="t.id">
      <label> 
        <input type="checkbox" v-model="t.done" />
        {{ t.title }}
      </label>
    </li>

</template>




