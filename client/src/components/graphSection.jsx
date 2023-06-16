import { React, useState, useEffect } from 'react';
import db from  '../firebase';
import { collection, doc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import Graph from './graph';
import { HeartIcon, BoltIcon } from '@heroicons/react/24/outline';

  
  export default function GraphSection() {
    const [heartRate, setHeartRate] = useState([]);
    const [speedList, setSpeedList] = useState([]);

    const userId = "1";
    const [exerciseId, setExerciseId] = useState(null);

    useEffect(() => {
      const userExercisesRef = collection(db, "users", userId, "exercises");
      const q = query(userExercisesRef, orderBy("date", "desc"), limit(1));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setExerciseId(doc.id);
            setHeartRate((prevHeartRate) => {
              const newHeartRate = prevHeartRate.concat(data.heartRateList);
              return newHeartRate.slice(-10);
            });
            setSpeedList((prevSpeedList) => {
              const newSpeedList = prevSpeedList.concat(data.speed);
              return newSpeedList.slice(-10);
            });
          }
        });
      });
    
      return () => {
        unsubscribe();
      };
    }, []);
    

    useEffect(() => {
      setHeartRate([]);
      setSpeedList([]);
    }, [exerciseId]);

    function formatData(dataArray) {
      return dataArray.map((value, index) => ({ value, index }));
    }

    return (
      <div className="flex flex-col items-center justify-center h-full ml-auto bg-cover overflow-hidden bg-[url('/assets/mesh.png')] bg" style={{width: "28%"}}>
        <div className="w-11/12 h-2/5 pt-0 rounded-lg mb-4 bg-opacity-30 bg-white backdrop-blur-xl shadow-lg border border-white-300">
            <div className='flex flex-row items-center justify-between text-center text-2xl font-bold text-black bg-opacity-10 bg-white backdrop-blur-xl p-2 rounded-t-lg'>
            <HeartIcon className="h-6 w-6 mr-2 mt-1 text-black hover:text-red-600"></HeartIcon>
            <h2 className="font-VenusRising text-xl">BPM</h2>
            <h2 className="font-VenusRising text-lg mr-3">{`${heartRate[5] ? heartRate[5] : 0}`}</h2>
            </div>
          <Graph
            data={formatData(heartRate)}
            dataKey="value"
            stroke="#FF0000"
            stroke2="#FF6400"
            areaColor="heartRateGradient"
          />
        </div>
        <div className="w-11/12 h-2/5 p-0 rounded-lg bg-opacity-30 bg-white backdrop-blur-xl shadow-lg border border-white-300">
            <div className='flex flex-row items-center justify-between text-center text-2xl font-bold text-black bg-opacity-10 bg-white backdrop-blur-xl p-2 rounded-t-lg'>
            <BoltIcon className="h-6 w-6 mr-2 mt-1 text-black hover:text-blue-700"></BoltIcon>
            <h2 className="font-VenusRising text-xl">Speed</h2>
            <h2 className="font-VenusRising text-lg mr-3">{`${speedList[5] ? speedList[5] : 0}`}</h2>
            </div>          
          <Graph
            data={formatData(speedList)}
            dataKey="value"
            stroke="#7000FF"
            stroke2="#00AEFF"
            areaColor="speedGradient"
          />
        </div>
      </div>
    );
  }