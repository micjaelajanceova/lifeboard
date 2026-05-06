<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>🎯 VisionFlow</h1>
      <h2>Create account</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="username" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password (min 6)" required minlength="6" />
        <p v-if="error" class="error">{{ error }}</p>
        <button type="submit" :disabled="loading">{{ loading ? 'Creating...' : 'Register' }}</button>
      </form>
      <p>Have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const auth = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  error.value = ''
  loading.value = true
  try {
    await auth.register(username.value, email.value, password.value)
    router.push('/dashboard')
  } catch (e: any) {
  console.log("REGISTER ERROR:", e.response?.data || e)
  error.value = e.response?.data?.message || 'Registration failed'
} finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1a1a2e, #16213e); }
.auth-card { background: white; padding: 2.5rem; border-radius: 16px; width: 90%; max-width: 400px; text-align: center; }
h1 { font-size: 2rem; }
h2 { color: #666; margin-bottom: 1.5rem; }
form { display: flex; flex-direction: column; gap: 1rem; }
input { padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; }
button { padding: 0.8rem; background: #2ecc71; color: white; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; }
.error { color: #e74c3c; font-size: 0.9rem; }
</style>