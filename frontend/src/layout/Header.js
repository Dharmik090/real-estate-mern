
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import '../static/Header.css';
import { useAuth } from '../components/AuthContext';

const Header = () => {
    const { isLoggedIn, user, loading, logout } = useAuth();
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const navigate = useNavigate();

    if (loading) {
        return <div className="navbar-container">Loading...</div>;
    }

    const handleLogout = async () => {
        await logout();
        setConfirmOpen(false);
        toast.success('Logout successful!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        navigate('/');
    }

    return (
        <header className="navbar-container">
            <div className="navbar-content container">
                <Link className="brand" to="/">
                    <i className="fas fa-home"></i>
                    <span>EstatePrime</span>
                </Link>

                <input type="checkbox" id="menu-toggle" className="menu-toggle" />
                <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>

                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/properties">Properties</Link></li>

                    {!isLoggedIn ? (
                        <li><Link to="/login">Register | Login</Link></li>
                    ) : (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li>
                                <button className="logout-btn" onClick={() => setConfirmOpen(true)}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleLogout}
                message="Are you sure you want to Logout?"
                title="Confirm Logout"
                btnText="Logout"
            />
        </header>
    );
};

export default Header;