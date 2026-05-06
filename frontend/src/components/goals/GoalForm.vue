<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal">
      <h2>{{ editingGoal ? 'Edit Goal' : 'New Goal' }}</h2>

      <form @submit.prevent="handleSubmit">
        <input v-model="form.title" placeholder="Goal title" required />

        <textarea
          v-model="form.description"
          placeholder="Description"
          rows="3"
        />

        <select v-model="form.category">
          <option
            v-for="cat in categories"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>

        <select v-model="form.trackingType">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <input v-model="form.targetDate" type="date" required />

        <label>
          <input v-model="form.isPublic" type="checkbox" />
          Make public
        </label>

        <div class="form-actions">
          <button type="submit" class="btn-save">
            {{ editingGoal ? 'Update' : 'Create' }}
          </button>

          <button type="button" class="btn-cancel" @click="emit('close')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Goal } from '../../types/Goal'

/* ---------------- Props ---------------- */
const props = defineProps<{
  editingGoal?: Goal | null
}>()

/* ---------------- Emits (STRONGLY TYPED) ---------------- */
const emit = defineEmits<{
  (e: 'submit', data: Partial<Goal>): void
  (e: 'close'): void
}>()

/* ---------------- Constants ---------------- */
const categories: Goal['category'][] = [
  'Health',
  'Career',
  'Finance',
  'Education',
  'Personal',
  'Other'
]

/* ---------------- Form type ---------------- */
type GoalForm = {
  title: string
  description: string
  category: Goal['category']
  trackingType: Goal['trackingType']
  targetDate: string
  isPublic: boolean
}

/* ---------------- Reactive form ---------------- */
const form = reactive<GoalForm>({
  title: '',
  description: '',
  category: 'Personal',
  trackingType: 'daily',
  targetDate: '',
  isPublic: false,
})

/* ---------------- Edit mode ---------------- */
watch(
  () => props.editingGoal,
  (goal) => {
    if (!goal) return

    form.title = goal.title
    form.description = goal.description
    form.category = goal.category
    form.trackingType = goal.trackingType
    form.targetDate = new Date(goal.targetDate)
      .toISOString()
      .split('T')[0]
    form.isPublic = goal.isPublic
  },
  { immediate: true }
)

/* ---------------- Submit ---------------- */
const handleSubmit = () => {
  emit('submit', { ...form })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 480px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

input,
textarea,
select {
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-save {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
}

.btn-cancel {
  background: #95a5a6;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
}
</style>