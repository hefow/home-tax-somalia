import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeowner from './pages/Homeowner'; // Import the Homeowner component
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/homeowner" element={<Homeowner />} /> {/* Add the Homeowner route */}
              {/* Add more routes as needed */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;