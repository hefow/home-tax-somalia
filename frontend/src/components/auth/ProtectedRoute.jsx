import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

// Route for authenticated users only
export function PrivateRoute({ children, adminOnly }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login while saving the attempted location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route is admin-only and user is not admin, redirect to homeowner dashboard
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/homeowner" replace />;
  }

  // If user is admin and trying to access homeowner routes
  if (!adminOnly && user.role === 'admin' && location.pathname === '/homeowner') {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

// Route for non-authenticated users only
export function PublicRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (user) {
    // Redirect to the appropriate dashboard based on role
    const targetPath = user.role === 'admin' ? '/admin' : '/homeowner';
    return <Navigate to={targetPath} replace />;
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
