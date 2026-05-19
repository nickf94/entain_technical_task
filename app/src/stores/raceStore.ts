import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface AdvertisedStart {
  seconds: number
}

interface Race {
  race_id: string
  meeting_name: string
  race_number: number
  advertised_start: AdvertisedStart
  category_id: string
}

/**
 * Race store for managing next-to-go racing data from the NEDS API
 * Handles fetching, loading states, and error handling for race information
 */
export const useRaceStore = defineStore('race', () => {
  /** Array of racing events with next-to-go information */
  const races = ref<Race[]>([])

  /** Loading state indicating whether race data is being fetched */
  const loading = ref(true)

  /** Error message if the API call fails, null if no error */
  const error = ref<string | null>(null)

  /** Current time, updated every second for real-time filtering */
  const currentTime = ref(Date.now())

  /** Selected race category ID for filtering */
  const selectedCategory = ref<string | null>(null)

  /**
   * Fetches the next 5 races from the NEDS API
   * Updates loading state during fetch and error state on failure
   */
  const fetchRaces = async () => {
    try {
      const response = await fetch('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      if (!response.ok) throw new Error('Network response was not ok')
      const response_data = await response.json()
      const data = response_data.data
      races.value = data.next_to_go_ids.map((id: string) => data.race_summaries[id]).slice(0, 10)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  /** Computed property that shows the next 5 races sorted by time, excluding expired races and filtered by category */
  const raceStartTimes = computed(() => {
    const oneMinuteInMs = 60000
    const now = currentTime.value

    return races.value
      .map(race => ({
        raceId: race.race_id,
        startSeconds: race.advertised_start.seconds,
        startTime: new Date(race.advertised_start.seconds * 1000),
        meetingName: race.meeting_name,
        raceNumber: race.race_number,
        category_id: race.category_id
      }))
      .filter(raceTime => {
        const raceStartMs = raceTime.startSeconds * 1000
        const expiredAt = raceStartMs + oneMinuteInMs
        const notExpired = now < expiredAt
        const matchesCategory = selectedCategory.value === null || raceTime.category_id === selectedCategory.value
        return notExpired && matchesCategory
      })
      .sort((a, b) => a.startSeconds - b.startSeconds)
      .slice(0, 5)
  })

  /** Set the selected race category */
  const setCategory = (categoryId: string | null) => {
    selectedCategory.value = categoryId
  }

  /** Initialize currentTime updates when store is used */
  const initializeTimeUpdates = () => {
    setInterval(() => {
      currentTime.value = Date.now()
    }, 1000)
  }

  return {
    races,
    loading,
    error,
    raceStartTimes,
    selectedCategory,
    fetchRaces,
    initializeTimeUpdates,
    setCategory
  }
})
