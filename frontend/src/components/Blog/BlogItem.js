import { Link } from "react-router-dom";
import "../../static/BlogItem.css";

const BlogItem = ({ property }) => {
    return (
        <div className="property-card">
            <div className="property-image-container">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    className="property-image"
                />
                <span className={`property-badge ${property.status === "For Rent" ? "rent" : "sale"}`}>
                    {property.status}
                </span>
            </div>
            <div className="property-details">
                <h3 className="property-title">
                    <Link to={`/flat/${property._id}`}>{property.title}</Link>
                </h3>
                <p className="property-price">{property.price}</p>
                <p className="property-location">
                    <i className="fas fa-map-marker-alt"></i> {property.city}
                </p>
                <Link to={`/flat/${property._id}`} className="property-link">
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default BlogItem;