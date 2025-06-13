import { React, useState, useEffect } from "react";
import propertyService from "../../services/propertyService";
import { useParams, Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import MapComponent from "../ui/MapComponent";
import Loader from "../ui/Loader"; // Import the Loader component
import "../../static/FlatDetail.css";

const PropertyDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [property, setProperty] = useState({}); // Initialize as null
    const [recentProperties, setRecentProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true
    };

    const fetchPropertyData = async () => {
        try {
            const response = await new propertyService().getPropertyById(id);
            setProperty(response);
        } catch (error) {
            console.error("Error fetching property:", error);
        }
    };
    
    const fetchRecentProperties = async () => {
        try {
            const response = await new propertyService().getRecentProperties();
            setRecentProperties(response);
        } catch (error) {
            console.error("Error fetching recent properties:", error);
        } finally {
            setIsLoading(false); // Set loading to false when both requests complete
        }
    };
    
    useEffect(() => {
        setIsLoading(true); // Set loading to true when component mounts or id changes
        fetchPropertyData();
        fetchRecentProperties();
    }, [id]);

    // Show loader while data is loading
    if (isLoading) {
        return (
            <div className="text-center my-5 py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading details...</p>
            </div>
        );
    }


    return (
        <div className="flat-detail-container">
            {/* Page Header */}
            <div className="flat-detail-header mt-5">
                <div className="container">
                    <h1 className="detail-page-title">Property Details</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container detail-content mt-4 pb-4">
                <div className="property-header">
                    <div className="property-title-section">
                        <h2 className="property-title">{property.title}</h2>
                        <p className="property-location">
                            <i className="fas fa-map-marker-alt"></i> {property.country}
                        </p>
                    </div>
                    <div className="property-price-section">
                        <span className="property-price">₹ {property.price}</span>
                    </div>
                </div>

                {/* Image Slider */}
                <div className="property-slider">
                    <Slider {...settings}>
                        {property.images?.map((image, index) => (
                            <div key={index} className="slider-image-container">
                                <img
                                    src={image}
                                    alt={`Property ${index + 1}`}
                                    className="property-main-image"
                                />
                            </div>
                        ))}
                    </Slider>
                </div>

                <div className="property-detail-grid">
                    {/* Main Content Column */}
                    <div className="property-main-content">
                        <div className="detail-section">
                            <h3 className="section-title">Description</h3>
                            <p className="section-content">{property.description || 'N/A    '}</p>
                        </div>

                        <div className="detail-section">
                            <h3 className="section-title">Property Details</h3>
                            <div className="property-features">
                                <div className="feature-item">
                                    <span className="feature-label">BHK:</span>
                                    <span className="feature-value">{property.bhk || 'N/A'}</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-label">Location:</span>
                                    <span className="feature-value">{property.location || 'Location not specified'}</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-label">City:</span>
                                    <span className="feature-value">{property.city || 'N/A'}</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-label">State:</span>
                                    <span className="feature-value">{property.state || 'N/A'}</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-label">Country:</span>
                                    <span className="feature-value">{property.country || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-section">
                            <h3 className="section-title">Location</h3>
                            <div className="map-container">
                                <MapComponent
                                    latitude={property.latitude}
                                    longitude={property.longitude}
                                />
                            </div>
                        </div>

                        {/* <div className="action-buttons">
                            <button
                                onClick={() => navigate(`/mail/${property._id}`)}
                                className="primary-btn"
                            >
                                Request for {property.status === "For Sell" ? "Buy" : "Rent"}
                            </button>
                            <button
                                onClick={() => navigate('/payment')}
                                className="primary-btn outline"
                            >
                                Make Payment
                            </button>
                        </div> */}
                    </div>

                    {/* Sidebar Column */}
                    <div className="property-sidebar">
                        <h3 className="sidebar-title">Recently Added</h3>
                        <div className="recent-properties">
                            {recentProperties.map(property => (
                                <Link
                                    to={`/flat/${property._id}`}
                                    key={property._id}
                                    className="recent-property-item"
                                >
                                    <img
                                        src={property.images[0]}
                                        alt={property.title}
                                        className="recent-property-image"
                                    />
                                    <span className="recent-property-title">{property.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;