import React from 'react';
import { HomeIcon, UsersIcon, CalendarIcon, CogIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <div className="top-0 left-0 h-screen w-16 bg-white flex flex-col items-center pt-6">
      <div className="h-16 w-16 bg-white rounded mb-8">
        <img src="\assets\00004.png" alt="" className="h-full w-full rounded-full"></img>
      </div>
      <nav className='flex flex-col mt-10'>
        <Link to="/" className="mb-6">
          <HomeIcon className="h-6 w-6 mb-12 text-black hover:text-orange-600" />
        </Link>
        <Link to="/friends" className="mb-6">
          <UsersIcon className="h-6 w-6 mb-12 text-black hover:text-orange-600 " />
        </Link>
        <Link to="/calendar" className="mb-6">
          <CalendarIcon className="h-6 w-6 mb-12 text-black hover:text-orange-600" />
        </Link>
        <Link to="/settings" className="mb-6">
          <CogIcon className="h-6 w-6 mb-12 text-black hover:text-orange-600" />
        </Link>
      </nav>
    </div>
  );
};