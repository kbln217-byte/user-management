<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loggedIn = ref(localStorage.getItem("loggedIn") === "true");

function login() {
  localStorage.setItem("loggedIn", "true");
  loggedIn.value = true;
}

function logout() {
  localStorage.setItem("loggedIn", "false");
  loggedIn.value = false;
}

function goTodo() {
  router.push("/todo");
}
</script>

<template>
  <div>
    <h1>Home</h1>

    <p>ログイン状態: {{ loggedIn ? "ON" : "OFF" }}</p>

    <button v-if="!loggedIn" @click="login">ログイン</button>
    <button v-else @click="logout">ログアウト</button>

    <button @click="goTodo">Todoへ移動（ガード確認）</button>

    <br>
    <br>
    
    <h1>ユーザー一覧（仮）</h1>
<br>
 <router-link v-for="id in 10" :key="id" to="'/users/${{ id }}'">
    ユーザー{{ id }}
</router-link>
<br>
<br>

  </div>
</template>