import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../auth/UserLogin';
import Register from '../auth/UserRegister';
import Profile from '../auth/Profile';
import PropertyDetail from '../components/Property/PropertyDetail';
import PropertyForm from '../components/Property/PropertyForm';
import Blog from '../components/Blog/BlogList';
import ProtectedRoute from '../layout/ProtectedRoute';
import PropertyExplore from '../components/Property/PropertyExplore';

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => (
    <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/flat/:id" element={<PropertyDetail />} />
        <Route path="/properties" element={<Blog />} />

        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/property/add" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
        <Route path="/property/edit/:id" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />

        <Route path="/search" element={<ProtectedRoute><PropertyExplore /></ProtectedRoute>} />
    </Routes>
);

export default AppRoutes;
