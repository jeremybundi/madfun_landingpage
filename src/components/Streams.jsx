import React, { useEffect, useState } from 'react';
import axios from 'axios';
import searchIcon from '../assets/images/search.png';
import videoImage from '../assets/images/video.jpg';
import { FaTimes } from 'react-icons/fa';

const Streams = () => {
  const [streams, setStreams] = useState([]);
  const [filteredStreams, setFilteredStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/movies');
        setStreams(response.data);
        setFilteredStreams(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Effect to filter streams based on selected filter and search term
  useEffect(() => {
    let newFilteredStreams = streams;

    // Filter by content type
    if (filter !== 'all') {
      newFilteredStreams = newFilteredStreams.filter(stream => stream.content_type === filter);
    }

    // Filter by search term
    if (searchTerm) {
      newFilteredStreams = newFilteredStreams.filter(stream =>
        stream.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStreams(newFilteredStreams);
  }, [filter, streams, searchTerm]);

  // Handle stream selection and open details column
  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
    setIsDetailsOpen(true); 
  };

  // Handle closing the details column
  const handleCloseDetails = () => {
    setIsDetailsOpen(false); 
    setSelectedStream(null); 
  };

  // Toggle search input visibility
  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchTerm(''); 
  };

  return (
    <div className="flex flex-col md:flex-row w-full font-poppins h-[690px] mt-1 relative">
      {/* First Column */}
      <div className="w-90% md:w-1/3 bg-white p-6 h-full">
        <div className="flex flex-col h-full">
          {/* Filter by Section */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold ml-16">All Streams</h2>
            <img
              src={searchIcon}
              alt="Search"
              className="w-6 h-6 cursor-pointer md:block"
              onClick={handleSearchIconClick} 
            />
          </div>

          {/* Search Input */}
          {isSearchVisible && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 md:ml-16 ml-2 rounded-lg p-2 w-[250px] md:w-[300px]"
              />
              <button onClick={() => setIsSearchVisible(false)} className="ml-2 text-2xl text-gray-700">
                <FaTimes />
              </button>
            </div>
          )}

          <div className="flex flex-col mb-4">
            <div className="flex justify-start ml-1 md:ml-16 items-center">
              <span className="font-bold">Filter by:</span>
              <button
                onClick={() => setFilter('movie')}
                className={`text-[#101820] ml-6 hover:border-[#101820] hover:border rounded-full hover:px-1 transition-all ${filter === 'movie' ? 'border' : ''}`}
              >
                Movies
              </button>
              <button
                onClick={() => setFilter('series')}
                className={`text-[#101820] ml-8 hover:border-[#101820] hover:border rounded-full hover:px-1 transition-all ${filter === 'series' ? 'border' : ''}`}
              >
                Series
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`text-[#101820] ml-8 hover:border-[#101820] hover:border rounded-full hover:px-1 transition-all ${filter === 'all' ? 'border' : ''}`}
              >
                All
              </button>
            </div>
          </div>

          {/* Stream List */}
          <div className="flex-1 ml-1 md:ml-16 overflow-y-auto">
            {filteredStreams.map((stream, index) => (
              <div
                key={stream.id}
                onClick={() => handleStreamSelect(stream)}
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
                    <span className='text-green-700'>Ksh. {stream.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Second Column: Movie details with close icon */}
      <div className={`w-full md:w-2/3 bg-[#F3F5F8] p-6 h-full flex flex-col items-center absolute top-0 left-0 md:static ${!isDetailsOpen ? 'hidden' : ''}`}>
        {/* Close button */}
        <button onClick={handleCloseDetails} className="self-end mb-4 md:hidden">
          <FaTimes className="text-2xl text-gray-700" />
        </button>

        {/* Video image placeholder */}
        <img
          src={videoImage}
          alt="Video Preview"
          width={860}
          height={660}
          className="object-cover mt-0"
        />

        {/* Movie details below the video image */}
        {selectedStream && (
          <div className="w-full md:w-[860px] mt-2">
            <div className="flex flex-col md:flex-row items-center md:items-start mt-4 p-4">
              {/* Display Movie Image */}
              <img
                src={selectedStream.image_url}
                alt="Selected Movie"
                width={80}
                height={80}
                className="object-cover rounded-lg mr-4 hidden md:block" 
              />

              {/* Movie Details and Play Button */}
              <div className="flex flex-col md:flex-row w-full items-start justify-between">
                <div className="flex flex-col">
                  <h3 className="text-3xl my-2 font-semibold">{selectedStream.title}</h3>
                  <div className="text-sm text-gray-600 flex">
                    <span className="mr-4">{selectedStream.year}</span>
                    <span className="mr-4">{selectedStream.type}</span>
                    <span className="mr-4">{selectedStream.duration}</span>
                    <span className="text-[#6FCF97]">Ksh. {selectedStream.amount}</span>
                  </div>
                </div>

                {/* Play Now Button for Large Screens */}
                <button className="hidden md:block bg-[#101820] text-white px-4 py-2 w-48 h-12 rounded-lg mt-4 md:mt-0 md:mr-12 ml-auto">
                  Play Now
                </button>
              </div>
            </div>

            {/* Movie Description */}
            <p className="mt-4">{selectedStream.details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Streams;
