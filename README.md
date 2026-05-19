# Next to Go Racing App

A Vue 3 + TypeScript application that displays next-to-go races from the NEDS API with real-time filtering and category selection.

## Features

- **Live Race Updates**: Displays the next 5 upcoming races sorted by start time
- **Auto-Expiring Races**: Races automatically disappear 1 minute after they start
- **Category Filtering**: Toggle between Greyhound racing, Harness racing, and Horse racing
- **Real-Time Countdown**: Updates every second to show current race times
- **Responsive UI**: Built with Vue 3 and Vuetify Material Design components

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Vuetify** - Material Design component library
- **Pinia** - State management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
cd app
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Testing

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

The project uses **Jest** for unit testing with **TypeScript** support. Test files are located next to the source code with `.spec.ts` extension.

## Project Structure

```
app/src/
├── components/
│   └── RaceTable.vue          # Reusable table component for displaying races
├── stores/
│   └── raceStore.ts           # Pinia store for race data and state management
├── App.vue                     # Main application component
├── main.ts                     # Application entry point
└── vite-env.d.ts             # Vite environment type definitions
```

## Usage

### Viewing Races

The app automatically fetches the next 5 races and displays them in a table with:
- Meeting name
- Race number
- Countdown (formatted start time)

### Filtering by Category

Click any of the three category buttons at the top:
- **Greyhound racing** - Australian greyhound racing events
- **Harness racing** - Harness racing events
- **Horse racing** - Horse racing events

Click the same button again to clear the filter and see all categories.

### Real-Time Updates

- Races are updated every second
- Races automatically disappear 1 minute after their advertised start time
- The list always shows up to 5 races sorted by start time

## API

The app fetches race data from the NEDS Racing API:
```
https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=10
```

## State Management

The app uses Pinia for state management with the following store:

### Race Store (`stores/raceStore.ts`)

**State:**
- `races` - Array of all fetched races
- `loading` - Loading state indicator
- `error` - Error message if API call fails
- `currentTime` - Current time (updates every second)
- `selectedCategory` - Currently selected race category

**Actions:**
- `fetchRaces()` - Fetch next races from API
- `initializeTimeUpdates()` - Start real-time clock updates
- `setCategory(categoryId)` - Set the selected category

**Computed Properties:**
- `raceStartTimes` - Filtered, sorted list of races (max 5, excluding expired ones)

## Components

### App.vue
Main application component that:
- Manages category selection
- Calls store actions
- Renders the race table

### RaceTable.vue
Reusable table component that displays race data:
- Accepts `races` as a prop
- Displays meeting name, race number, and countdown
- Can be reused in other parts of the app

## Testing

The project includes comprehensive unit tests for the Pinia store using Jest.

### Test Coverage

**Race Store Tests** (`src/stores/raceStore.spec.ts`):
- Initial state validation (4 tests)
- Category selection and filtering (2 tests)
- Race sorting by start time
- Expired race filtering (races older than 1 minute)
- Race limiting (max 5 races)
- Time update initialization
- API fetch function existence

**App Integration Tests** (`src/App.spec.ts`):
- Racing category definitions
- Category selection toggle functionality (3 tests)
- Race filtering by category (2 tests)
- Loading and error state handling (3 tests)

**Total: 23 passing tests**

### Running Tests

```bash
npm test              # Run all tests once
npm run test:watch    # Run tests in watch mode (great for development)
npm run test:coverage # Generate coverage report
```

All tests are configured with TypeScript support and use Pinia's test utilities for store testing.
