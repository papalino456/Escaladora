import {React, useEffect, useState, componentDidMount} from 'react';
import { HeartIcon, BoltIcon } from '@heroicons/react/24/outline';


// Dummy data for demonstration purposes

//let ejerDat = ["Veronica", 207.14, 65.5, 0.5];


const FriendPos = ({Usuario,calorias,distancia,velocidad}) => {


  const [actual, setActual] = useState(calorias);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

  const getBackgroundImage = () => {
    switch (selectedButtonIndex) {
      case 0:
        return 'url("/assets/mesh-gradient.png")';
      case 1:
        return 'url("/assets/mesh-gradient-green.png")';
      case 2:
        return 'url("/assets/mesh-gradient-amigos.png")';
      default:
        return "";
    }
  };


  const bgStyle = {
    backgroundImage: getBackgroundImage(),
    backgroundSize: "cover",
  };

  return(
    <div className='grow '>
      <div className='grid grid-cols-3 grow h-14 justify-center rounded-md  '>
        <button 
          onClick={() => {
            setActual(calorias);
            setSelectedButtonIndex(0);
          }}
        className='bg-rosa-500 h-10 mt-4 rounded-t-xl border-r-2 border-b-0 border-white'>
          <HeartIcon className="h-6 w-6 mt-1 ml-2 text-black hover:text-red-600"></HeartIcon>

        </button>
        <button 
          onClick={() => {
            setActual(distancia);
            setSelectedButtonIndex(1);
          }}
        className=' bg-verdesito-500 h-10 mt-4 rounded-t-xl border-r-2 border-b-0 border-white'>
        <BoltIcon className="h-6 w-6 mt-1 ml-2 text-black hover:text-green-600"></BoltIcon>
          
        </button>
        <button 
          onClick={() => {
            setActual(velocidad);
            setSelectedButtonIndex(2);
          }}
        className=' bg-azulito-500 h-10 mt-4 rounded-t-xl border--2 border-b-0 border-white'>
        <HeartIcon className=" h-6 w-6 mt-1 ml-2 text-black hover:text-blue-600"></HeartIcon>
          
        </button>
      </div>
      <div
        className="h-96 p-4 pl-2 rounded-lg rounded-t-none "
        style={bgStyle}
        >      
        for
        <div className='grid grid-cols-8 grid-rows-3 grow h-16 rounded-md bg-opacity-30 bg-white backdrop-blur-xl shadow-lg border border-white-300 '>
          <div className='row-start-1 row-span-2 min-h-16 max-w-12'><img src='\assets\profile.jpg' className='object-cover mt-0.5 h-14 w-14 rounded-full ml-2 border-2 border-slate-700'></img></div>
          <h1 className='row-start-2 min-h-14 font-VenusRising text-s'>{Usuario}:</h1>
          <h1 className="row-start-2 -ml-4 min-h-14">{actual || "Loading..."}</h1>
          <h1 className='row-start-2 -ml-4 min-h-14'>{actual || "Loading..."}</h1>
        </div>
    </div>  
    </div>
  );
  }
export default FriendPos;
