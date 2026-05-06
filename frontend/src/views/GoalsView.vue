<template>
  <div class="goals-page">
    <div class="page-header">
      <h1>🎯 My Goals</h1>
      <button @click="showForm = true" class="btn-primary">+ New Goal</button>
    </div>
    <div class="filter-bar">
      <select v-model="filterCategory">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
    </div>
    <div v-if="goalStore.loading" class="loading">Loading...</div>
    <div v-else class="goals-grid">
      <GoalCard
        v-for="goal in filteredGoals"
        :key="goal._id"
        :goal="goal"
        @edit="openEdit"
        @delete="handleDelete"
      />
    </div>
    <GoalForm
      v-if="showForm"
      :editing-goal="editingGoal"
      @submit="handleSubmit"
      @close="closeForm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGoalStore } from '../stores/goalStore'
import type { Goal } from '../types/Goal'
import GoalCard from '../components/goals/GoalCard.vue'
import GoalForm from '../components/goals/GoalForm.vue'

const goalStore = useGoalStore()
const showForm = ref(false)
const editingGoal = ref<Goal | null>(null)
const filterCategory = ref('')
const categories = ['Health', 'Career', 'Finance', 'Education', 'Personal', 'Other']

const filteredGoals = computed(() =>
  filterCategory.value
    ? goalStore.goals.filter(g => g.category === filterCategory.value)
    : goalStore.goals
)

const openEdit = (goal: Goal) => {
  editingGoal.value = goal
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingGoal.value = null
}

const handleSubmit = async (data: Partial<Goal>) => {
  if (editingGoal.value) await goalStore.updateGoal(editingGoal.value._id, data)
  else await goalStore.createGoal(data)
  closeForm()
}

const handleDelete = async (id: string) => {
  if (confirm('Delete this goal?')) await goalStore.deleteGoal(id)
}

onMounted(() => goalStore.fetchGoals())
</script>

<style scoped>
.goals-page { padding: 2rem; max-width: 1200px; margin: 0 auto; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.filter-bar { margin-bottom: 1.5rem; }
.filter-bar select { padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #ddd; }
.goals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.btn-primary { background: #3498db; color: white; border: none; padding: 0.6rem 1.4rem; border-radius: 8px; cursor: pointer; font-size: 1rem; }
.loading { text-align: center; padding: 2rem; color: #666; }
</style>