import Navbar from './components/NavBar'; // Navbar remains here
import AppRoutes from './routes'; // Import your routes

function App() {
  return (
    <>
      <Navbar /> {/* Navbar is displayed on all pages */}
      <AppRoutes /> {/* Render the routes below the Navbar */}
    </>
  );
}

export default App;
