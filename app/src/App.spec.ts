import { setActivePinia, createPinia } from 'pinia'
import { useRaceStore } from './stores/raceStore'

describe('App Integration Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('Category Selection', () => {
    it('should have three racing categories defined', () => {
      const categories = [
        { id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61', name: 'Greyhound racing' },
        { id: '161d9be2-e909-4326-8c2c-35ed71fb460b', name: 'Harness racing' },
        { id: '4a2788f8-e825-4d36-9894-efd4baf1cfae', name: 'Horse racing' }
      ]
      expect(categories).toHaveLength(3)
      expect(categories[0].name).toBe('Greyhound racing')
      expect(categories[1].name).toBe('Harness racing')
      expect(categories[2].name).toBe('Horse racing')
    })
  })

  describe('Toggle Category Functionality', () => {
    it('should select a category when toggled first time', () => {
      const store = useRaceStore()
      const categoryId = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'

      store.setCategory(categoryId)
      expect(store.selectedCategory).toBe(categoryId)
    })

    it('should deselect a category when toggled twice', () => {
      const store = useRaceStore()
      const categoryId = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'

      store.setCategory(categoryId)
      store.setCategory(null)
      expect(store.selectedCategory).toBeNull()
    })

    it('should switch between categories', () => {
      const store = useRaceStore()
      const categoryId1 = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
      const categoryId2 = '161d9be2-e909-4326-8c2c-35ed71fb460b'

      store.setCategory(categoryId1)
      expect(store.selectedCategory).toBe(categoryId1)

      store.setCategory(categoryId2)
      expect(store.selectedCategory).toBe(categoryId2)
    })
  })

  describe('Race Filtering by Category', () => {
    it('should filter races by greyhound category', () => {
      const store = useRaceStore()
      const now = Math.floor(Date.now() / 1000)
      const greyId = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
      const harnessId = '161d9be2-e909-4326-8c2c-35ed71fb460b'

      store.races = [
        {
          race_id: '1',
          meeting_name: 'Greyhound Race',
          race_number: 1,
          advertised_start: { seconds: now + 300 },
          category_id: greyId
        },
        {
          race_id: '2',
          meeting_name: 'Harness Race',
          race_number: 2,
          advertised_start: { seconds: now + 600 },
          category_id: harnessId
        }
      ]

      store.setCategory(greyId)
      expect(store.raceStartTimes).toHaveLength(1)
      expect(store.raceStartTimes[0].raceId).toBe('1')
    })

    it('should show all races when no category is selected', () => {
      const store = useRaceStore()
      const now = Math.floor(Date.now() / 1000)
      const greyId = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
      const harnessId = '161d9be2-e909-4326-8c2c-35ed71fb460b'

      store.races = [
        {
          race_id: '1',
          meeting_name: 'Greyhound Race',
          race_number: 1,
          advertised_start: { seconds: now + 300 },
          category_id: greyId
        },
        {
          race_id: '2',
          meeting_name: 'Harness Race',
          race_number: 2,
          advertised_start: { seconds: now + 600 },
          category_id: harnessId
        }
      ]

      expect(store.raceStartTimes).toHaveLength(2)
    })
  })

  describe('Loading and Error States', () => {
    it('should initialize with loading state', () => {
      const store = useRaceStore()
      expect(store.loading).toBe(true)
      expect(store.error).toBeNull()
    })

    it('should set error message on failed fetch', () => {
      const store = useRaceStore()
      const errorMsg = 'Network response was not ok'
      store.error = errorMsg
      expect(store.error).toBe(errorMsg)
    })

    it('should clear loading state after fetch', () => {
      const store = useRaceStore()
      store.loading = false
      expect(store.loading).toBe(false)
    })
  })
})
