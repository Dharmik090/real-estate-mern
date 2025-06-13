import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import PropertyCard from "../Property/PropertyCard";
import propertyService from "../../services/propertyService";
import '../../static/FlatList.css';
import Loader from '../ui/Loader'; // Assume you have a Loader component

export default function BestPropertyList({ title, description }) {
    const [propertyList, setPropertyList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await new propertyService().getBestProperties();

            setPropertyList(response || []);
        } catch (error) {
            console.error("Error fetching properties:", error);
            setError("Failed to load featured properties. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="flat-section">
            <div className="container">
                <Title title={title} description={description} />
                {loading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : propertyList.length === 0 ? (
                    <div className="empty-message">No featured properties available</div>
                ) : (
                    <div className="property-grid">
                        {propertyList.map((property) => (
                            <PropertyCard property={property} key={property._id} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}