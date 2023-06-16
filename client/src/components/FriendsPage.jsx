import React, { useEffect, useState} from 'react';
import FriendPos from './friendLeaderBoard'
import db from  '../firebase';
import { collection, doc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';


const userId = "1";

const FriendsPage = () => {

  const [data, setData] = useState(null);

  useEffect(() => {
    if (data === null) {
      const userExercisesRef = collection(db, "users", userId, "exercises");
      const q = query(userExercisesRef, orderBy("date", "desc"), limit(5));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            setData(doc.data());
            console.log(data);
          }
        });
      });
      return () => {
        unsubscribe();
      };
    }
  }, [data]);

  return (
    <div className='flex flex-auto flex-col w-8/12'>
      <div className='flex grow max-h-24 flex-initial items-center justify-between '>
        <div className='flex mt-3'> 
          <h1 className='text-4xl font-bold mt-1 ml-8 font-VenusRising text-slate-900'>ajjaja xd</h1> 
        </div>
        <div className="flex items-center justify-center " >
          <img src='\assets\profile.jpg' className='object-cover h-16 w-16 rounded-full mx-8 border-2 border-slate-700'></img>
        </div>
      </div>
      <div className='flex flex-auto rounded-md m-8 mt-0 '>
      {data ? (
        <FriendPos
          Usuario={data.userID}
          calorias={data.caloriesBurnt}
          distancia={data.distance}
          velocidad={data.speed}
        />
      ) : (
        <p></p>
      )}
      </div>
    </div>
  );
};

export default FriendsPage;