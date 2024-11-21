import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

export function PrivateRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) {
    localStorage.removeItem('hasHomeownerProfile');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export function PublicRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated()) {
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
