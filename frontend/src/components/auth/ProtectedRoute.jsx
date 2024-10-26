import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Route for authenticated users only
export function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    // Redirect to login but save the attempted location
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return children;
}

// Route for non-authenticated users only
export function PublicRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  
  if (user) {
    // Redirect to the page they came from or homeowner dashboard
    return <Navigate to={location.state?.from?.pathname || "/homeowner"} />;
  }
  
  return children;
}
