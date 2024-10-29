// src/components/MapComponent.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ setProperty, latitude = 20.5937, longitude = 78.9629 }) => {
    const mapRef = useRef(null); // Create a ref to hold the map instance
    const markerRef = useRef(null); // Create a ref to hold the marker instance

    useEffect(() => {
        // Initialize the map only once
        if (!mapRef.current) {
            const map = L.map('map').setView([latitude, longitude], 5); // Set initial view based on props

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap'
            }).addTo(map);

            // Create and add the marker
            markerRef.current = L.marker([latitude, longitude]).addTo(map);

            // Event listener for map clicks
            map.on('click', (e) => {
                const { lat, lng } = e.latlng; // Get latitude and longitude from click event
                markerRef.current.setLatLng([lat, lng]); // Move marker to clicked location
                setProperty((prev) => ({ ...prev, latitude: lat, longitude: lng })); // Update state
            });

            mapRef.current = map; // Store the map instance in the ref
        }

        // Update marker position if latitude or longitude props change
        if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude]); // Update marker position
            mapRef.current.setView([latitude, longitude], mapRef.current.getZoom()); // Center the map on the new marker
        }

        return () => {
            // Cleanup map on component unmount
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null; // Clear map reference
            }
        };
    }, [latitude, longitude, setProperty]);

    return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

export default MapComponent;
