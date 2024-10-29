import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeowner from './pages/Homeowner';
import Footer from './components/common/Footer';
import { PrivateRoute, PublicRoute } from './components/auth/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './contexts/AuthContext';

// Create a new component for the dashboard route
function DashboardRoute() {
  const { user } = useAuth();
  
  // Redirect based on user role
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <Homeowner />;
}

// Create a new component for the root route
function RootRoute() {
  const { user } = useAuth();
  
  if (user) {
    // Redirect based on user role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }
  
  // If user is not logged in, show home page
  return <HomePage />;
}

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
              {/* Root route with conditional rendering */}
              <Route path="/" element={<RootRoute />} />
              
              {/* Public routes */}
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
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <DashboardRoute />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <PrivateRoute adminOnly>
                    <AdminDashboard />
                  </PrivateRoute>
                } 
              />

              {/* Redirect all other routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
