<script setup lang="ts">
import { onMounted, ref } from "vue";
import UsersPage from "./pages/UsersPage.vue";
import { api, setAuthToken } from "./lib/api";

const email = ref("demo@example.com");
const password = ref("password");

const token = ref<string | null>(null);
const loginError = ref<string | null>(null);
const loggingIn = ref(false);

function loadToken() {
  token.value = localStorage.getItem("token");
  setAuthToken(token.value);
}

async function login() {
  loggingIn.value = true;
  loginError.value = null;

  try {
    // body: { email, password }
    const res = await api.post("/auth/login", { email: email.value, password: password.value });
    const t = res.data.token as string | undefined;

    if (!t) throw new Error("token が返ってきませんでした");

    localStorage.setItem("token", t);
    token.value = t;
    setAuthToken(t);
  } catch (e: any) {
    loginError.value = e?.response?.data?.message ?? e?.message ?? "ログインに失敗しました";
    localStorage.removeItem("token");
    token.value = null;
    setAuthToken(null);
  } finally {
    loggingIn.value = false;
  }
}

function logout() {
  localStorage.removeItem("token");
  token.value = null;
  setAuthToken(null);
}

onMounted(() => {
  loadToken();
});
</script>

<template>
  <div style="max-width: 760px; margin: 24px auto; padding: 0 12px;">
    <h1>Lesson 52 - API Integration</h1>

    <section style="border: 1px solid #ddd; padding: 12px; border-radius: 8px; margin: 12px 0;">
      <h2 style="font-size: 16px;">ログイン</h2>

      <div v-if="token" style="display: flex; gap: 8px; align-items: center; justify-content: center;">
        <span style="opacity: 0.8;">ログイン済み（tokenあり）</span>
        <button @click="logout">ログアウト</button>
      </div>

      <div v-else style="display: grid; gap: 8px; max-width: 360px;">
        <input v-model="email" placeholder="email" style="padding: 8px;" />
        <input v-model="password" placeholder="password" type="password" style="padding: 8px;" />
        <button :disabled="loggingIn" @click="login">ログイン</button>
      </div>

      <p v-if="loginError" style="color: #b00020; margin-top: 8px;">
        {{ loginError }}
      </p>

      <p style="opacity: 0.7; margin-top: 8px;">
        学習用アカウント：demo@example.com / password
      </p>
    </section>

    <section style="border-top: 1px solid #eee; padding-top: 12px;">
      <p style="opacity: 0.7;">
        ※ Users は保護APIです。ログイン後に一覧が取れることを確認してください。
      </p>
      <UsersPage v-if="token"/>
    </section>
  </div>
</template>
