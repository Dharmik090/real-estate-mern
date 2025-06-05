import { useState, useEffect } from "react";
import propertyService from "../../services/propertyService";
import BlogItem from "./BlogItem";
import "../../static/Blog.css";

const Blog = () => {
    const [propertyList, setPropertyList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);

    const fetchData = async (page = 1, limit = itemsPerPage) => {
        try {
            const response = await new propertyService().getAllProperties(page, limit);
            setPropertyList(response.data.data);
            setTotalItems(response.data.total || response.data.data.length);
        } catch (error) {
            console.error("Error fetching properties:", error);
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
                        className={currentPage === i ? "active" : ""}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            pages.push(
                <button key={1} onClick={() => handlePageChange(1)}>
                    1
                </button>
            );

            if (currentPage > 3) pages.push(<span key="start-ellipsis">...</span>);

            const startPage = Math.max(2, currentPage - 1);
            const endPage = Math.min(totalPages - 1, currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pages.push(
                    <button
                        key={i}
                        className={currentPage === i ? "active" : ""}
                        onClick={() => handlePageChange(i)}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) pages.push(<span key="end-ellipsis">...</span>);

            pages.push(
                <button key={totalPages} onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <section className="property-listing">
            <div className="container">
                <div className="listing-header">
                    <h1 className="listing-title">All Properties</h1>
                    <div className="pagination-controls">
                        <div className="items-per-page">
                            <label htmlFor="itemsPerPage">Items per page:</label>
                            <select
                                id="itemsPerPage"
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                            >
                                <option value="6">6</option>
                                <option value="12">12</option>
                                <option value="18">18</option>
                                <option value="24">24</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="property-grid">
                    {propertyList.map(property => (
                        <BlogItem key={property._id} property={property} />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        {renderPageNumbers()}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Blog;
