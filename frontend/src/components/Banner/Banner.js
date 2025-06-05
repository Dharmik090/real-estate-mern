import { useState } from "react";
import banner from "../../banner.jpg";
import { Link } from "react-router-dom";
import '../../static/Banner.css';

const Banner = () => {
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchText(value);

        if (value.length === 0) {
            setSearchResults([]);
        }
    };

    const handleSearchClick = () => {
        console.log("Searching for:", searchText);
        // Here you would typically make an API call with searchText
    };

    return (
        <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
            <div className="banner-overlay">
                <div className="banner-container">
                    <div className="banner-content">
                        <h2 className="banner-title">
                            <strong>Find your properties</strong>
                        </h2>

                        <div className="search-container">
                            <input
                                type="text"
                                value={searchText}
                                onChange={handleSearchChange}
                                placeholder="Search properties..."
                                className="search-input"
                            />

                            <button
                                onClick={handleSearchClick}
                                className="search-button"
                            >
                                Search
                            </button>

                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map(item => (
                                        <Link
                                            key={item}
                                            to="#"
                                            className="search-result-item"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {searchText.length > 0 && searchResults.length === 0 && (
                                <div className="no-results">
                                    No results found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;