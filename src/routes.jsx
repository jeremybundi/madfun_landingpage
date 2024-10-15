import { Routes, Route } from 'react-router-dom';
import Streams from './components/Streams'; // Your Streams component

// Define all your app routes here
const AppRoutes = () => {
  return (
    <Routes>
      {/* Define your app routes below */}
      <Route path="/streams" element={<Streams />} />  {/* Streams route */}
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
