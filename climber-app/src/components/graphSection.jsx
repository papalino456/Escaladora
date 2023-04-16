import React from 'react';
import Graph from './graph';

// Dummy data for demonstration purposes
const heartRateData = [
    { name: '1', value: 80 },
    { name: '2', value: 82 },
    { name: '3', value: 85 },
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
      <div className="flex flex-col items-center justify-center h-full w-72 bg-gradient-to-br from-pink-500 to-yellow-500 ">
        <div className="w-11/12 h-2/5 p-4 rounded-lg mb-4 bg-opacity-60 bg-white backdrop-blur-xl shadow-lg border border-white-300">
            <h1 className="text-2xl font-bold text-black">Heart Rate</h1>
          <Graph
            data={heartRateData}
            dataKey="value"
            stroke="#FF0000"
            stroke2="#FF6400"
            areaColor="heartRateGradient"
          />
        </div>
        <div className="w-11/12 h-2/5 p-4 rounded-lg bg-opacity-60 bg-white backdrop-blur-xl shadow-lg border border-white-300">
            <h1 className="text-2xl font-bold text-black">Speed</h1>
          <Graph
            data={speedData}
            dataKey="value"
            stroke="#0000FF"
            stroke2="#00AEFF"
            areaColor="speedGradient"
          />
        </div>
      </div>
    );
  }