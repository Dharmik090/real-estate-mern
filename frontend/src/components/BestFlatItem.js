import { Link } from "react-router-dom"
const BestFlatItem = (props) => {
    return (

        <div className="text-center col-lg-4 col-12 col-md-6 ">
            <div className="item">
                <div className="best-estate-img-area">
                    <img className="img-fluid" src={props.property.images[0].original} alt="flat" />
                    <div className={`best-estate-state ${props.property.status === "For Rent" ? "bg-green" : "bg-red"}`}>{props.property.status}</div>
                </div>
                <div className="item-description">
                    <div className="d-flex justify-content-between mb-3">
                        <span className="item-title">{props.property.title}</span>
                        <span className="item-price">{props.property.price}</span>
                    </div>
                    <div className="item-icon d-flex alig-items-center justify-content-between">
                        <div>
                            <p className="fd-address"> <i className="fas fa-map-marker-alt"></i>
                                {props.property.city}</p>
                        </div>
                        <Link to={`/flat/${props.property._id}`} className="item-title">
                            <button className="btn btn-detail">View</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestFlatItem