<template>
  <div class="goal-card">
    <div class="goal-header">
      <span class="category-badge">{{ goal.category }}</span>
      <span class="tracking-badge">{{ goal.trackingType }}</span>
    </div>
    <h3>{{ goal.title }}</h3>
    <p>{{ goal.description }}</p>
    <p class="target-date">🗓 {{ formatDate(goal.targetDate) }}</p>
    <div class="actions">
      <router-link :to="`/goals/${goal._id}`" class="btn-detail">View</router-link>
      <button @click="$emit('edit', goal)" class="btn-edit">Edit</button>
      <button @click="$emit('delete', goal._id)" class="btn-delete">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Goal } from '../../types/Goal'

defineProps<{ goal: Goal }>()
defineEmits<{ edit: [goal: Goal]; delete: [id: string] }>()

const formatDate = (date: string) => new Date(date).toLocaleDateString()
</script>

<style scoped>
.goal-card { background: white; border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.goal-header { display: flex; gap: 0.5rem; margin-bottom: 0.5rem; }
.category-badge, .tracking-badge { font-size: 0.75rem; padding: 0.2rem 0.6rem; border-radius: 20px; background: #e8f4fd; color: #2980b9; }
h3 { margin: 0.5rem 0; }
.target-date { color: #666; font-size: 0.9rem; }
.actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
.btn-detail, .btn-edit { padding: 0.4rem 1rem; border-radius: 6px; cursor: pointer; border: none; }
.btn-detail { background: #3498db; color: white; text-decoration: none; }
.btn-edit { background: #f39c12; color: white; }
.btn-delete { background: #e74c3c; color: white; border: none; padding: 0.4rem 1rem; border-radius: 6px; cursor: pointer; }
</style>