import React from "react";
import { Link } from "react-router-dom";
import '../../static/FlatItem.css';

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <div className="property-image-container">
                <img
                    src={property.images?.[0] || '/property-placeholder.jpg'}
                    className="property-image"
                    alt={property.title}
                />
                <span className={`property-badge ${property.status === "For Rent" ? "rent" : "sale"}`}>
                    {property.status || 'Status unknown'}
                </span>
            </div>
            <div className="property-details">
                <h3 className="property-title">{property.title || 'No Title'}</h3>
                <div className="text-muted mb-2">
                    <i className="fas fa-map-marker-alt"></i> {property.location || 'Location not specified'}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-primary fw-bold">
                        ₹ {property.price || '0'}
                    </span>
                    <span className="badge bg-secondary">
                        {property.bhk || 'N/A'} BHK
                    </span>
                </div>
                <div className="d-flex justify-content-between text-muted small mb-3">
                    <span>
                        <i className="fas fa-arrows-alt"></i> {property.area || '0'} sq.ft
                    </span>
                    <span className={property.status === 'Available' ? 'text-success' : 'text-warning'}>
                        {property.status || 'Status unknown'}
                    </span>
                </div>
                <Link 
                    to={`/flat/${property._id}`} 
                    className="property-link w-100 text-center"
                >
                    <i className="fas fa-eye"></i> View Details
                </Link>
            </div>
        </div>
    );
};

export default PropertyCard;