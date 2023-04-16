import React from 'react';
import user_circleIcon from '@heroicons/react/24/outline';

export default function MainSection() {
  return(
    <div className='h-screen w-8/12'>
      <div>
        <h1 className='text-4xl font-bold ml-8 mt-3'>Dashboard</h1>
        <user_circleIcon className='h-10 w-10 ml-8 mt-3'></user_circleIcon>
        
        </div>
    </div>
  );
}