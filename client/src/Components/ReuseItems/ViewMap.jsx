import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axiosInstance from '../../Axios/proAxios'
import axios from 'axios'

function ViewMap({email,userLongitude, userLatitude}) {
    const mapContainerRef = useRef(null);
    const [longitude,setlongitude] = useState('')
    const [latitude,setlatitude] = useState('')
    const [pro,setPro] = useState('')
     const proAxios = axiosInstance()
     const endLatitude = parseFloat(userLatitude);
     const endLongitude = parseFloat(userLongitude);

    useEffect(()=>{
        proAxios.get(`/proMapDetails?email=${email}`).then((res)=>{
            if(res.data.message =='success'){
                setlongitude(res.data.longitude)
                setlatitude(res.data.latitude)
                setPro(res.data.pro)
            }else{
                console.log(error);
            }
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWptYWxub29yZGhlZW4iLCJhIjoiY2xsZHg3dWd4MGZjbzNkdGo1cG1oNTI2bCJ9._gj7bVbUM6dCwrU9e4MaIA';
        const map = new mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v10',
          center: [longitude, latitude],
          zoom: 10,
          
        })
   
    
    let selectedRouteIndex = 0; // Index of the currently selected route, default to 0 (main route)
    let routes = []; // Array to store all route data

     // Add markers for the starting and ending points
     const userMarker=new mapboxgl.Marker({ color: "#00ff00" }) // Green color for start marker
     .setLngLat([userLongitude,userLatitude])
     .addTo(map);

     const proMarker = new mapboxgl.Marker({ color: "#0000ff" }) // Blue color for end marker
      .setLngLat([longitude, latitude])
      .addTo(map)

       // Step 1: Create a custom popup with the mechanic name and logo
    const proPopUp = new mapboxgl.Popup().setHTML(`
    <div>
      <h3>${pro.name}</h3>
      <img src=${pro.image} alt="${pro.name}" width="50" height="50" />
    </div>
  `);

  // Step 2: Attach the custom popup to the turf marker
  proMarker.setPopup(proPopUp);

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1; // Distance in meters
    return distance;
  }

  const distance = calculateDistance(
    latitude,
    longitude,
    userLatitude,
    userLongitude,
  );

   // Display the distance on the map
   const popup = new mapboxgl.Popup().setText(
    `Distance: ${distance.toFixed(2)} KM`
  );
  userMarker.setPopup(popup).togglePopup();

  const fetchRouteData = () => {
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${longitude},${latitude};${endLongitude},${endLatitude}`,
        {
          params: {
            access_token: mapboxgl.accessToken,
            geometries: 'geojson',
            overview: 'full',
            alternatives: true,
          },
        }
      )
      .then((response) => {
        routes = response.data.routes;
        const routeData = routes[selectedRouteIndex].geometry;

        if (map.getSource('route')) {
          // If the source 'route' already exists, update the data
          map.getSource('route').setData(routeData);
        } else {
          // If the source 'route' doesn't exist, add a new source and layer
          map.on('load', () => {
            map.addSource('route', {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: routeData,
              },
            });

            map.addLayer({
              id: 'route',
              type: 'line',
              source: 'route',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#ff0000', // Red color for the route
                'line-width': 6,
              },
            });
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching route:', error);
      });
  };

   // Fetch the initial route data
   fetchRouteData();

   // Event listener for map click
   map.on('click', (e) => {
    const clickedPoint = e.lngLat;

    // Find the closest route to the clicked point
    let minDistance = Infinity;
    let closestRouteIndex = 0;

    routes.forEach((route, index) => {
      const routeGeometry = route.geometry;
      const routeCoordinates = routeGeometry.coordinates;

      // Calculate the distance from the clicked point to each coordinate in the route
      const distanceToRoute = routeCoordinates.reduce((minDist, coord) => {
        const distance = clickedPoint.distanceTo(new mapboxgl.LngLat(coord[0], coord[1]));
        return Math.min(minDist, distance);
      }, Infinity);

      // Keep track of the closest route
      if (distanceToRoute < minDistance) {
        minDistance = distanceToRoute;
        closestRouteIndex = index;
      }
    });

    // Only update the route if a different route is selected
    if (closestRouteIndex !== selectedRouteIndex) {
      selectedRouteIndex = closestRouteIndex;
      const routeData = routes[selectedRouteIndex].geometry;
      map.getSource('route').setData(routeData);
    }
  });
  
  // Clean up the map instance when the component unmounts
  return () => map.remove();
},[longitude, latitude, endLongitude, endLatitude, pro.name]);
     
return <div className='overflow-hidden   md:h-96 sm:h-56 h-52 w-full' ref={mapContainerRef} />
  
}
export default ViewMap