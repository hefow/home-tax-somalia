import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeowner from './pages/Homeowner';
import Footer from './components/common/Footer';
import { PrivateRoute, PublicRoute } from './components/auth/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Toaster 
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: 'green',
                  color: 'white',
                },
              },
              error: {
                style: {
                  background: 'red',
                  color: 'white',
                },
              },
              duration: 3000,
            }}
          />
          <main className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Homeowner />} />
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
              
              {/* Private routes */}
              <Route 
                path="/homeowner" 
                element={
                  <PrivateRoute>
                    <Homeowner />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <PrivateRoute>
                    <AdminDashboard />
                  </PrivateRoute>
                } 
              />

              {/* Redirect all other routes to homeowner */}
              <Route path="*" element={<Navigate to="/homeowner" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
