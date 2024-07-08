import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_API_KEY

export const MapGL = () => {    

    const mapContainerRef = useRef(null)
    const map = useRef(null)
    const [ lng, setLng ] = useState(5)
    const [ lat, setLat ] = useState(34)
    const [ zoom, setZoom ] = useState(1.5)

    useEffect(() => {
        if(map.current) return
        map.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [ lng, lat ],
            zoom: zoom
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        })
        return () => map.current.remove()
    }, [])

    return (
        <div>
            <div className='sideBar'>
                <div>
                    Longitude: {lng} | Latitude: {lat}
                </div>
            </div>
            <div className='map-container' ref={mapContainerRef} ></div>
        </div>
    );
}



