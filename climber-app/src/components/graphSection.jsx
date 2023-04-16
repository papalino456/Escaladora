import React from 'react';
import Graph from './graph';
import { HeartIcon, BoltIcon } from '@heroicons/react/24/outline';

// Dummy data for demonstration purposes
const heartRateData = [
    { name: '1', value: 95 },
    { name: '2', value: 82 },
    { name: '3', value: 150 },
    { name: '4', value: 90 },
  ];
  
  const speedData = [
    { name: '1', value: 20 },
    { name: '2', value: 25 },
    { name: '3', value: 23 },
    { name: '4', value: 22 },
  ];
  
  export default function GraphSection() {
    return (
      <div className="flex flex-col items-center justify-center h-full ml-auto bg-cover overflow-hidden bg-[url('src/assets/mesh.png')] bg" style={{width: "28%"}}>
        <div className="w-11/12 h-2/5 pt-0 rounded-lg mb-4 bg-opacity-30 bg-white backdrop-blur-xl shadow-lg border border-white-300">
            <div className='flex flex-row items-center text-center text-2xl font-bold text-black bg-opacity-10 bg-white backdrop-blur-xl p-2 rounded-t-lg'>
            <HeartIcon className="h-6 w-6 mr-2 mt-1 text-black hover:text-red-600"></HeartIcon>
            <h2 className="">Heart Rate</h2>
            </div>
          <Graph
            data={heartRateData}
            dataKey="value"
            stroke="#FF0000"
            stroke2="#FF6400"
            areaColor="heartRateGradient"
          />
        </div>
        <div className="w-11/12 h-2/5 p-0 rounded-lg bg-opacity-30 bg-white backdrop-blur-xl shadow-lg border border-white-300">
            <div className='flex flex-row items-center text-center text-2xl font-bold text-black bg-opacity-10 bg-white backdrop-blur-xl p-2 rounded-t-lg'>
            <BoltIcon className="h-6 w-6 mr-2 mt-1 text-black hover:text-blue-700"></BoltIcon>
            <h2 className="">Velocity</h2>
            </div>          
          <Graph
            data={speedData}
            dataKey="value"
            stroke="#7000FF"
            stroke2="#00AEFF"
            areaColor="speedGradient"
          />
        </div>
      </div>
    );
  }