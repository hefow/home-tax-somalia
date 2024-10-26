import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Route for authenticated users only
export function PrivateRoute({ children }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

// Route for non-authenticated users only
export function PublicRoute({ children }) {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/homeowner" />;
  }
  
  return children;
}
