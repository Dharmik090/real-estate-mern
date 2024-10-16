import { React, useState, useEffect } from "react"
import { Link } from "react-router-dom"

const Header = (props) => {

    const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('userId'));
    
    return (
        <div className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-home"></i>
                                <span className="ms-2">
                                    EstateEase
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
                                    <Link className="nav-link" to="/blog">Blog</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link" to="#">Category <i className="fas fa-chevron-down"></i></Link>
                                    <ul className="sub-ul">
                                        <li><Link to="#">item</Link></li>
                                        <li><Link to="#">item</Link></li>
                                        <li><Link to="#">item</Link></li>
                                    </ul>
                                </li> */}
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
                                        <Link className="nav-link" to="/login" onClick={() => {
                                            props.setIsLoggedIn(false);
                                            localStorage.setItem('userId', '');
                                            localStorage.setItem('authToken', '');
                                        }}>Logout</Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Header;