<script setup lang="ts">
import { onMounted, ref } from "vue";
import { api } from "../lib/api";

type User = { id: number; name: string };

const loading = ref(false);
const error = ref<string | null>(null);
const items = ref<User[]>([]);

const newName = ref("");
const newEmail = ref("");
const editingId = ref<number | null>(null);
const editingName = ref("");

async function fetchUsers() {
  loading.value = true;
  error.value = null;

  try {
    const res = await api.get("/users");
    items.value = res.data.items ?? [];
  } catch (e: any) {
     e?.response?.data?.error?.message ??
     e?.response?.data?.message ??
     e?.message ??
     "通信に失敗しました";
  } finally {
    loading.value = false;
  }
}

async function addUser() {
  if (!newName.value.trim()) return;

  loading.value = true;
  error.value = null;

  try {
    await api.post("/users", { name: newName.value.trim(), email: newEmail.value.trim()});
    newName.value = "";
    newEmail.value = "";
    await fetchUsers();
  } catch (e: any) {
     e?.response?.data?.error?.message ??
     e?.response?.data?.message ??
     e?.message ??
     "通信に失敗しました";
  } finally {
    loading.value = false;
  }
}

function startEdit(u: User) {
  editingId.value = u.id;
  editingName.value = u.name;
}

function cancelEdit() {
  editingId.value = null;
  editingName.value = "";
}

async function updateUser() {
  if (editingId.value == null) return;
  if (!editingName.value.trim()) return;

  loading.value = true;
  error.value = null;

  try {
    await api.put(`/users/${editingId.value}`, { name: editingName.value.trim() });
    cancelEdit();
    await fetchUsers();
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? e?.message ?? "更新に失敗しました";
  } finally {
    loading.value = false;
  }
}

async function deleteUser(id: number) {
  loading.value = true;
  error.value = null;

  try {
    await api.delete(`/users/${id}`);
    await fetchUsers();
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? e?.message ?? "削除に失敗しました";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <main style="max-width: 720px; margin: 24px auto; padding: 0 12px;">
    <h1>Users</h1>

    <section style="margin: 12px 0;">
      <h2 style="font-size: 16px;">追加</h2>
      <div style="display: flex; gap: 8px; align-items: center;">
        <input v-model="newName" placeholder="name" style="flex: 1; padding: 8px;" />
        <input v-model="newEmail" placeholder="email" style="flex: 1; padding: 8px;" />
        <button :disabled="loading" @click="addUser">追加</button>
      </div>
    </section>

    <section v-if="error" style="background: #ffecec; padding: 10px; border-radius: 6px; margin: 12px 0;">
      {{ error }}
    </section>

    <section v-if="loading" style="margin: 12px 0;">
      読み込み中...
    </section>

    <section v-else>
      <!-- 空状態 -->
      <p v-if="items.length === 0" style="opacity: 0.7;">
        ユーザーがいません。上のフォームから追加してください。
      </p>

      <ul v-else style="padding-left: 16px;">
        <li v-for="u in items" :key="u.id" style="margin: 8px 0;">
          <template v-if="editingId === u.id">
            <input v-model="editingName" style="padding: 6px;" />
            <button :disabled="loading" @click="updateUser">保存</button>
            <button :disabled="loading" @click="cancelEdit">キャンセル</button>
          </template>

          <template v-else>
            <span>{{ u.id }}: {{ u.name }}</span>
            <button :disabled="loading" style="margin-left: 8px;" @click="startEdit(u)">編集</button>
            <button :disabled="loading" @click="deleteUser(u.id)">削除</button>
          </template>
        </li>
      </ul>
    </section>
  </main>
</template>