import React, { useEffect, useState } from 'react';
import axios from 'axios';
import searchIcon from '../assets/images/search.png'; 

const Streams = () => {
  const [streams, setStreams] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/movies'); 
        setStreams(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full font-poppins h-[690px] mt-1">
      {/* First Column: Takes 1/3 of the width */}
      <div className="w-full md:w-1/3 bg-white p-6 flex flex-col h-full">
        <div className='h-[120px]'>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl ml-16 font-bold">All Streams</h2>
            <img src={searchIcon} alt="Search" className="w-6 h-6 cursor-pointer" />
          </div>

          {/* Filter by Section */}
          <div className="flex flex-col mb-4">
            <div className="flex justify-start ml-16 items-center mt-2">
              <span className="font-bold">Filter by:</span>
              <button className="text-[#101820] ml-6 hover:border-[#101820] hover:border rounded-full hover:px-1 transition-all">
                Movies
              </button>
              <button className="text-[#101820] ml-8 hover:border-[#101820] hover:border rounded-full hover:px-1 transition-all">
                Series
              </button>
              <button className="text-[#101820] ml-8 hover:border-[#101820] hover:border rounded-full hover:px-1 transition-all">
                Live
              </button>
            </div>
          </div>
        </div>

        {/* New Div for Displaying Fetched Data with Scrolling */}
        <div className="flex-1 overflow-y-auto"> {/* Allow scrolling in this section */}
          <div className="flex flex-col ml-16 mt-2">
            {streams.map((stream, index) => (
              <div key={stream.id} className={`flex items-start mb-2 p-2 border-b border-[#808A92] ${index === 0 ? 'border-t border-[#808A92]' : ''}`}> {/* Single line separator and top border for the first movie */}
                <img
                  src={stream.image_url} 
                  alt={stream.title}
                  className="w-20 h-20 object-cover mr-4" 
                />
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{stream.title}</h3>
                  <div className="text-sm text-gray-600 flex">
                    <span className="mr-4">{stream.type}</span>
                    <span className="mr-4">{stream.duration}</span>
                    <span>{stream.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Column: Takes 2/3 of the width */}
      <div className="w-full md:w-2/3 bg-[#F3F5F8] p-6 h-full">
        <h2 className="text-2xl font-bold mb-4">Popular Streams</h2>
        {/* Additional content can go here */}
      </div>
    </div>
  );
};

export default Streams;
