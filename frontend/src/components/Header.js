import { React, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ConfirmDialog from "./ConfirmDialog";

const Header = (props) => {

    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('userId'));
    const [isConfirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem('userId'));
    });

    const logoutClick = () => {
        props.setIsLoggedIn(false);
        setIsLoggedIn(false);
        setConfirmOpen(false);
        localStorage.setItem('userId', '');
        localStorage.setItem('authToken', '');
    }

    return (
        <div className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-home"></i>
                                <span className="ms-2">
                                    EstatePrime
                                </span>
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/properties">Properties</Link>
                                </li>
                                {!isLoggedIn &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Register | Login</Link>
                                    </li>
                                }
                                {isLoggedIn &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </li>
                                }
                                {isLoggedIn &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/" onClick={() => setConfirmOpen(true)}>Logout</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={logoutClick}
                message="Are you sure you want to Logout?"
                title="Confirm Logout"
                btnText="Logout"
            />
        </div>
    )
}

export default Header;