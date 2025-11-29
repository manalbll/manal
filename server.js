const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Initialize data file if it doesn't exist
async function initDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify({ workouts: [], meals: [] }));
    }
}

// Read data
async function readData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { workouts: [], meals: [] };
    }
}

// Write data
async function writeData(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// API Routes

// Get all workouts
app.get('/api/workouts', async (req, res) => {
    try {
        const data = await readData();
        res.json(data.workouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});

// Get today's workouts
app.get('/api/workouts/today', async (req, res) => {
    try {
        const data = await readData();
        const today = new Date().toISOString().split('T')[0];
        const todayWorkouts = data.workouts.filter(w => w.date === today);
        res.json(todayWorkouts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});

// Add workout
app.post('/api/workouts', async (req, res) => {
    try {
        const data = await readData();
        const workout = {
            id: Date.now(),
            ...req.body,
            timestamp: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0]
        };
        data.workouts.push(workout);
        await writeData(data);
        res.status(201).json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add workout' });
    }
});

// Delete workout
app.delete('/api/workouts/:id', async (req, res) => {
    try {
        const data = await readData();
        const id = parseInt(req.params.id);
        data.workouts = data.workouts.filter(w => w.id !== id);
        await writeData(data);
        res.json({ message: 'Workout deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});

// Get all meals
app.get('/api/meals', async (req, res) => {
    try {
        const data = await readData();
        res.json(data.meals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
});

// Get today's meals
app.get('/api/meals/today', async (req, res) => {
    try {
        const data = await readData();
        const today = new Date().toISOString().split('T')[0];
        const todayMeals = data.meals.filter(m => m.date === today);
        res.json(todayMeals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
});

// Add meal
app.post('/api/meals', async (req, res) => {
    try {
        const data = await readData();
        const meal = {
            id: Date.now(),
            ...req.body,
            timestamp: new Date().toISOString(),
            date: new Date().toISOString().split('T')[0]
        };
        data.meals.push(meal);
        await writeData(data);
        res.status(201).json(meal);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add meal' });
    }
});

// Delete meal
app.delete('/api/meals/:id', async (req, res) => {
    try {
        const data = await readData();
        const id = parseInt(req.params.id);
        data.meals = data.meals.filter(m => m.id !== id);
        await writeData(data);
        res.json({ message: 'Meal deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete meal' });
    }
});

// Get dashboard stats
app.get('/api/stats/today', async (req, res) => {
    try {
        const data = await readData();
        const today = new Date().toISOString().split('T')[0];
        const todayWorkouts = data.workouts.filter(w => w.date === today);
        const todayMeals = data.meals.filter(m => m.date === today);

        const stats = {
            totalWorkouts: todayWorkouts.length,
            totalCaloriesBurned: todayWorkouts.reduce((sum, w) => sum + w.calories, 0),
            totalCaloriesConsumed: todayMeals.reduce((sum, m) => sum + m.calories, 0),
            totalProtein: todayMeals.reduce((sum, m) => sum + m.protein, 0),
            totalCarbs: todayMeals.reduce((sum, m) => sum + m.carbs, 0),
            totalFats: todayMeals.reduce((sum, m) => sum + m.fats, 0)
        };

        stats.netCalories = stats.totalCaloriesConsumed - stats.totalCaloriesBurned;

        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Serve the frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
async function startServer() {
    await initDataFile();
    app.listen(PORT, () => {
        console.log(`FitTrack server running on http://localhost:${PORT}`);
    });
}

startServer();
