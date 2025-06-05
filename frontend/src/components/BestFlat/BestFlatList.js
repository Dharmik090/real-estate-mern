import React, { useEffect, useState } from "react";
import Title from "../Title";
import BestFlatItem from "./BestFlatItem";
import propertyService from "../../services/propertyService";
import '../../static/FlatList.css';

export default function BestFlatList({ title, description }) {
    const [propertyList, setPropertyList] = useState([]);

    const fetchData = async () => {
        const response = await new propertyService().getBestProperties();
        setPropertyList(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="flat-section">
            <div className="container">
                <Title title={title} description={description} />
                <div className="property-grid">
                    {propertyList.map((property) => (
                        <BestFlatItem property={property} key={property._id} />
                    ))}
                </div>
            </div>
        </section>
    );
}