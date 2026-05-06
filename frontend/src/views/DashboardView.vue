<template>
  <div class="dashboard">
    <h1>👋 Welcome, {{ auth.user?.username }}</h1>
    <div class="stats-grid">
      <div class="stat-card">
        <span class="stat-number">{{ goalStore.goals.length }}</span>
        <span class="stat-label">Active Goals</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ completedThisWeek }}</span>
        <span class="stat-label">Completed This Week</span>
      </div>
      <div class="stat-card">
        <span class="stat-number">{{ journalStore.entries.length }}</span>
        <span class="stat-label">Journal Entries</span>
      </div>
    </div>
    <section class="section">
      <h2>🎯 Your Goals</h2>
      <div class="goals-preview">
        <GoalCard
          v-for="goal in goalStore.goals.slice(0, 4)"
          :key="goal._id"
          :goal="goal"
          @edit="() => {}"
          @delete="() => {}"
        />
      </div>
      <router-link to="/goals" class="see-all">See all goals →</router-link>
    </section>
    <section class="section">
      <h2>📓 Recent Journal Entries</h2>
      <div v-for="entry in journalStore.entries.slice(0, 3)" :key="entry._id" class="journal-preview">
        <strong>{{ entry.title }}</strong>
        <p>{{ entry.content.substring(0, 100) }}...</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useGoalStore } from '../stores/goalStore'
import { useJournalStore } from '../stores/journalStore'
import GoalCard from '../components/goals/GoalCard.vue'

const auth = useAuthStore()
const goalStore = useGoalStore()
const journalStore = useJournalStore()

const completedThisWeek = computed(() => 0) // can be wired to progressStore later

onMounted(async () => {
  await Promise.all([goalStore.fetchGoals(), journalStore.fetchEntries()])
})
</script>

<style scoped>
.dashboard { padding: 2rem; max-width: 1200px; margin: 0 auto; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
.stat-card { background: white; border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; }
.stat-number { font-size: 2.5rem; font-weight: bold; color: #3498db; }
.stat-label { color: #666; font-size: 0.9rem; }
.section { margin-top: 2rem; }
.goals-preview { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; margin-top: 1rem; }
.see-all { display: inline-block; margin-top: 1rem; color: #3498db; }
.journal-preview { background: white; border-radius: 8px; padding: 1rem; margin-top: 0.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
</style>