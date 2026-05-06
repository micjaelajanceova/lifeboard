<template>
  <div class="calendar-page">
    <h1>📅 Calendar</h1>

    <div class="calendar-header">
      <button @click="prevMonth">‹</button>
      <h2>{{ monthName }} {{ year }}</h2>
      <button @click="nextMonth">›</button>
    </div>

    <div class="calendar-grid">
      <div class="day-label" v-for="d in dayNames" :key="d">
        {{ d }}
      </div>

      <div
        v-for="day in calendarDays"
        :key="day.date"
        class="day-cell"
        :class="{ today: day.isToday, empty: !day.day }"
      >
        <span class="day-number">{{ day.day }}</span>

        <div class="goal-dots">
          <span
            v-for="goal in getGoalsForDay(day)"
            :key="goal._id"
            class="dot"
            :title="goal.title"
          >
            ●
          </span>
        </div>
      </div>
    </div>

    <section class="upcoming">
      <h2>Upcoming Deadlines</h2>

      <div
        v-for="goal in upcomingGoals"
        :key="goal._id"
        class="upcoming-item"
      >
        <span>{{ goal.title }}</span>
        <span class="date">
          {{ new Date(goal.targetDate).toLocaleDateString() }}
        </span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGoalStore } from '../stores/goalStore'
import type { Goal } from '../types/Goal'

const goalStore = useGoalStore()

const today = new Date()
const currentMonth = ref<number>(today.getMonth())
const currentYear = ref<number>(today.getFullYear())

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const year = computed(() => currentYear.value)

const monthName = computed(() =>
  new Date(currentYear.value, currentMonth.value).toLocaleString('default', {
    month: 'long',
  })
)

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const daysInMonth = new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate()

  const days: {
    day: number | null
    date: string
    isToday: boolean
  }[] = []

  for (let i = 0; i < firstDay; i++) {
    days.push({
      day: null,
      date: `empty-${i}`,
      isToday: false,
    })
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(currentYear.value, currentMonth.value, d)

    days.push({
      day: d,
      date: date.toISOString().split('T')[0],
      isToday: date.toDateString() === today.toDateString(),
    })
  }

  return days
})

const getGoalsForDay = (day: { day: number | null; date: string }) => {
  if (!day.day) return []

  return goalStore.goals.filter((g: Goal) => {
    const target = new Date(g.targetDate).toISOString().split('T')[0]
    return target === day.date
  })
}

const upcomingGoals = computed<Goal[]>(() =>
  goalStore.goals
    .filter((g: Goal) => new Date(g.targetDate) > today)
    .sort(
      (a: Goal, b: Goal) =>
        new Date(a.targetDate).getTime() -
        new Date(b.targetDate).getTime()
    )
    .slice(0, 5)
)

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

onMounted(() => {
  goalStore.fetchGoals()
})
</script>

<style scoped>
.calendar-page {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.calendar-header button {
  background: none;
  border: 1px solid #ddd;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.day-label {
  text-align: center;
  font-weight: bold;
  color: #999;
  font-size: 0.85rem;
  padding: 0.4rem;
}

.day-cell {
  min-height: 64px;
  padding: 0.4rem;
  border-radius: 6px;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}

.day-cell.today {
  background: #e8f4fd;
  border-color: #3498db;
}

.day-cell.empty {
  background: transparent;
  border-color: transparent;
}

.day-number {
  font-size: 0.85rem;
  color: #333;
}

.goal-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 4px;
}

.dot {
  color: #3498db;
  font-size: 0.6rem;
}

.upcoming {
  margin-top: 2rem;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.upcoming-item {
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.date {
  color: #999;
  font-size: 0.9rem;
}
</style>