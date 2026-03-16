<template>
  <nav style="display:flex; gap:12px;">
    <router-link to="/">Home</router-link>
    <router-link to="/todo">Todo</router-link>
    <router-link to="/users/1">User 1</router-link>
    <router-link to="/settings/profile">Settings</router-link>
  </nav>

  <hr />

  <router-view />
</template>