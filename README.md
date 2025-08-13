# Timeline App

Timeline Assessment

## ✨ Features

- **Interactive Timeline Grid**: Visual representation of events across dates using CSS Grid
- **Smart Lane Assignment**: Automatic lane optimization to minimize vertical space usage
- **Event Spanning**: Events visually span
- **Drag & Drop Support**: Built with @dnd-kit for smooth drag-and-drop interactions (WIP)
- **Editable Events**: Click to edit event names directly in the timeline
- **Responsive Design**: Built with Tailwind CSS for modern, responsive UI
- **Date Range Management**: Automatic date column generation based on event ranges
- **Color-coded Events**: Randomized color assignment for easy visual distinction

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit (WIP)
- **Date Handling**: Day.js
- **Linting**: ESLint

## 📁 Project Structure

```
timeline-app/
├── src/
│   ├── features/
│   │   └── timeline/
│   │       ├── components/         # Timeline UI components
│   │       │   ├── event-bar.tsx   # Individual event component
│   │       │   └── timeline-grid.tsx # Main timeline grid
│   │       ├── hooks/              # Custom hooks
│   │       │   └── use-events.ts   # Event management logic
│   │       ├── types/              # TypeScript definitions
│   │       │   └── index.ts        # Event type definitions
│   │       └── utils/              # Utility functions
│   │           └── index.ts        # Date and grid utilities
│   ├── shared/
│   │   └── ui/                     # Reusable UI components
│   │       ├── dragabble.tsx       # Draggable wrapper
│   │       └── droppable.tsx       # Droppable wrapper
│   ├── App.tsx                     # Main application component
│   ├── main.tsx                    # Application entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── package.json                    # Dependencies and scripts
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
└── eslint.config.js               # ESLint configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd timeline-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage

### Event Management

The timeline displays events with the following properties:

- **ID**: Unique identifier
- **Name**: Editable event title
- **Start Date**: Event start date (YYYY-MM-DD format)
- **End Date**: Event end date (YYYY-MM-DD format)

### Smart Lane Assignment

Events are intelligently organized into lanes for optimal space usage:

- Events that don't overlap in time share the same lane
- Only creates new lanes when events actually conflict
- Results in a more compact, readable timeline
- Lane assignment is calculated dynamically based on event chronology
- There is still a bug regarding the end date. The EventBar component is not occupying all dates from startDate to endDate. Only startDate. Didn't have time to fix that.

### Drag & Drop (WIP)

The application includes drag-and-drop functionality:

- This functionality is still in progress

## 🔧 Configuration

### Mock Data

The application currently uses mock data defined in `src/features/timeline/hooks/use-events.ts`. To connect to a real data source:

1. Replace the `mockEvents` array with your API calls
2. Update the `useEvents` hook to handle async data fetching
3. Add loading and error states as needed

### Date Formatting

Date handling is managed by Day.js:

- Display format: MM/DD/YYYY
- Storage format: YYYY-MM-DD
- Supports date range calculations and comparisons
- Extensible with Day.js plugins

## 🧩 Key Components

### TimelineGrid

The main timeline component that:

- Renders the date header row
- Creates CSS Grid layout with dynamic columns/rows
- Positions events to span across their date ranges
- Provides the drag-and-drop context
- Uses Tailwind for responsive design

### EventBar

Individual event components that:

- Display event information with color coding
- Handle inline name editing
- Provide drag-and-drop functionality
- Support various event colors for distinction

### useEvents Hook

Custom hook that manages:

- Event data state and updates
- Smart lane assignment algorithm
- Date column generation from event ranges
- Event name update operations

## 🎨 Design Decisions

### CSS Grid vs Flexbox

- **CSS Grid**: Chosen for precise 2D layout control
- **Event Spanning**: Allows events to span multiple columns naturally
- **Grid Positioning**: Uses Tailwind arbitrary values for dynamic positioning

### Lane Assignment Algorithm

- **Chronological Sorting**: Events sorted by start date
- **Conflict Detection**: Checks for date range overlaps
- **Space Optimization**: Reuses lanes when events don't conflict
- **Compact Layout**: Minimizes vertical space usage

### Styling Approach

- **Tailwind CSS**: Utility-first for rapid development
- **Arbitrary Values**: For dynamic grid positioning
- **Component Composition**: Reusable UI components

## 🔮 Future Enhancements

- **Improved Lane Logic**: Better conflict resolution for complex overlaps
- **Event Resizing**: Drag handles to modify event duration
- **Time Zones**: Multi-timezone support + hour + minutes + seconds
- **Zoom Levels**: Different time scales (days, weeks, months)
- **Export Functionality**: PDF, image, or data export
- **Event Types**: Categories and custom event types
- **Tests**: E2E tests / Unit tests and Integration tests

## 🐛 Troubleshooting

### Common Issues

1. **Events not displaying**: Check date format consistency in mock data
2. **Positioning issues**: Verify date column generation covers all event dates
3. **Styling issues**: Verify Tailwind CSS is properly configured
4. **TypeScript errors**: Check type definitions in `types/index.ts`

### Time spent

- ~4.5/5 hours to get here
