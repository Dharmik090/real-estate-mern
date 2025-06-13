import { useState, useEffect } from "react";
import propertyService from "../../services/propertyService";
import PropertyCard from "../Property/PropertyCard";
import Loader from "../ui/Loader";
import "../../static/Blog.css";
import { useNavigate } from "react-router-dom";

const Blog = () => {
    const [propertyList, setPropertyList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async (page = 1, limit = itemsPerPage) => {
        try {
            setLoading(true);
            setError(null);
            const response = await new propertyService().getAllProperties(page, limit);
            
            setPropertyList(response.data || []);
            setTotalItems(response.total || response.data.length || 0);
        } catch (error) {
            console.error("Error fetching properties:", error);
            setError("Failed to load properties. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, itemsPerPage);
    }, [currentPage, itemsPerPage]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        scrollToTop();
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        className={`page-number ${currentPage === i ? "active" : ""}`}
                        onClick={() => handlePageChange(i)}
                        disabled={loading}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            pages.push(
                <button
                    key={1}
                    className={`page-number ${currentPage === 1 ? "active" : ""}`}
                    onClick={() => handlePageChange(1)}
                    disabled={loading}
                >
                    1
                </button>
            );

            if (currentPage > 3) pages.push(<span key="start-ellipsis" className="ellipsis">...</span>);

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        className={`page-number ${currentPage === i ? "active" : ""}`}
                        onClick={() => handlePageChange(i)}
                        disabled={loading}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) pages.push(<span key="end-ellipsis" className="ellipsis">...</span>);

            pages.push(
                <button
                    key={totalPages}
                    className={`page-number ${currentPage === totalPages ? "active" : ""}`}
                    onClick={() => handlePageChange(totalPages)}
                    disabled={loading}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <section className="property-listing">
            <div className="container">
                <div className="explore-button-container">
                    <button 
                        onClick={() => navigate('/search')} 
                        className="explore-button"
                    >
                        <i className="fas fa-search"></i> Filter Properties
                    </button>
                </div>
                
                <div className="listing-header">
                    <h1 className="listing-title">All Properties</h1>
                    <div className="pagination-controls">
                        <div className="items-per-page">
                            <label htmlFor="itemsPerPage">Items per page:</label>
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                disabled={loading}
                                className="items-per-page-select"
                            >
                                <option value="6">6</option>
                                <option value="12">12</option>
                                <option value="18">18</option>
                                <option value="24">24</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="loader-container">
                        <Loader />
                    </div>
                ) : error ? (
                    <div className="error-message">
                        {error}
                        <button
                            className="retry-button"
                            onClick={() => fetchData(currentPage, itemsPerPage)}
                        >
                            Retry
                        </button>
                    </div>
                ) : propertyList.length === 0 ? (
                    <div className="empty-message">
                        <i className="icon-empty"></i>
                        No properties found
                    </div>
                ) : (
                    <>
                        <div className="property-grid">
                            {propertyList.map(property => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination-container">
                                <button
                                    className="pagination-btn prev-next"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || loading}
                                >
                                    Previous
                                </button>

                                <div className="page-numbers">
                                    {renderPageNumbers()}
                                </div>

                                <button
                                    className="pagination-btn prev-next"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || loading}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default Blog;