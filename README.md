# FitTrack - Fitness & Nutrition Tracker

A mobile-optimized web application for tracking fitness activities and nutrition with a beautiful, responsive interface.

## Features

- **Dashboard**: Real-time statistics and progress tracking
- **Fitness Tracking**: Log workouts with exercise type, duration, and calories burned
- **Nutrition Tracking**: Track meals with detailed macronutrient information
- **Data Persistence**: All data stored on the server
- **Mobile-First Design**: Optimized for mobile devices with a beautiful gradient UI
- **RESTful API**: Backend API for managing workouts and meals

## Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla JavaScript
- **Storage**: JSON file-based storage
- **Styling**: Modern CSS with gradients and animations

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/today` - Get today's workouts
- `POST /api/workouts` - Add a new workout
- `DELETE /api/workouts/:id` - Delete a workout

### Meals
- `GET /api/meals` - Get all meals
- `GET /api/meals/today` - Get today's meals
- `POST /api/meals` - Add a new meal
- `DELETE /api/meals/:id` - Delete a meal

### Stats
- `GET /api/stats/today` - Get today's statistics (calories, macros, etc.)

## Data Storage

Data is stored in `data.json` in the following format:
```json
{
  "workouts": [],
  "meals": []
}
```

## Usage

1. Open `http://localhost:3000` in your browser
2. Navigate between Dashboard, Fitness, and Nutrition tabs
3. Log workouts and meals using the forms
4. View your progress on the dashboard
5. Track your macronutrient goals with progress bars

## Mobile Testing

To test on mobile devices:
1. Ensure your mobile device is on the same network
2. Find your computer's IP address
3. Access `http://YOUR_IP:3000` from your mobile browser

## License

MIT
