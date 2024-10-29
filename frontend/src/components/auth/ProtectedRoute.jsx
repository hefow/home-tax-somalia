import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

// Route for authenticated users only
export function PrivateRoute({ children, adminOnly }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If route is admin-only and user is not admin
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

// Route for non-authenticated users only
export function PublicRoute({ children }) {
  const { user } = useAuth();
  
  if (user) {
    // Redirect based on user role
    if (user.role === 'admin') {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/dashboard" />;
  }
  
  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
};

PrivateRoute.defaultProps = {
  adminOnly: false,
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
