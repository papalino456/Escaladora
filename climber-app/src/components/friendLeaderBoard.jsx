import {React, useEffect, useState} from 'react';
import { HeartIcon, BoltIcon } from '@heroicons/react/24/outline';


// Dummy data for demonstration purposes

//let ejerDat = ["Veronica", 207.14, 65.5, 0.5];


const FriendPos = ({Usuario,calorias,distancia,velocidad}) => {


  const [actual, setActual] = useState(calorias);
/*
  const Datalista = async (val)=>{

    if(val==0){
      setActual(cal);
    }
    else if (val==1) {
      setActual(dist);
    } else {
      setActual(vel);
    }
  };
*/
  return(
    <div className='grow'>
      <div className='grid grid-cols-8 grow h-14 justify-center bg-amber-100 rounded-md'>
        <button 
        onClick={()=> setActual(actual=>calorias)}
        className='bg-blue-200 h-10 mt-4 rounded-t-xl opacity-60'>
          <HeartIcon className="h-6 w-6 mt-1 text-black hover:text-red-600"></HeartIcon>

        </button>
        <button 
        onClick={()=> setActual(actual=>distancia)}
        className=' bg-blue-200 h-10 mt-4 rounded-t-xl opacity-60'>
        <BoltIcon className="h-6 w-6 mt-1 text-black hover:text-green-600"></BoltIcon>
          
        </button>
        <button 
        onClick={()=> setActual(actual=>velocidad)}
        className=' bg-blue-200 h-10 mt-4 rounded-t-xl opacity-60'>
        <HeartIcon className=" h-6 w-6 mt-1 text-black hover:text-blue-600"></HeartIcon>
          
        </button>
      </div>
      <div className='grid grid-cols-8 grid-rows-2 grow h-24 bg-amber-600 rounded-md bg-opacity-90'>
        <div className='row-start-1 row-span-2 min-h-24 max-w-12'><img src='src\assets\profile.jpg' className='object-cover mt-2 h-20 w-20 rounded-full ml-2 border-2 border-slate-700'></img></div>
        <div className='row-start-2 min-h-14 pt-5 font-VenusRising text-s'>{Usuario}:</div>
        <div className='row-start-2 col-start-4 pt-5 -ml-4 min-h-14'>{actual}</div>
    </div>  
    </div>
  );
  }
export default FriendPos;
