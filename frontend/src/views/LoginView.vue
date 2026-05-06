<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>🎯 VisionFlow</h1>
      <h2>Welcome back</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Login' }}</button>
      </form>
      <p>No account? <router-link to="/register">Register</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a1a2e, #16213e); }
.auth-card { background: white; padding: 2.5rem; border-radius: 16px; width: 90%; max-width: 400px; text-align: center; }
h1 { font-size: 2rem; margin-bottom: 0; }
h2 { color: #666; margin-bottom: 1.5rem; }
form { display: flex; flex-direction: column; gap: 1rem; }
input { padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; }
button { padding: 0.8rem; background: #3498db; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
button:disabled { opacity: 0.6; }
.error { color: #e74c3c; font-size: 0.9rem; }
</style>