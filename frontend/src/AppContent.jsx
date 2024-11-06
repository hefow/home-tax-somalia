import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeowner from './pages/Homeowner';
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import PaymentSuccess from './pages/PaymentSuccess';
import Footer from './components/common/Footer';
import { PrivateRoute, PublicRoute } from './components/auth/ProtectedRoute';

function AppContent() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-right" />
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            
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
            
            <Route 
              path="/pricing" 
              element={
                <PrivateRoute>
                  <Pricing />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/admin/*" 
              element={
                <PrivateRoute adminOnly>
                  <AdminDashboard />
                </PrivateRoute>
              } 
            />
            
            <Route 
              path="/homeowner/*" 
              element={
                <PrivateRoute>
                  <Homeowner />
                </PrivateRoute>
              } 
            />

            <Route path="/payment-success" element={<PaymentSuccess />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default AppContent;