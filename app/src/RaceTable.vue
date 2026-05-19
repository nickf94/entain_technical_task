<template>
  <v-table style="background-color: #D4D4D4;">
    <thead>
      <tr>
        <th>
          Meeting name
        </th>
        <th>
          Race number
        </th>
        <th>
          Countdown
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="raceTime in races"
        :key="raceTime.raceId"
      >
        <td>
          {{ raceTime.meetingName }}
        </td>
        <td>
          {{ raceTime.raceNumber }}
        </td>
        <td>
          {{ raceTime.startTime.toLocaleString() }}
        </td>
      </tr>
    </tbody>
  </v-table>
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
</script>
