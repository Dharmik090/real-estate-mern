import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../auth/UserLogin';
import Register from '../auth/UserRegister';
import Profile from '../auth/Profile';
import FlatDetail from '../components/BestFlat/FlatDetail';
import PropertyForm from '../components/PropertyForm';
import Blog from '../components/Blog/Blog';
import ProtectedRoute from '../layout/ProtectedRoute';

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => (
    <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/flat/:id" element={<FlatDetail />} />
        <Route path="/properties" element={<Blog />} />

        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/property/add" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
        <Route path="/property/edit/:id" element={<ProtectedRoute><PropertyForm /></ProtectedRoute>} />
    </Routes>
);

export default AppRoutes;
