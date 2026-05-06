<template>
  <div class="goal-detail" v-if="goal">
    <router-link to="/goals" class="back">← Back to Goals</router-link>
    <h1>{{ goal.title }}</h1>
    <div class="meta">
      <span class="badge">{{ goal.category }}</span>
      <span class="badge">{{ goal.trackingType }}</span>
      <span>🗓 Target: {{ new Date(goal.targetDate).toLocaleDateString() }}</span>
    </div>
    <p>{{ goal.description }}</p>

    <section class="section">
      <h2>📈 Progress Log</h2>
      <form @submit.prevent="logProgress" class="progress-form">
        <input v-model="progressNote" placeholder="Note (optional)" />
        <input v-model="progressDate" type="date" required />
        <label><input v-model="progressCompleted" type="checkbox" /> Completed</label>
        <button type="submit">Log Progress</button>
      </form>
      <div v-for="entry in progressStore.entries" :key="entry._id" class="progress-entry">
        <span>{{ new Date(entry.date).toLocaleDateString() }}</span>
        <span :class="entry.completed ? 'done' : 'missed'">{{ entry.completed ? '✅' : '❌' }}</span>
        <span>{{ entry.note }}</span>
      </div>
    </section>
  </div>
  <div v-else class="loading">Loading goal...</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProgressStore } from '../stores/progressStore'
import type { Goal } from '../types/Goal'
import client from '../api/client'

const route = useRoute()
const progressStore = useProgressStore()

const goal = ref<Goal | null>(null)
const progressNote = ref('')
const progressDate = ref(new Date().toISOString().split('T')[0])
const progressCompleted = ref(true)

const logProgress = async () => {
  if (!goal.value) return
  await progressStore.logProgress({
    goal: goal.value._id,
    date: progressDate.value,
    completed: progressCompleted.value,
    note: progressNote.value,
  })
  progressNote.value = ''
}

onMounted(async () => {
  const id = route.params.id as string
  const { data } = await client.get(`/goals/${id}`)
  goal.value = data
  await progressStore.fetchByGoal(id)
})
</script>

<style scoped>
.goal-detail { padding: 2rem; max-width: 800px; margin: 0 auto; }
.back { color: #3498db; text-decoration: none; }
.meta { display: flex; gap: 0.5rem; align-items: center; margin: 1rem 0; flex-wrap: wrap; }
.badge { background: #e8f4fd; color: #2980b9; padding: 0.2rem 0.7rem; border-radius: 20px; font-size: 0.85rem; }
.section { margin-top: 2rem; background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.progress-form { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.progress-form input { padding: 0.5rem; border: 1px solid #ddd; border-radius: 6px; }
.progress-form button { background: #2ecc71; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; }
.progress-entry { display: flex; gap: 1rem; padding: 0.5rem; border-bottom: 1px solid #f0f0f0; }
.done { color: green; }
.missed { color: red; }
.loading { padding: 3rem; text-align: center; }
</style>