import { useNavigate } from "react-router-dom";
import banner from "../../banner.jpg";
import '../../static/Banner.css';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="banner" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${banner})` }}>
            <div className="banner-container">
                <div className="banner-content">
                    <div className="banner-text">
                        <h1 className="banner-title">
                            Find Your Perfect <span className="highlight">Dream Home</span>
                        </h1>
                        <h2 className="banner-subtitle">
                            Discover luxury properties in prime locations
                        </h2>
                        <div className="banner-features">
                            <div className="feature-item">
                                <i className="fas fa-home"></i>
                                <span>10,000+ Premium Listings</span>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>50+ Exclusive Locations</span>
                            </div>
                            <div className="feature-item">
                                <i className="fas fa-award"></i>
                                <span>Trusted by 5,000+ Clients</span>
                            </div>
                        </div>
                    </div>
                    <div className="cta-container">
                        <button onClick={() => navigate('/search')} className="cta-button">
                            <i className="fas fa-search"></i> Explore Properties
                        </button>
                        <div className="trust-badges">
                            <span>#1 Real Estate Platform</span>
                            <span>★★★★★ 4.9/5 (2,500+ Reviews)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;