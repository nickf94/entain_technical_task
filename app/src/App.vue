<template>
  <v-app>
    <v-main>
      <v-container>
        <div style="display: flex; justify-content: center; align-items: center; font-size: 28px; margin-bottom: 16px">Next to go</div>
        <div style="margin-bottom: 16px"></div>

        <div style="margin-bottom: 16px">
          <v-btn
            v-for="category in categories"
            :key="category.id"
            :color="raceStore.selectedCategory === category.id ? 'primary' : 'grey-lighten-2'"
            @click="toggleCategory(category.id)"
            style="margin-right: 8px"
          >
            {{ category.name }}
          </v-btn>
        </div>

        <div v-if="raceStore.loading">Loading...</div>
        <div v-else-if="raceStore.error">Error: {{ raceStore.error }}</div>
        <div v-else-if="raceStore.raceStartTimes.length === 0">No races available</div>
        <RaceTable v-else :races="raceStore.raceStartTimes" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NextRaces from './NextRaces.vue'
import RaceTable from './RaceTable.vue'
import { onMounted } from 'vue'
import { useRaceStore } from './stores/raceStore'

const raceStore = useRaceStore()

const categories = [
  { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', name: 'Greyhound racing' },
  { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', name: 'Harness racing' },
  { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', name: 'Horse racing' }
]

const toggleCategory = (categoryId: string) => {
  if (raceStore.selectedCategory === categoryId) {
    raceStore.setCategory(null)
  } else {
    raceStore.setCategory(categoryId)
  }
}

onMounted(() => {
  raceStore.fetchRaces()
  raceStore.initializeTimeUpdates()
})

</script>
