<template>
  <div class="explore-page">
    <h1>🌍 Explore Public Goals</h1>
    <p class="subtitle">Get inspired by goals from the community</p>
    <div v-if="loading" class="loading">Loading...</div>
    <div class="explore-grid">
      <div v-for="goal in goalStore.publicGoals" :key="goal._id" class="explore-card">
        <span class="category-badge">{{ goal.category }}</span>
        <h3>{{ goal.title }}</h3>
        <p>{{ goal.description }}</p>
        <p class="meta">🗓 Target: {{ new Date(goal.targetDate).toLocaleDateString() }}</p>
      </div>
    </div>
    <p v-if="!loading && !goalStore.publicGoals.length" class="empty">No public goals yet. Be the first!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGoalStore } from '../stores/goalStore'

const goalStore = useGoalStore()
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  await goalStore.fetchPublicGoals()
  loading.value = false
})
</script>

<style scoped>
.explore-page { padding: 2rem; max-width: 1100px; margin: 0 auto; }
.subtitle { color: #666; margin-bottom: 2rem; }
.explore-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.explore-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.category-badge { background: #e8f4fd; color: #2980b9; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem; }
.meta { color: #999; font-size: 0.85rem; margin-top: 0.5rem; }
.empty { text-align: center; color: #999; padding: 3rem; }
.loading { text-align: center; padding: 2rem; }
</style>