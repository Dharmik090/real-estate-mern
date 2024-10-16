import { React, useEffect, useState } from 'react'

import Title from "./Title"
import FlatItem from "./FlatItem"

const FlatList = (props) => {
    const [propertyList, setPropertyList] = useState([]);

    useEffect(() => {
        setPropertyList([1,2,3]);
    }, []);

    return (
        <section className="section-all-re">
            <div className="container">
                <Title title={props.title} description={props.description} />
                <div className="row">
                    {
                        propertyList.map(p => 
                            <FlatItem slug={p}/>
                        )
                    }
                </div>
            </div>
        </section>
    )

}

export default FlatList;