import { defineStore } from 'pinia'
import { ref } from 'vue'
import client from '../api/client'
import type { Goal } from '../types/Goal'

export const useGoalStore = defineStore('goals', () => {
  const goals = ref<Goal[]>([])
  const publicGoals = ref<Goal[]>([])
  const loading = ref(false)

  const fetchGoals = async () => {
    loading.value = true
    try {
      const { data } = await client.get<Goal[]>('/goals')
      goals.value = data
    } finally {
      loading.value = false
    }
  }

  const fetchPublicGoals = async () => {
    const { data } = await client.get<Goal[]>('/goals/public')
    publicGoals.value = data
  }

  const createGoal = async (goalData: Partial<Goal>) => {
    const { data } = await client.post<Goal>('/goals', goalData)
    goals.value.unshift(data)
  }

  const updateGoal = async (id: string, goalData: Partial<Goal>) => {
    const { data } = await client.put<Goal>(`/goals/${id}`, goalData)

    const index = goals.value.findIndex(g => g._id === id)
    if (index !== -1) goals.value[index] = data
  }

  const deleteGoal = async (id: string) => {
    await client.delete(`/goals/${id}`)
    goals.value = goals.value.filter(g => g._id !== id)
  }

  return {
    goals,
    publicGoals,
    loading,
    fetchGoals,
    fetchPublicGoals,
    createGoal,
    updateGoal,
    deleteGoal
  }
})