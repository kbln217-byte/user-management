<template>
  <div>
    <h1>Settings</h1>

    <nav style="display:flex; gap:12px;">
      <router-link to="/settings/profile">profile</router-link>
      <router-link to="/settings/security">security</router-link>
    </nav>

    <hr />
    <router-view />
  </div>
</template>