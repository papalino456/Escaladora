import {React, useEffect, useState} from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline'; '@heroicons/react/24/outline';
import db from  '../firebase';
import { collection, doc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

async function startExercise() {
  try {
    const response = await fetch('api/startExercise', { method: 'POST' });
    const data = await response.json();
    console.log(data.message);
  } catch (err) {
    console.error('Error starting exercise:', err);
  }
}

async function stopExercise(exerciseData) {
  try {
    const response = await fetch('/api/stopExercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseData),
    });
    const data = await response.json();
    console.log(data.message);
  } catch (err) {
    console.error('Error stopping exercise:', err);
  }
}

export default function MainSection() {
  const [isExercising, setIsExercising] = useState(false);
  const [duration, setDuration] = useState(0);
  const [caloriesBurnt, setCaloriesBurnt] = useState(0);
  const [topSpeed, setTopSpeed] = useState(0);
  const [topHeartRate, setTopHeartRate] = useState(0);
  const [heartRate, setHeartRate] = useState([]);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(0);

  // Replace this with the actual user ID and exercise ID
  const userId = "1";
  const [exerciseId, setExerciseId] = useState(null);

  useEffect(() => {
    const userExercisesRef = collection(db, "users", userId, "exercises");
    const q = query(userExercisesRef, orderBy("date", "desc"), limit(1));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setDuration(data.duration);
          setCaloriesBurnt(data.caloriesBurnt);
          setTopSpeed(data.topSpeed);
          setSpeed(data.speed);
          setTopHeartRate(data.topHeartRate);
          setHeartRate(data.heartRateList);
          setDistance(data.distance);
          setExerciseId(doc.id);
        }
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleStartStopExercise = async () => {
    if (isExercising) {
      // Calculate exercise data here, comes from db
        const exerciseData = {
        duration,
        caloriesBurnt,
        topSpeed,
        speed,
        topHeartRate,
        heartRate,
        distance,
        date: new Date(),
      };
  
      await stopExercise(exerciseData);
    } else {
      await startExercise();
    }
    setIsExercising(!isExercising);
  };

  return(
    <div className='h-screen w-8/12'>
      <div className='flex flex-row justify-between mt-8'>
        <h1 className='text-4xl font-bold mt-1 ml-8 font-VenusRising text-slate-900'>Dashboard</h1>
        <UserCircleIcon className='h-12 w-12 mr-4 text-slate-900 justify-items-center'/>
      </div>
      <div className="flex flex-col justify-center items-center mx-auto ">
        <img src='src/assets/dsadasda.png' className='h-56 w-10/12 rounded-2xl mt-5' ></img>
      </div>
      <div className='flex flex-row justify-evenly mt-12 '>
        <div className='flex flex-col justify-center text-center'>
          <h1 className='text-xl font-bold mt-1 font-VenusRising text-slate-900'>Time</h1>
          <h1 className='text-4xl font-bold mt-1 font-VenusRising text-slate-900'>{duration}</h1>
        </div>
        <div className='flex flex-col justify-center text-center'>
          <h1 className='text-xl font-bold mt-1 font-VenusRising text-slate-900'>Calories</h1>
          <div className='flex flex-row justify-center text-center '>
            <h1 className='text-4xl font-bold mt-1 font-VenusRising text-slate-900 ml-4'>{caloriesBurnt}</h1>
            <h1 className='text-sm font-bold mt-1 font-VenusRising text-slate-900'>Kcal</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center text-center w-3/12 mx-auto mt-10">
          <button
            onClick={handleStartStopExercise}
            className={`text-white font-bold px-4 py-2 rounded-lg shadow-lg ${
              isExercising ? "bg-gradient-to-br from-red-500 to-rose-600" : "bg-gradient-to-br from-teal-400 to-blue-400 "
            }`}
          >
            {isExercising ? "Stop Exercise" : "Start Exercise"}
          </button>
        </div>
    </div>
  );
}
