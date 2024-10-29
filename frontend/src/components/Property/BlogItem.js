import { Link } from "react-router-dom"

const BlogItem = (props) => {
    return (
        <div className="col-lg-4">
            <div className="blog-item">
                <div className="blog-img">
                    <img src={props.property.images[0].original} alt="product" className="w-100" />
                </div>
                <div className="blog-content">
                    <h2 className="blog-title"><Link to={`/flat/${props.property._id}`}>{props.property.title}</Link></h2>
                    <div className="blog-info">
                        {/* <div className="blog-info-item"><i className="far fa-calendar-alt "></i><span></span></div>
                        <div className="blog-info-item"><i className="far fa-comments"></i><span>0 Comments</span></div> */}
                    </div>
                    <div className="blog-text">
                        {props.property.description}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem