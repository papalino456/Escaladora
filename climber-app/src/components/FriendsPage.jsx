import React from 'react';

const FriendsPage = () => {
  return (
    <div className='flex flex-auto items-center justify-center bg-red-300'>
      <div className='flex bg-slate-500'> 
        <h1>Friends Page</h1> 
      </div>
      <div class="flex items-center justify-center bg-purple-300" >
        <img src='src\assets\profile.jpg' className='object-cover h-20 w-20 rounded-full ms-8'></img>
      </div>
    </div>
  );
};

export default FriendsPage;