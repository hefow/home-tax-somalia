import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeowner from './pages/Homeowner';
import Footer from './components/common/Footer';
import { PrivateRoute, PublicRoute } from './components/auth/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import Header from './components/common/Header';
import PropTypes from 'prop-types';

// Route guard component for admin routes
function AdminRoute({ children }) {
  const { user } = useAuth();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/homeowner" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* <Header /> */}
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
              <Route path="/" element={<HomePage />} />
              <Route path="/pricing" element={<Pricing />} />
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
              
              {/* Protected homeowner routes */}
              <Route 
                path="/homeowner/*" 
                element={
                  <PrivateRoute>
                    <Homeowner />
                  </PrivateRoute>
                } 
              />

              {/* Protected admin routes */}
              <Route 
                path="/admin/*" 
                element={
                  <PrivateRoute adminOnly>
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  </PrivateRoute>
                } 
              />

              {/* Catch-all redirect */}
              <Route 
                path="*" 
                element={
                  <Navigate to="/" replace />
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

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
