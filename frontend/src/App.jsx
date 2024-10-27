import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeowner from './pages/Homeowner';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { PrivateRoute, PublicRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* Public routes - only for non-authenticated users */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                } 
              />
              
              {/* Private routes - only for authenticated users */}
              <Route 
                path="/homeowner" 
                element={
                  <PrivateRoute>
                    <Homeowner />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/taxes" 
                element={
                  <PrivateRoute>
                    <Homeowner />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/payments" 
                element={
                  <PrivateRoute>
                    <Homeowner />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
