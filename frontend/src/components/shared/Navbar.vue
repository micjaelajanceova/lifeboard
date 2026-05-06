<template>
  <nav class="navbar">
    <router-link to="/dashboard" class="brand">🎯 VisionFlow</router-link>
    <div class="nav-links" v-if="auth.isAuthenticated">
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/goals">Goals</router-link>
      <router-link to="/calendar">Calendar</router-link>
      <router-link to="/progress">Progress</router-link>
      <router-link to="/journal">Journal</router-link>
      <router-link to="/challenges">Challenges</router-link>
      <router-link to="/explore">Explore</router-link>
      <button @click="handleLogout" class="logout-btn">Logout</button>
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #1a1a2e;
  color: white;
}
.brand { font-size: 1.4rem; font-weight: bold; color: white; text-decoration: none; }
.nav-links { display: flex; gap: 1rem; align-items: center; }
.nav-links a { color: #ccc; text-decoration: none; }
.nav-links a.router-link-active { color: white; font-weight: bold; }
.logout-btn { background: #e74c3c; color: white; border: none; padding: 0.4rem 1rem; border-radius: 4px; cursor: pointer; }
</style>