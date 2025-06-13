import { useState, useEffect } from 'react';
import Select from 'react-select'
import { useLocation, useNavigate } from 'react-router-dom';
import propertyService from '../../services/propertyService';
import PropertyCard from './PropertyCard';
import Loader from '../ui/Loader';
import '../../static/PropertyExplore.css';

const PropertyExplore = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [totalItems, setTotalItems] = useState(0);
    const [filters, setFilters] = useState({
        searchText: '',
        cities: [],
        countries: [],
        states: [],
        minPrice: '',
        maxPrice: '',
        bhk: [],
        propertyType: [],
        status: []
    });



    const cityOptions = [
        { value: 'New York', label: 'New York' },
        { value: 'Los Angeles', label: 'Los Angeles' },
        { value: 'Chicago', label: 'Chicago' },
        { value: 'Houston', label: 'Houston' },
        { value: 'Miami', label: 'Miami' },
    ];

    const countryOptions = [
        { value: 'USA', label: 'USA' },
        { value: 'India', label: 'India' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Australia', label: 'Australia' },
        { value: 'UK', label: 'UK' },
    ];

    const stateOptions = [
        { value: 'Gujarat', label: 'Gujarat' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'California', label: 'California' },
        { value: 'England', label: 'England' },
        { value: 'Queensland', label: 'Queensland' },
    ];

    const bhkOptions = ['1', '2', '3', '4', '5+'].map(v => ({ value: v, label: `${v} BHK` }));

    const statusOptions = ['Available', 'Not Available', 'For Sale', 'For Rent'].map(v => ({ value: v, label: v }));

    const typeOptions = ['Flat', 'Tenament', 'Bungalow'].map(v => ({ value: v, label: v }));


    const renderMultiSelect = (label, filterKey, options) => (
        <div className="filter-section">
            <h4>{label}</h4>
            <Select
                isMulti
                options={options}
                value={options.filter(o => filters[filterKey].includes(o.value))}
                onChange={(selectedOptions) => {
                    const values = selectedOptions.map(o => o.value);
                    handleFilterChange(filterKey, values, false); // don't use `isRemoving` logic here
                }}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder={`Select ${label}`}
            />
        </div>
    );





    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const initialFilters = {
            searchText: params.get('q') || '',
            cities: params.get('cities')?.split(',') || [],
            states: params.get('states')?.split(',') || [],
            countries: params.get('countries')?.split(',') || [],
            minPrice: params.get('minPrice') || '',
            maxPrice: params.get('maxPrice') || '',
            bhk: params.get('bhk')?.split(',') || [],
            propertyType: params.get('propertyType')?.split(',') || [],
            status: params.get('status')?.split(',') || []
        };
        setFilters(initialFilters);
        fetchProperties(params, currentPage, itemsPerPage);
    }, [location.search, currentPage, itemsPerPage]);

    const fetchProperties = async (filterParams, page, limit) => {
        setLoading(true);
        setError(null);
        try {
            const response = await new propertyService().getPropertiesBySearch(filterParams, page, limit);
            setProperties(response.data || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
            setError('Failed to load properties. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (filterType, value, isRemoving = false) => {
        const newFilters = { ...filters };

        if (['searchText', 'minPrice', 'maxPrice'].includes(filterType)) {
            newFilters[filterType] = value;
        } else {
            newFilters[filterType] = Array.isArray(value)
                ? value
                : isRemoving
                    ? newFilters[filterType].filter(item => item !== value)
                    : [...new Set([...newFilters[filterType], value])];

        }

        setFilters(newFilters);
        setCurrentPage(1);
        updateURLParams(newFilters);
    };

    const updateURLParams = (filterParams) => {
        const params = new URLSearchParams();

        if (filterParams.searchText) params.set('q', filterParams.searchText);
        if (filterParams.cities.length) params.set('cities', filterParams.cities.join(','));
        if (filterParams.states.length) params.set('states', filterParams.states.join(','));
        if (filterParams.countries.length) params.set('countries', filterParams.countries.join(','));
        if (filterParams.minPrice) params.set('minPrice', filterParams.minPrice);
        if (filterParams.maxPrice) params.set('maxPrice', filterParams.maxPrice);
        if (filterParams.bhk.length) params.set('bhk', filterParams.bhk.join(','));
        if (filterParams.propertyType.length) params.set('propertyType', filterParams.propertyType.join(','));
        if (filterParams.status.length) params.set('status', filterParams.status.join(','));

        navigate(`?${params.toString()}`, { replace: true });
    };

    const clearFilters = () => {
        const resetFilters = {
            searchText: '',
            cities: [],
            states: [],
            countries: [],
            minPrice: '',
            maxPrice: '',
            bhk: [],
            propertyType: [],
            status: []
        };
        setFilters(resetFilters);
        navigate('/search');
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    const handlePageChange = (page) => {
        setCurrentPage(page);
        scrollToTop();
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const renderTagInput = (label, type) => (
        <div className="filter-section">
            <h4>{label}</h4>
            <div className="tag-input">
                {filters[type].map((item, index) => (
                    <span key={index} className="tag">
                        {item}
                        <button type="button" onClick={() => handleFilterChange(type, item, true)}>×</button>
                    </span>
                ))}
                <input
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                            handleFilterChange(type, e.target.value.trim());
                            e.target.value = '';
                        }
                    }}
                    placeholder={`Add ${type}`}
                />
            </div>
        </div>
    );


    const renderPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        className={currentPage === i ? "active" : ""}
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
                    onClick={() => handlePageChange(1)}
                    disabled={loading}
                >
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
                        disabled={loading}
                    >
                        {i}
                    </button>
                );
            }

            if (currentPage < totalPages - 2) pages.push(<span key="end-ellipsis">...</span>);

            pages.push(
                <button
                    key={totalPages}
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
        <div className="property-explore-container">
            <div className="filter-sidebar">
                <div className="filter-header">
                    <h3>Filter Properties</h3>
                    <button onClick={clearFilters} className="clear-filters">Clear All</button>
                </div>
                <div className="filter-section">
                    <h4>Search</h4>
                    <input
                        type="text"
                        placeholder="Search location or description..."
                        value={filters.searchText}
                        onChange={(e) => handleFilterChange('searchText', e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-section">
                    <h4>Price Range ($)</h4>
                    <div className="price-range">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.minPrice}
                            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.maxPrice}
                            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        />
                    </div>
                </div>
                {renderMultiSelect('Cities', 'cities', cityOptions)}
                {renderMultiSelect('States', 'states', stateOptions)}
                {renderMultiSelect('Countries', 'countries', countryOptions)}
                {renderMultiSelect('BHK', 'bhk', bhkOptions)}
                {renderMultiSelect('Status', 'status', statusOptions)}
                {renderMultiSelect('Type', 'propertyType', typeOptions)}
            </div>

            <div className="property-results">
                <div className="results-header">
                    <h2 className="results-title">
                        {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} Found
                    </h2>
                    <div className="pagination-controls">
                        <div className="items-per-page">
                            <label>Items per page:</label>
                            <select value={itemsPerPage} onChange={handleItemsPerPageChange} disabled={loading}>
                                <option value="6">6</option>
                                <option value="12">12</option>
                                <option value="18">18</option>
                                <option value="24">24</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="loader-container"><Loader /></div>
                ) : error ? (
                    <div className="error-message">
                        {error}
                        <button className="retry-button" onClick={() => fetchProperties(filters, currentPage, itemsPerPage)}>Retry</button>
                    </div>
                ) : properties.length === 0 ? (
                    <div className="empty-message">
                        <i className="icon-empty"></i>
                        No properties found matching your criteria
                    </div>
                ) : (
                    <>
                        <div className="property-grid">
                            {properties.map(property => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || loading}>Previous</button>
                                {renderPageNumbers()}
                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || loading}>Next</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PropertyExplore;
