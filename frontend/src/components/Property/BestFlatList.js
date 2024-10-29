import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import Title from "../Title"
import BestFlatItem from "./BestFlatItem"
import propertyService from "../../services/propertyService";

export default function BestFlatList(props) {

    const [propertyList, setPropertyList] = useState([]);

    const fetchData = async () => {
        const response = await new propertyService().getBestProperties();

        response.data.map(property => {
            property.images = property.images.map(image => {
                return ({
                    original: image
                });
            });
        });

        setPropertyList(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="section-all-re">
            <div className="container">
                <Title title={props.title} description={props.description} />
                <div className="row">
                    {
                        propertyList.map(p =>
                            <BestFlatItem key={p._id} property={p} />
                        )
                    }
                </div>
            </div>
        </section >
    );
}