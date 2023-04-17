import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline'; '@heroicons/react/24/outline';

export default function MainSection() {
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
          <h1 className='text-4xl font-bold mt-1 font-VenusRising text-slate-900'>0:00</h1>
        </div>
        <div className='flex flex-col justify-center text-center'>
          <h1 className='text-xl font-bold mt-1 font-VenusRising text-slate-900'>Calories</h1>
          <div className='flex flex-row justify-center text-center '>
            <h1 className='text-4xl font-bold mt-1 font-VenusRising text-slate-900 ml-4'>0</h1>
            <h1 className='text-sm font-bold mt-1 font-VenusRising text-slate-900'>Kcal</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
