<template>
  <div class="journal-page">
    <div class="page-header">
      <h1>📓 Journal</h1>
      <button @click="showForm = true" class="btn-primary">+ New Entry</button>
    </div>

    <div v-if="showForm" class="entry-form">
      <h3>{{ editingEntry ? 'Edit Entry' : 'New Entry' }}</h3>
      <input v-model="form.title" placeholder="Title" required />
      <textarea v-model="form.content" rows="5" placeholder="Write your thoughts..." required></textarea>
      <input v-model="form.imageUrl" placeholder="Image URL (optional)" />
      <div class="form-actions">
        <button @click="handleSubmit" class="btn-save">Save</button>
        <button @click="closeForm" class="btn-cancel">Cancel</button>
      </div>
    </div>

    <div class="entries-list">
      <div v-for="entry in journalStore.entries" :key="entry._id" class="entry-card">
        <div class="entry-header">
          <h3>{{ entry.title }}</h3>
          <span class="date">{{ new Date(entry.createdAt).toLocaleDateString() }}</span>
        </div>
        <img v-if="entry.imageUrl" :src="entry.imageUrl" class="entry-img" :alt="entry.title" />
        <p>{{ entry.content }}</p>
        <div class="entry-actions">
          <button @click="openEdit(entry)" class="btn-edit">Edit</button>
          <button @click="handleDelete(entry._id)" class="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useJournalStore } from '../stores/journalStore'
import type { JournalEntry } from '../stores/journalStore'

const journalStore = useJournalStore()
const showForm = ref(false)
const editingEntry = ref<JournalEntry | null>(null)

const form = reactive({ title: '', content: '', imageUrl: '' })

const openEdit = (entry: JournalEntry) => {
  editingEntry.value = entry
  form.title = entry.title
  form.content = entry.content
  form.imageUrl = entry.imageUrl || ''
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
  editingEntry.value = null
  form.title = ''
  form.content = ''
  form.imageUrl = ''
}

const handleSubmit = async () => {
  if (editingEntry.value) await journalStore.updateEntry(editingEntry.value._id, { ...form })
  else await journalStore.createEntry({ ...form })
  closeForm()
}

const handleDelete = async (id: string) => {
  if (confirm('Delete entry?')) await journalStore.deleteEntry(id)
}

onMounted(() => journalStore.fetchEntries())
</script>

<style scoped>
.journal-page { padding: 2rem; max-width: 900px; margin: 0 auto; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.entry-form { background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 0.8rem; }
.entry-form input, .entry-form textarea { padding: 0.6rem; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
.form-actions { display: flex; gap: 0.5rem; }
.entries-list { display: flex; flex-direction: column; gap: 1rem; }
.entry-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.entry-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.date { color: #999; font-size: 0.85rem; }
.entry-img { width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px; margin: 0.5rem 0; }
.entry-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
.btn-primary, .btn-save { background: #3498db; color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 6px; cursor: pointer; }
.btn-edit { background: #f39c12; color: white; border: none; padding: 0.4rem 1rem; border-radius: 6px; cursor: pointer; }
.btn-delete { background: #e74c3c; color: white; border: none; padding: 0.4rem 1rem; border-radius: 6px; cursor: pointer; }
.btn-cancel { background: #95a5a6; color: white; border: none; padding: 0.5rem 1.2rem; border-radius: 6px; cursor: pointer; }
</style>