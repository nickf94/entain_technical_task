<template>
  <div class="race-table-container">
    <table class="modern-table">
      <thead>
        <tr>
          <th>Meeting name</th>
          <th>Race number</th>
          <th>Countdown</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(raceTime, index) in races" :key="raceTime.raceId" class="race-row" :style="{ animationDelay: `${index * 50}ms` }">
          <td class="meeting-cell">
            <div class="cell-content">
              <v-icon size="20" class="mr-2" color="info">mdi-flag-checkered</v-icon>
              <span class="font-weight-600">{{ raceTime.meetingName }}</span>
            </div>
          </td>
          <td class="race-number-cell">
            <v-chip color="info" text-color="white" size="small" class="font-weight-bold">
              Race {{ raceTime.raceNumber }}
            </v-chip>
          </td>
          <td class="countdown-cell">
            <div class="countdown-badge">
              {{ formatTime(raceTime.startTime) }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
interface RaceTime {
  raceId: string
  startSeconds: number
  startTime: Date
  meetingName: string
  raceNumber: number
  category_id: string
}

withDefaults(defineProps<{
  races: RaceTime[]
}>(), {
  races: () => []
})

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-AU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}
</script>

<style scoped>
.race-table-container {
  padding: 24px;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.modern-table thead {
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%);
  color: #00d4ff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #00d4ff;
}

.modern-table th {
  padding: 16px 20px;
  text-align: left;
  border: none;
}

.race-row {
  border-bottom: 1px solid #333;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.race-row:hover {
  background-color: #262626;
  box-shadow: inset 0 0 0 1px rgba(0, 212, 255, 0.2);
}

.race-row:last-child {
  border-bottom: none;
}

.modern-table td {
  padding: 16px 20px;
  font-size: 15px;
  color: #e8e8e8;
}

.cell-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meeting-cell {
  font-weight: 500;
  color: #ffffff;
}

.race-number-cell {
  text-align: center;
}

.countdown-cell {
  text-align: right;
}

.countdown-badge {
  display: inline-block;
  background: linear-gradient(135deg, #00d4ff, #0099ff);
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.3px;
  box-shadow: 0 4px 12px rgba(0, 153, 255, 0.3);
}

@media (max-width: 768px) {
  .race-table-container {
    padding: 16px;
  }

  .modern-table {
    font-size: 13px;
  }

  .modern-table th,
  .modern-table td {
    padding: 12px;
  }
}
</style>
