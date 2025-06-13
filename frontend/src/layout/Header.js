
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import '../static/Header.css';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
    const { isLoggedIn, user, loading, logout } = useAuth();
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="text-center my-5 py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading profile...</p>
            </div>
        );
    }

    const handleLogout = async () => {

        setIsProcessing(true);
        try {
            await logout();
            setConfirmOpen(false);
            toast.success('Logout successful!', {
                autoClose: 2000,
            });
            navigate('/');
        } catch (error) {
            toast.success(`Something went wrong. Error: ${error.message}`, {
                autoClose: 2000,
            });
        } finally {
            setIsProcessing(false);
        }

    }

    return (
        <>
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

            </header>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleLogout}
                message="Are you sure you want to Logout?"
                title="Confirm Logout"
                btnText="Logout"
                isProcessing={isProcessing}
            />
        </>
    );
};

export default Header;