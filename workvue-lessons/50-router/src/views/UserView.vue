<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userId = computed(() => String(route.params.id ?? ""));
</script>

<template>
  <div>
    <h1>User</h1>
    <p>id: {{ userId }}</p>
  </div>
</template>