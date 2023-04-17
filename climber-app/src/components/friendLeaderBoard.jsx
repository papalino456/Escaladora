import React from 'react';

export default function friendLeaderBoard() {
    return (
      <div className="flex flex-col items-center justify-center h-full ml-auto bg-cover overflow-hidden bg-[url('src/assets/mesh.png')] bg" style={{width: "28%"}}>
        <div className="w-11/12 h-2/5 pt-0 rounded-lg mb-4 bg-opacity-30 bg-white backdrop-blur-xl shadow-lg border border-white-300">
            <div className='flex flex-row items-center text-center text-2xl font-bold text-black bg-opacity-10 bg-white backdrop-blur-xl p-2 rounded-t-lg'>
            <HeartIcon className="h-6 w-6 mr-2 mt-1 text-black hover:text-red-600"></HeartIcon>
            <h2 className="">Heart Rate</h2>
            </div>

        </div>
        <div className="w-11/12 h-2/5 p-0 rounded-lg bg-opacity-30 bg-white backdrop-blur-xl shadow-lg border border-white-300">
            <div className='flex flex-row items-center text-center text-2xl font-bold text-black bg-opacity-10 bg-white backdrop-blur-xl p-2 rounded-t-lg'>
            <BoltIcon className="h-6 w-6 mr-2 mt-1 text-black hover:text-blue-700"></BoltIcon>
            <h2 className="">Velocity</h2>
            </div>          

        </div>
      </div>
    );
  }