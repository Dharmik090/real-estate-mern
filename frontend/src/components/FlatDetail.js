import { React, useState, useEffect } from "react";
import propertyService from "../services/propertyService";
import { useParams } from "react-router-dom";
import Slider from "react-slick";


const FlatDetail = () => {

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

    const fetchData = async () => {
        const response = await new propertyService().getPropertyById(id);

        const data = response.data;

        data.images = data.images.map(image => {
            return ({
                original: image,
            });
        });

        setProperty(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                                <span className="fd-price">${property.price}</span>
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
                                        {/* <div className="col-lg-4">
                                            <span>All Rooms: </span>
                                            <span>5</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <span>Kitchen:  </span>
                                            <span>1</span>
                                        </div> */}
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
                                <div className="fd-item fd-features">
                                    <h4>Features</h4>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <i className="fa fa-check"></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check"></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                        <div className="col-lg-4">
                                            <i className="fa fa-check" ></i>
                                            <span>Lorem Ipsum</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="fd-item">
                                    <h4>Maps</h4>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15105200.564429!2d37.91245092855647!3d38.99130948591772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b0155c964f2671%3A0x40d9dbd42a625f2a!2zVMO8cmtpeWU!5e0!3m2!1str!2str!4v1630158674074!5m2!1str!2str" width="100%" height="450" loading="lazy"></iframe>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="fd-sidebar-item">
                                    <h4>Recently Added</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Category</h4>
                                    <ul className="category-ul">
                                        <li>Category 1</li>
                                        <li>Category 2</li>
                                        <li>Category 3</li>
                                        <li>Category 4</li>
                                        <li>Category 5</li>
                                    </ul>
                                </div>
                                <div className="fd-sidebar-item">
                                    <h4>Recently Added</h4>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                    <div className="recently-item">
                                        <img src="/img/product1.jpeg" alt="detail" width="50px" />
                                        <span>Lorem Ipsum Dolor</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlatDetail