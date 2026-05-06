<template>
  <div class="challenge-page">
    <div class="page-header">
      <h1>🧩 30-Day Challenges</h1>
      <button @click="showForm = true" class="btn-primary">+ New Challenge</button>
    </div>

    <div v-if="showForm" class="challenge-form">
      <input v-model="form.title" placeholder="Challenge title" />
      <textarea v-model="form.description" rows="3" placeholder="Description" />
      <input v-model="form.startDate" type="date" />
      <div class="form-actions">
        <button @click="handleCreate" class="btn-save">Create</button>
        <button @click="showForm = false" class="btn-cancel">Cancel</button>
      </div>
    </div>

    <div v-for="challenge in challengeStore.challenges" :key="challenge._id" class="challenge-card">
      <div class="challenge-header">
        <h3>{{ challenge.title }}</h3>
        <button @click="challengeStore.deleteChallenge(challenge._id)" class="btn-delete">Delete</button>
      </div>
      <p>{{ challenge.description }}</p>
      <p class="streak">🔥 Streak: {{ getStreak(challenge) }} days | {{ challenge.completedDays.length }}/30 completed</p>
      <div class="days-grid">
        <button
          v-for="day in 30"
          :key="day"
          class="day-btn"
          :class="{ completed: challenge.completedDays.includes(day) }"
          @click="challengeStore.toggleDay(challenge._id, day)"
        >{{ day }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useChallengeStore } from '../stores/challengeStore'
import type { Challenge } from '../stores/challengeStore'

const challengeStore = useChallengeStore()
const showForm = ref(false)
const form = reactive({ title: '', description: '', startDate: new Date().toISOString().split('T')[0] })

const handleCreate = async () => {
  await challengeStore.createChallenge({ ...form })
  showForm.value = false
  form.title = ''
  form.description = ''
}

const getStreak = (challenge: Challenge): number => {
  let streak = 0
  for (let i = 30; i >= 1; i--) {
    if (challenge.completedDays.includes(i)) streak++
    else break
  }
  return streak
}

onMounted(() => challengeStore.fetchChallenges())
</script>

<style scoped>
.challenge-page { padding: 2rem; max-width: 900px; margin: 0 auto; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.challenge-form { background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 0.8rem; }
.challenge-form input, .challenge-form textarea { padding: 0.6rem; border: 1px solid #ddd; border-radius: 6px; }
.form-actions { display: flex; gap: 0.5rem; }
.challenge-card { background: white; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.challenge-header { display: flex; justify-content: space-between; align-items: center; }
.streak { color: #f39c12; margin: 0.5rem 0; font-weight: bold; }
.days-grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 6px; margin-top: 1rem; }
.day-btn { padding: 0.4rem; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; background: white; font-size: 0.8rem; transition: all 0.2s; }
.day-btn.completed { background: #2ecc71; color: white; border-color: #27ae60; }
.btn-primary, .btn-save { background: #3498db; color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 6px; cursor: pointer; }
.btn-delete { background: #e74c3c; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 6px; cursor: pointer; }
.btn-cancel { background: #95a5a6; color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 6px; cursor: pointer; }
</style>