import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/images/logo.jpg'; 
import movie from '../assets/images/movie.png'; 
import eventsImage from '../assets/images/events.png'; 
import travelImage from '../assets/images/travel.png'; 
import marketImage from '../assets/images/market.png'; 
import createEventImage from '../assets/images/plus.png'; 
import userImage from '../assets/images/user.png'; 

import '../App.css'; 

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-20 flex justify-between items-center bg-white px-4 font-poppins shadow-lg shadow-gray-300">
      {/* Logo */}
      <div className="ml-6 md:ml-6">
        <img src={logo} alt="Logo" className="h-10 md:h-14" />
      </div>

      {/* Center Items for Small Screens */}
      <div className="flex-grow flex md:hidden justify-center items-center gap-6">
        <div className="flex items-center">
          <a href="#streams" className="text-black font-semibold text-sm hover:text-gray-600">Streams</a>
        </div>
        <div className="flex items-center">
          <a href="#events" className="text-black font-semibold text-sm hover:text-gray-600">Events</a>
        </div>
        <div className="flex items-center">
          <a href="#travel" className="text-black font-semibold text-sm hover:text-gray-600">Travel</a>
        </div>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden flex items-center relative" ref={menuRef}>
        <button className="focus:outline-none" onClick={toggleMenu}>
          <div className="flex flex-col items-center">
            <div className="h-0.5 w-6 bg-black mb-1"></div>
            <div className="h-0.5 w-6 bg-black mb-1"></div>
            <div className="h-0.5 w-6 bg-black"></div>
          </div>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 bg-white font-semibold shadow-lg rounded-lg mt-20 z-10">
            <a href="#marketplace" className="block px-4 py-2 text-sm hover:bg-gray-100">Marketplace</a>
            <a href="#create-event" className="block px-4 py-2 text-sm hover:bg-gray-100">Create event</a>
          </div>
        )}
      </div>

      {/* User Image with Dropdown for Small Screens */}
      <div className="md:hidden flex items-center relative" ref={dropdownRef}>
        <img src={userImage} alt="User" className="h-5 w-5 ml-2 cursor-pointer" onClick={toggleDropdown} />
        {isDropdownOpen && (
          <div className="absolute right-0 bg-white font-semibold shadow-lg rounded-lg mt-20 z-10">
            <a href="#signup" className="block px-4 py-2 text-sm hover:bg-gray-100">Sign up</a>
            <a href="#login" className="block px-4 py-2 text-sm hover:bg-gray-100">Login</a>
          </div>
        )}
      </div>

      {/* Center Items for Larger Screens */}
      <div className="hidden md:flex ml-12 md:ml-36 gap-6 items-center">
        <div className="flex items-center bg-[#101820] text-white px-1 py-2 h-7 w-26 rounded-lg">
          <img src={movie} alt="Movie" className="h-5 w-6 mr-1" />
          <a href="#streams" className="hover:text-gray-300 text-sm mr-1">Streams</a>
        </div>
        <div className="flex items-center">
          <img src={eventsImage} alt="Events" className="h-4 w-5 mr-1" />
          <a href="#events" className="text-black text-sm hover:text-gray-600">Events</a>
        </div>
        <div className="flex items-center">
          <img src={travelImage} alt="Travel" className="h-4 w-5 mr-1" />
          <a href="#travel" className="text-black text-sm hover:text-gray-600">Travel</a>
          <span className="flex items-center bg-red-600 ml-1 h-4 text-white text-xs px-2 py-2 rounded-full">
            <a href="#new" className="hover:text-gray-300">New</a>
          </span>
        </div>
        <div className="flex items-center">
          <img src={marketImage} alt="Marketplace" className="h-4 w-5 mr-2" />
          <a href="#marketplace" className="text-black text-sm hover:text-gray-600">Marketplace</a>
        </div>
      </div>

      {/* Create Event to Login for Larger Screens */}
      <div className="hidden md:flex gap-2 ml-16 md:ml-64 items-center border border-[#101820] px-2 py-1 rounded-lg">
        <img src={createEventImage} alt="Create Event" className="h-5 w-5 mr-0" />
        <a href="#create-event" className="text-black text-sm hover:text-gray-600">Create Event</a>
      </div>

      {/* Sign Up and Login for Larger Screens */}
      <div className="hidden md:flex gap-2 ml-4 px-2 py-1 rounded-lg items-center">
        <img src={userImage} alt="User" className="h-5 w-5 mr-1" />
        <a href="#signup" className="text-black text-sm hover:text-gray-600">Sign Up</a>
        <span className="ml-2 text-black">/</span>
        <a href="#login" className="text-black text-sm hover:text-gray-600">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
