import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

// Route for authenticated users only
export function PrivateRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    // Clear any remaining auth data and redirect to login
    localStorage.removeItem('hasHomeownerProfile');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

// Route for non-authenticated users only
export function PublicRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated()) {
    // If authenticated, redirect to appropriate dashboard
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/homeowner" replace />;
  }
  
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
