// backend/server.js
const express = require("express");
const cors = require('cors');
const path = require("path");
const db = require(path.resolve(__dirname, "firebase.js"));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); 
let exerciseStarted = false;

// Add your Express routes here

app.post('/api/startExercise', (req, res) => {
  exerciseStarted = true;
  res.json({ message: 'Exercise started' });
});

// Endpoint to stop the exercise
app.post('/api/stopExercise', async (req, res) => {
  exerciseStarted = false;

  // Extract the exercise data from the request body
  const exerciseData = req.body;

  // Save the exercise data to the database
  const userId = "userID_1";
  const exerciseId = "exerciseID_1";
  await db
    .collection("users")
    .doc(userId)
    .collection("exercises")
    .doc(exerciseId)
    .set(exerciseData);

  res.json({ message: 'Exercise stopped' });
});

// Endpoint for the Raspberry Pi to check if the exercise has started
app.get('/api/exerciseStatus', (req, res) => {
  res.json({ started: exerciseStarted });
});


app.post("/api/sensorData", async (req, res) => {
  // Handle sensor data from Raspberry Pi
  // Perform necessary calculations for speed, calories, etc.
  // Write the data to the Firebase database

  // Example: writing exercise data for a user

  const exerciseData = req.body;

  // Save the exercise data to the database

  const userId = "userID_1";
  const exerciseId = "exerciseID_1";
  await db
    .collection("users")
    .doc(userId)
    .collection("exercises")
    .doc(exerciseId)
    .set(exerciseData);

  res.sendStatus(200);
});

app.get("/api/exercises/:userId", async (req, res) => {
  const { userId } = req.params;
  const exercisesRef = db.collection("users").doc(userId).collection("exercises");
  const snapshot = await exercisesRef.get();

  const exercises = [];
  snapshot.forEach((doc) => {
    exercises.push({ id: doc.id, ...doc.data() });
  });

  res.json(exercises);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});