import { setActivePinia, createPinia } from 'pinia'
import { useRaceStore } from './raceStore'

describe('Race Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Initial State', () => {
    it('should have empty races array', () => {
      const store = useRaceStore()
      expect(store.races).toEqual([])
    })

    it('should have loading set to true', () => {
      const store = useRaceStore()
      expect(store.loading).toBe(true)
    })

    it('should have null error', () => {
      const store = useRaceStore()
      expect(store.error).toBeNull()
    })

    it('should have null selectedCategory', () => {
      const store = useRaceStore()
      expect(store.selectedCategory).toBeNull()
    })
  })

  describe('setCategory', () => {
    it('should set selectedCategory', () => {
      const store = useRaceStore()
      const categoryId = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
      store.setCategory(categoryId)
      expect(store.selectedCategory).toBe(categoryId)
    })

    it('should clear selectedCategory when null is passed', () => {
      const store = useRaceStore()
      store.setCategory('9daef0d7-bf3c-4f50-921d-8e818c60fe61')
      store.setCategory(null)
      expect(store.selectedCategory).toBeNull()
    })
  })

  describe('raceStartTimes computed property', () => {
    it('should return empty array when no races', () => {
      const store = useRaceStore()
      expect(store.raceStartTimes).toEqual([])
    })

    it('should include category_id in mapped races', () => {
      const store = useRaceStore()
      const now = Math.floor(Date.now() / 1000)
      store.races = [
        {
          race_id: '1',
          meeting_name: 'Test Meeting',
          race_number: 1,
          advertised_start: { seconds: now + 300 },
          category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
        }
      ]
      expect(store.raceStartTimes).toHaveLength(1)
      expect(store.raceStartTimes[0].category_id).toBe('9daef0d7-bf3c-4f50-921d-8e818c60fe61')
    })

    it('should filter races by selected category', () => {
      const store = useRaceStore()
      const now = Math.floor(Date.now() / 1000)
      const categoryId1 = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
      const categoryId2 = '161d9be2-e909-4326-8c2c-35ed71fb460b'

      store.races = [
        {
          race_id: '1',
          meeting_name: 'Greyhound Race',
          race_number: 1,
          advertised_start: { seconds: now + 300 },
          category_id: categoryId1
        },
        {
          race_id: '2',
          meeting_name: 'Harness Race',
          race_number: 2,
          advertised_start: { seconds: now + 600 },
          category_id: categoryId2
        }
      ]

      store.setCategory(categoryId1)
      expect(store.raceStartTimes).toHaveLength(1)
      expect(store.raceStartTimes[0].raceId).toBe('1')
    })

    it('should exclude races more than 1 minute past start time', () => {
      const store = useRaceStore()
      const now = Math.floor(Date.now() / 1000)

      store.races = [
        {
          race_id: '1',
          meeting_name: 'Recent Race',
          race_number: 1,
          advertised_start: { seconds: now - 30 },
          category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
        },
        {
          race_id: '2',
          meeting_name: 'Expired Race',
          race_number: 2,
          advertised_start: { seconds: now - 120 },
          category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
        }
      ]

      expect(store.raceStartTimes).toHaveLength(1)
      expect(store.raceStartTimes[0].raceId).toBe('1')
    })

    it('should sort races by start time ascending', () => {
      const store = useRaceStore()
      const now = Math.floor(Date.now() / 1000)

      store.races = [
        {
          race_id: '1',
          meeting_name: 'Third Race',
          race_number: 1,
          advertised_start: { seconds: now + 900 },
          category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
        },
        {
          race_id: '2',
          meeting_name: 'First Race',
          race_number: 2,
          advertised_start: { seconds: now + 300 },
          category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
        },
        {
          race_id: '3',
          meeting_name: 'Second Race',
          race_number: 3,
          advertised_start: { seconds: now + 600 },
          category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
        }
      ]

      const times = store.raceStartTimes
      expect(times[0].raceId).toBe('2')
      expect(times[1].raceId).toBe('3')
      expect(times[2].raceId).toBe('1')
    })

    it('should limit results to 5 races', () => {
      const store = useRaceStore()
      const now = Math.floor(Date.now() / 1000)

      store.races = Array.from({ length: 10 }, (_, i) => ({
        race_id: String(i),
        meeting_name: `Race ${i}`,
        race_number: i,
        advertised_start: { seconds: now + 300 + i * 100 },
        category_id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
      }))

      expect(store.raceStartTimes).toHaveLength(5)
    })
  })

  describe('initializeTimeUpdates', () => {
    it('should exist as a function', () => {
      const store = useRaceStore()
      expect(typeof store.initializeTimeUpdates).toBe('function')
    })
  })

  describe('fetchRaces', () => {
    it('should exist as a function', () => {
      const store = useRaceStore()
      expect(typeof store.fetchRaces).toBe('function')
    })
  })
})
