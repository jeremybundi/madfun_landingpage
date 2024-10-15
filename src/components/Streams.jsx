import React, { useEffect, useState } from 'react';
import axios from 'axios';
import searchIcon from '../assets/images/search.png';
import videoImage from '../assets/images/video.jpg'; // Import the video.jpg image

const Streams = () => {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null); // State for the selected movie

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

  // Handle stream selection
  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
  };

  return (
    <div className="flex flex-col md:flex-row w-full font-poppins h-[690px] mt-1">
      {/* First Column: Takes 1/3 of the width */}
      <div className="w-full md:w-1/3 bg-white p-6 flex flex-col h-full">
        <div className='h-[90px]'>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl ml-16 font-bold">All Streams</h2>
            <img src={searchIcon} alt="Search" className="w-6 h-6 cursor-pointer" />
          </div>

          {/* Filter by Section */}
          <div className="flex flex-col mb-1">
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
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col ml-16 mt-0">
            {streams.map((stream, index) => (
              <div 
                key={stream.id} 
                onClick={() => handleStreamSelect(stream)} // Make it clickable
                className={`flex items-start mb-2 mr-4 p-2 border-b border-[#cad8e4] cursor-pointer ${index === 0 ? 'border-t border-[#cad8e4]' : ''}`}
              >
                <img
                  src={stream.image_url} 
                  alt={stream.title}
                  className="w-20 h-20 object-cover rounded-lg mr-4" 
                />
                <div className="flex flex-col">
                  <h3 className="text-base my-2 font-semibold">{stream.title}</h3>
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
      <div className="w-full md:w-2/3 bg-[#F3F5F8] p-6 h-full flex flex-col items-center">
        {/* Display the imported video image */}
        <img 
          src={videoImage} 
          alt="Video Preview"
          width={838} 
          height={660} 
          className="object-cover mt-0"
        />
        
        {/* Display the selected movie details below the video image */}
        {selectedStream && (
            <div className= ' w-[838px] mt-2'>
          <div className="flex mt-4 p-4">
            <img 
              src={selectedStream.image_url} 
              alt="Selected Movie"
              width={80} 
              height={80} 
              className="object-cover rounded-lg mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-3xl my-2 font-semibold">{selectedStream.title}</h3>
              <div className="text-sm text-gray-600 flex">
                <span className="mr-4">{selectedStream.year}</span>
                <span className="mr-4">{selectedStream.type}</span>
                <span className="mr-4">{selectedStream.duration}</span>
                <span className='text-[#6FCF97]'>Ksh. {selectedStream.amount}</span>
              </div>
            </div>
            <button className="bg-[#101820] text-white px-4 py-2 w-48 h-12 rounded-lg  ml-auto">
              Play Now
            </button>
          </div>
          <p>{selectedStream.details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Streams;
