import { React, useEffect, useState } from 'react';
import Title from "../Title";
import FlatItem from "./RecentFlatItem";
import propertyService from '../../services/propertyService';
import '../../static/FlatList.css';

const RecentFlatList = ({ title, description }) => {
    const [propertyList, setPropertyList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await new propertyService().getRecentProperties();
            setPropertyList(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="flat-section">
            <div className="container">
                <Title title={title} description={description} />
                <div className="property-grid">
                    {propertyList.map(property => (
                        <FlatItem key={property._id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RecentFlatList;