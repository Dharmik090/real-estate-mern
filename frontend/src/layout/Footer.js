import React from "react";
import '../static/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            {/* <div className="container footer-container">
                <div className="footer-column">
                    <div className="footer-brand">
                        <i className="fas fa-home"></i>
                        <h3>EstatePrime</h3>
                    </div>
                    <p className="footer-text">
                        Your trusted partner in finding dream properties.
                    </p>
                    <div className="footer-social">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>

                <div className="footer-column">
                    <h4 className="footer-title">Menu</h4>
                    <ul className="footer-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4 className="footer-title">Categories</h4>
                    <ul className="footer-links">
                        <li><a href="#">Category 1</a></li>
                        <li><a href="#">Category 2</a></li>
                        <li><a href="#">Category 3</a></li>
                        <li><a href="#">Category 4</a></li>
                    </ul>
                </div>

                <div className="footer-column">
                    <h4 className="footer-title">Contact</h4>
                    <ul className="footer-contact">
                        <li><i className="fas fa-clock"></i> 08:00–18:00</li>
                        <li><i className="fas fa-envelope"></i> info@house.com</li>
                        <li><i className="fas fa-map-marker-alt"></i> Lorem Ipsum</li>
                        <li><i className="fas fa-phone-alt"></i> 0500 000 00 00</li>
                    </ul>
                </div>
            </div> */}

            <div className="footer-bottom">
                <p className="footer-text">&copy; {new Date().getFullYear()} EstatePrime. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
