<template>
  <v-app style="background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%); min-height: 100vh">
    <v-main>
      <v-container class="py-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 style="font-size: 48px; font-weight: 800; color: white; text-shadow: 0 2px 8px rgba(0,0,0,0.2); margin: 0">
            Next to go
          </h1>
          <div style="height: 4px; width: 80px; background: linear-gradient(90deg, #00d4ff, #0099ff); margin: 16px auto; border-radius: 2px; box-shadow: 0 0 20px rgba(0, 212, 255, 0.5)"></div>
        </div>

        <!-- Category Filters -->
        <div class="d-flex justify-center flex-wrap gap-3 mb-8">
          <v-btn
            v-for="category in categories"
            :key="category.id"
            :variant="raceStore.selectedCategory === category.id ? 'elevated' : 'outlined'"
            :color="raceStore.selectedCategory === category.id ? 'info' : 'white'"
            @click="toggleCategory(category.id)"
            class="category-btn"
            size="large"
            style="border-color: #ffffff; border-width: 2px"
          >
            <template v-if="raceStore.selectedCategory === category.id">
              ✓
            </template>
            {{ category.name }}
          </v-btn>
        </div>

        <!-- Content Card -->
        <v-card class="content-card" style="border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.8); background: #1a1a1a; border: 1px solid #333">
          <!-- Loading State -->
          <div v-if="raceStore.loading" class="d-flex align-center justify-center" style="height: 300px; background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5))">
            <div class="text-center">
              <v-progress-circular indeterminate color="info" size="64" class="mb-4"></v-progress-circular>
              <p style="color: #667eea; font-size: 18px; font-weight: 500">Fetching races...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="raceStore.error" class="pa-8" style="background: linear-gradient(135deg, rgba(255, 87, 87, 0.1), rgba(244, 67, 54, 0.05))">
            <div class="d-flex align-center">
              <v-icon size="48" color="error" class="mr-4">mdi-alert-circle</v-icon>
              <div>
                <h3 style="color: #d32f2f; font-weight: 600; margin: 0">Error loading races</h3>
                <p style="color: #c62828; margin: 4px 0 0 0">{{ raceStore.error }}</p>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="raceStore.raceStartTimes.length === 0" class="d-flex align-center justify-center" style="height: 300px; background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.5))">
            <div class="text-center">
              <v-icon size="80" color="info" style="opacity: 0.3" class="mb-4">mdi-calendar-clock</v-icon>
              <p style="color: #667eea; font-size: 18px; font-weight: 500">No races available</p>
              <p style="color: #999; font-size: 14px">Try selecting a different category</p>
            </div>
          </div>

          <!-- Race Table -->
          <RaceTable v-else :races="raceStore.raceStartTimes" />
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
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

<style scoped>
.category-btn {
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-width: 2px !important;
}

.category-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.content-card {
  background: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.gap-3 {
  gap: 12px;
}
</style>
