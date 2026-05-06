<template>
  <div class="progress-page">
    <h1>📈 Progress Overview</h1>
    <div class="summary-cards">
      <div class="summary-card">
        <span class="big-number">{{ goalStore.goals.length }}</span>
        <span>Total Goals</span>
      </div>
      <div class="summary-card">
        <span class="big-number">{{ overallPercent }}%</span>
        <span>Overall Completion</span>
      </div>
    </div>
    <section class="section">
      <h2>Progress by Category</h2>
      <ProgressBar
        v-for="cat in categoryStats"
        :key="cat.name"
        :label="cat.name"
        :percentage="cat.percentage"
        :color="cat.color"
      />
    </section>
    <section class="section">
      <h2>Goals Progress</h2>
      <div v-for="goal in goalStore.goals" :key="goal._id" class="goal-progress-row">
        <span>{{ goal.title }}</span>
        <span class="badge">{{ goal.trackingType }}</span>
        <span class="badge">{{ goal.category }}</span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGoalStore } from '../stores/goalStore'
import ProgressBar from '../components/ProgressBar.vue'

const goalStore = useGoalStore()

const categories = ['Health', 'Career', 'Finance', 'Education', 'Personal', 'Other']
const colors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c']

const overallPercent = computed(() => {
  if (!goalStore.goals.length) return 0
  const now = new Date().getTime()
  const completed = goalStore.goals.filter(g => new Date(g.targetDate).getTime() < now).length
  return Math.round((completed / goalStore.goals.length) * 100)
})

const categoryStats = computed(() =>
  categories.map((cat, i) => {
    const catGoals = goalStore.goals.filter(g => g.category === cat)
    return {
      name: cat,
      percentage: catGoals.length ? Math.min(100, catGoals.length * 20) : 0,
      color: colors[i],
    }
  }).filter(c => c.percentage > 0)
)

onMounted(() => goalStore.fetchGoals())
</script>

<style scoped>
.progress-page { padding: 2rem; max-width: 900px; margin: 0 auto; }
.summary-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin: 1.5rem 0; }
.summary-card { background: white; border-radius: 12px; padding: 1.5rem; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 0.3rem; }
.big-number { font-size: 2.5rem; font-weight: bold; color: #3498db; }
.section { background: white; border-radius: 12px; padding: 1.5rem; margin-top: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.goal-progress-row { display: flex; gap: 0.5rem; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid #f0f0f0; }
.badge { background: #e8f4fd; color: #2980b9; padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.8rem; }
</style>