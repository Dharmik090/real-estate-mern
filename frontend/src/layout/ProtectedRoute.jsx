import { useAuth } from '../components/AuthContext';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;