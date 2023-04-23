import React from 'react';
import FriendPos from './friendLeaderBoard'

let ejerDat = ["Veronica", 207.14, 65.5, 0.5];

const FriendsPage = () => {
  return (
    <div className='flex flex-auto flex-col w-8/12'>
      <div className='flex grow max-h-24 flex-initial items-center justify-between '>
        <div className='flex'> 
          <h1 className='text-4xl font-bold mt-1 ml-8 font-VenusRising text-slate-900'>Friends Page</h1> 
        </div>
        <div className="flex items-center justify-center " >
          <img src='src\assets\profile.jpg' className='object-cover h-20 w-20 rounded-full mx-8 border-2 border-slate-700'></img>
        </div>
      </div>
      <div className='flex flex-auto rounded-md m-8 mt-0 bg-green-300'>
      <FriendPos
      Usuario={ejerDat[0]}
      calorias={ejerDat[1]}
      distancia={ejerDat[2]}
      velocidad={ejerDat[3]}
      />
      </div>
    </div>
  );
};

export default FriendsPage;