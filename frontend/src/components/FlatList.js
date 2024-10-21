import { React, useEffect, useState } from 'react'

import Title from "./Title"
import FlatItem from "./FlatItem"
import propertyService from '../services/propertyService';

const FlatList = (props) => {
    const [propertyList, setPropertyList] = useState([]);

    const fetchData = async () => {
        const response = await new propertyService().getAllProperties();
        let data = response.data.slice(0, 5)

        data.map(property => {
            property.images = property.images.map(image => {
                return ({
                    original: image
                });
            });
        });

        setPropertyList(data);
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
                            <FlatItem key={p._id} property={p} />
                        )
                    }
                </div>
            </div>
        </section>
    )

}

export default FlatList;