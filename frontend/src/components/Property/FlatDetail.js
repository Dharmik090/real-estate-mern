import { React, useState, useEffect } from "react";
import propertyService from "../../services/propertyService";
import { useParams, Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import MapComponent from "../MapComponent";


const FlatDetail = () => {

    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '60px',
        adaptiveHeight: true,
        arrows: true
    };


    const { id } = useParams();

    const [property, setProperty] = useState({});
    const [recentProperties, setRecentProperties] = useState([]);


    const fetchData1 = async () => {
        const response = await new propertyService().getPropertyById(id);

        const data = response.data;

        data.images = data.images.map(image => {
            return ({
                original: image,
            });
        });

        setProperty(data);
    }

    const fetchData2 = async () => {
        const response = await new propertyService().getRecentProperties();
        const data = response.data;
        data.map(property => {
            property.images = property.images.map(image => {
                return ({
                    original: image
                });
            });
        });

        setRecentProperties(data);
    }

    useEffect(() => {
        fetchData1();
        fetchData2();
    }, [id]);

    return (
        <div className="flat-detail">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title">Property Details</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="fd-top flat-detail-content">
                            <div>
                                <h3 className="flat-detail-title">{property.title}</h3>
                                <p className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                    {property.city}</p>
                            </div>
                            <div>
                                <span className="fd-price">{property.price}</span>
                            </div>
                        </div>

                        <Slider {...settings}>
                            {property.images && property.images.map((image, index) => (
                                <div key={index} className="d-flex justify-content-center m-5" style={{ padding: '0 10px' }}> {/* Add padding for margin effect */}
                                    <img
                                        src={image.original}
                                        alt={`Property Image ${index + 1}`}
                                        style={{
                                            width: "50%",
                                            height: "30rem",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>


                        <div className="row">
                            <div className="col-lg-8">
                                <div className="fd-item">
                                    <h4>Description</h4>
                                    <p>{property.description}</p>
                                </div>
                                <div className="fd-item fd-property-detail">
                                    <h4>Property Details</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>{property.bhk} BHK</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>Location: {property.location}</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <span>City: {property.city}</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Coutry: {property.country}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fd-item">
                                    <h4>Maps</h4>
                                    <MapComponent latitude={property.latitude} longitude={property.longitude} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button onClick={() => navigate('/mail/'+property._id)} className="btn btn-primary" style={{ width: '50%' }}>Request for {property.status == "For Sell" ? "Buy" : "Rent"}</button>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button onClick={() => navigate('/payment')} className="btn btn-primary mt-2" style={{ width: '50%' }}>Payment</button>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <h4>Recently Added</h4>
                                <div className="fd-sidebar-item pt-3 pb-3">
                                    {

                                        recentProperties.map(p =>
                                            <div className="recently-item">
                                                <img src={p.images[0].original} alt="detail" width="50px" />
                                                <Link to={`/flat/${p._id}`} className="item-title">
                                                    <span>{p.title}</span>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FlatDetail