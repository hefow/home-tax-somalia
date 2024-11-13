import React from 'react';
import { BrowserRouter } from 'react-router-dom';
<<<<<<< HEAD

=======
import { Toaster } from 'react-hot-toast';
<<<<<<< HEAD
>>>>>>> fd791b74c6f452ccae181d7cd17d0ebf97056a5a
import AppContent from './AppContent';


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
=======
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homeowner from './pages/Homeowner';
import Footer from './components/common/Footer';
import { PrivateRoute, PublicRoute } from './components/auth/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import PropTypes from 'prop-types';
import UserMange from './components/common/UserManage';

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
>>>>>>> 3b9eb8c0e5efc55ad7491cb983cd70ca88183fed
  );
}

export default App;