import {React, useEffect, useState} from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline'; '@heroicons/react/24/outline';
import db from  '../firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';


async function startExercise() {
  try {
    const response = await fetch('http://localhost:5000/api/startExercise', { method: 'POST' });
    const data = await response.json();
    console.log(data.message);
  } catch (err) {
    console.error('Error starting exercise:', err);
  }
}

async function stopExercise(exerciseData) {
  try {
    const response = await fetch('http://localhost:5000/api/stopExercise', {
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

  // Replace this with the actual user ID and exercise ID
  const userId = "userID_1";
  const exerciseId = "exerciseID_1";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(collection(db, "users", userId, "exercises"), exerciseId),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setDuration(data.duration);
          setCaloriesBurnt(data.caloriesBurnt);
        }
      }
    );
  
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
        topSpeed: 10, // Replace with the actual value
        topHeartRate: 120, // Replace with the actual value
        distance: 500, // Replace with the actual value
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
      <div>
        <img src='src/assets/dsadasda.png' className='h-56 w-10/12 rounded-2xl mt-5 ml-8' ></img>
      </div>
      <div className='flex flex-row justify-evenly mt-20 mr-8'>
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
        <div className="flex flex-col justify-center text-center">
          <button
            onClick={handleStartStopExercise}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            {isExercising ? "Stop Exercise" : "Start Exercise"}
          </button>
        </div>
      </div>
    </div>
  );
}
