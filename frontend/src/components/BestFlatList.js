import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import Title from "./Title"
import BestFlatItem from "./BestFlatItem"

export default function BestFlatList(props) {

    const [propertyList, setPropertyList] = useState([]);

    useEffect(() => {
        setPropertyList(["For Rent", "For Rent", "For Sale", "For Sale"]);
    }, []);

    return (
        <section className="section-all-re">
            <div className="container">
                <Title title={props.title} description={props.description} />
                <div className="row">
                    {
                        propertyList.map(state =>
                            <BestFlatItem flatState={state} />
                        )
                    }
                </div>
            </div>
        </section >
    );
}