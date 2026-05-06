<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/shared/Navbar.vue'
import { useAuthStore } from './stores/authStore'

const auth = useAuthStore()
onMounted(async () => {
  if (auth.token) await auth.fetchMe()
})
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #f5f7fa; color: #333; }
.main-content { min-height: calc(100vh - 64px); }
a { color: inherit; }
</style>