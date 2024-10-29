import {useState, useEffect} from "react"

import propertyService from "../../services/propertyService";
import BlogItem from "./BlogItem"

const Blog = () => {

    const [propertyList, setPropertyList] = useState([]);

    const fetchData = async () => {
        const response = await new propertyService().getAllProperties();

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
        <section className="blog">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title">Properties</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        {
                            propertyList.map(p =>
                                <BlogItem key={p._id} property={p} />
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Blog