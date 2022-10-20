import React, { useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import DraggableVirtualList from '../layers/DraggableVirtualList';
import Airport from '../layers/Airport';
import Attraction from '../layers/Attraction';
import Resort from '../layers/Resort';
import City from '../layers/City';
import PortOfCall from '../layers/PortOfCall';
import { Divider } from '@mui/material';
import AddStop from './AddStop'
import {useValue} from '../../context/ContextProvider'
import './NewMap.css'
import Room from '../rooms/Room';
import Stop from '../stops/Stop';
import { createTrip, getTrips, getUserTrips } from '../../actions/trip';
import ReadOnlyRating from './ReadOnlyRating';
// import DraggableVirtualList from './DraggableVirtualList'
// import Draggables from './Draggables'
mapboxgl.accessToken = 'pk.eyJ1IjoiZ29vZGd1eXRpbSIsImEiOiJja3lhZWxqczYwNHJ4Mm5rNDUzdjZoanFoIn0.t0AEwSp7aMv3iW-pDGj6aw';

function NewMap() {
  const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-70.9);
const [lat, setLat] = useState(42.35);
const [zoom, setZoom] = useState(0);
const [airport, setAirport] = useState(null)
const [attraction, setAttraction] = useState(null)
const [resort, setResort] = useState(null)
const [city, setCity] = useState(null)
const [poc, setPOC] = useState(null)
// const [attractions, setAttractions] = useState(false)
// const [features, setFeatures] = useState([])
const [visibleCities, setVisibleCities] = useState(false)
const [visibleAttractions, setVisibleAttractions] = useState(false)
const [visiblePOC, setVisiblePOC] = useState(false)
const [visibleAirports, setVisibleAirports] = useState(false)
const [visibleResorts, setVisibleResorts] = useState(false)
const [visibleDestinations, setVisibleDestinations] = useState(false)
//const [addingTrip, setAddingTrip] = useState(false)
//const [addingStop, setAddingStop] = useState(false)
//const [trip, setTrip] = useState({})
//const [allTrips, setAllTrips] = useState([])
const {state: {currentUser, addingStop, stop, trip, addingTrip, allTrips}, dispatch} = useValue()
const popupRef = useRef(new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
  }))

  
   
//console.log(addingStop)
useEffect(() => {
  //dispatch({type: "UPDATE_ALL_TRIPS", getTrips})\
  //console.log(getTrips(dispatch))
  getTrips(dispatch)
  dispatch({type: "UPDATE_ADDING_TRIP", payload: false})
  
},[currentUser,dispatch])

useEffect(() => {
  //dispatch({type: "UPDATE_ALL_TRIPS", payload: allTrips.filter((el) => el.uid === currentUser.uid)})
}, [allTrips])

useEffect(() => {
  if(!visibleCities){
    map?.current?.setLayoutProperty("cities", 'visibility', 'none')
  }else{
    map?.current?.setLayoutProperty("cities", 'visibility', 'visible')
  }
  if(!visibleAirports){
    map?.current?.setLayoutProperty("airports", 'visibility', 'none')
  }else{
    map?.current?.setLayoutProperty("airports", 'visibility', 'visible')
  }
  if(!visibleDestinations){
    map?.current?.setLayoutProperty("destinations", 'visibility', 'none')
  }else{
    map?.current?.setLayoutProperty("destinations", 'visibility', 'visible')
  }
  if(!visiblePOC){
    map?.current?.setLayoutProperty("ports-of-call", 'visibility', 'none')
  }else{
    map?.current?.setLayoutProperty("ports-of-call", 'visibility', 'visible')
  }
  if(!visibleAttractions){
    map?.current?.setLayoutProperty("attractions", 'visibility', 'none')
  }else{
    map?.current?.setLayoutProperty("attractions", 'visibility', 'visible')
  }
  if(!visibleResorts){
    map?.current?.setLayoutProperty("resorts", 'visibility', 'none')
  }else{
    map?.current?.setLayoutProperty("resorts", 'visibility', 'visible')
  }
},[visibleAirports, visibleAttractions, visibleCities, visibleDestinations, visiblePOC, visibleResorts])

useEffect(() =>{
  if(!map.current) {
    return
  }
  // allTrips?.forEach((element) => {
  //   // map.current.loadImage(element.uPhoto, (error, image)=>{
  //   //   if (error) throw error;
 
  //   // // Add the image to the map style.
  //   //   map.addImage(element.uid, image);
  //   // })
  //   map.current.addImage(element.uid, element.uPhoto)
  // })
  allTrips.forEach((el) => console.log(el.uid))
  //console.log()
  console.log(allTrips === allTrips.filter(el => el.uid === currentUser.uid))
  if(!addingTrip) {
    setVisibleAirports(false)
    setVisibleAttractions(false)
    setVisibleCities(false)
    setVisibleDestinations(false)
    setVisiblePOC(false)
    setVisibleResorts(false)
    try {
      map?.current?.removeLayer("points");
      map?.current?.removeSource("points");
      map?.current?.removeLayer("route")
      map?.current?.removeSource("route")
    } catch (error) {
      console.log(error.message)
    }
      
    
   
    console.log(allTrips)

      allTrips?.forEach((element, index) => {
        console.log(element)
        let route= []
        if(element?.stops?.length >1) {
          element.stops.forEach((feature, index) => {
            console.log(feature)
            route.push(feature.geometry.coordinates)
        })
        }
       console.log(element?.stops)
        var mapSource = map.current.getSource("points" + index)
        try {
          map?.current?.addSource('points' + index, {
            'type': 'geojson',
            'data': {
            'type': 'FeatureCollection',
            'features': element?.stops
            }
          });
          map?.current?.addLayer({
            'id': 'points' + index,
            'type': 'symbol',
            'source': 'points' + index,
            'layout': {
              'icon-image': 'custom-marker',
              'icon-size': .75,
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
            }
          });
    
          map?.current?.addSource('route' + index, {
            'type': 'geojson',
            'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
            'type': 'LineString',
            'coordinates': route
            }
            }
          });
          map?.current?.addLayer({
            'id': 'route' + index,
            'type': 'line',
            'source': 'route' + index,
            'layout': {
            'line-join': 'round',
            'line-cap': 'round'
            },
            'paint': {
            'line-color': '#888',
            'line-width': 8
            }
          });
        } catch (error) {
          console.log(error.message)
        }
       
  
  
       
      })

   
      console.log(allTrips)
      let sourceLayers = allTrips?.map((element, index) => 'points' + index)
      console.log(sourceLayers)
      map?.current?.on('mouseenter', sourceLayers, (e) => {
      // Change the cursor style as a UI indicator.
      map.current.getCanvas().style.cursor = 'pointer';
       
      // Copy coordinates array.
      const coordinates = e.features[0].geometry.coordinates.slice();
      const rating = e.features[0].properties.rating;
       
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
       
      // Populate the popup and set its coordinates
      // based on the feature found.
      // const placeholder = document.createElement('div');
      // ReactDOM.render(el, placeholder);
      //const popUpHTML = (<ReadOnlyRating {...{rating}}/>);
      const popupNode = document.createElement("div")
      const root = createRoot(popupNode)
      root.render(<ReadOnlyRating {...{rating, properties: e.features[0].properties, currentUser}}/>);
      popupRef.current
      .setLngLat(coordinates)
      .setDOMContent(popupNode)
      .addTo(map.current);
      });
       
      map?.current?.on('mouseleave', sourceLayers, () => {
      map.current.getCanvas().style.cursor = '';
      popupRef.current.remove();
      });
  }else {
    // Add a GeoJSON source with 2 points
    
    console.log(trip)
  
    if(map?.current?.getSource("points") === undefined || map?.current?.getSource("points") === null) {
      allTrips?.forEach((element, index) => {
        //console.log(element)
        map?.current?.removeLayer("points" + index)
        map?.current?.removeLayer("route" + index)
        map?.current?.removeSource("points" + index)
        map?.current?.removeSource("route" + index)
        
       
      })
      map?.current?.addSource('points', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': []
        }
        });
         
        // Add a symbol layer
        map?.current?.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
        'icon-image': 'custom-marker',
        'icon-size': .75,
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        'text-font': [
        'Open Sans Semibold',
        'Arial Unicode MS Bold'
        ],
        'text-offset': [0, 1.25],
        'text-anchor': 'top'
        }
        });
      map?.current?.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [ ]
        }
        }
        });
        map?.current?.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#888',
        'line-width': 8
        }
        });
    }
    else {
      console.log("Skipping and adding " + trip)
      console.log(trip)
      // let pointCoords = map.current.getSource("points")._data.features
      //   let newPointCoords
        
        
      //   newPointCoords = [...pointCoords, stop]
      //   map.current.getSource("points").setData({
      //     type: 'FeatureCollection',
      //     features: [...newPointCoords]
      //   })
      // map?.current?.getSource("points").setData({
      //   type: 'Feature Collection',
      //   features: trip
      // })
    }
  }
  //return () => map.current.remove()
}, [addingTrip, allTrips, trip])
// useEffect(() => {}, [

// ])

useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/goodguytim/cl8ejtfrl002e15s3bnpkimx2',
  center: [-87.661557, 41.893748],
      zoom: 3,
      pitch: 40
  // center: [lng, lat],
  // zoom: zoom
  });
  });
  

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    console.log("refresh")

    map.current.on('load', () => {

     
      
      // Add an image to use as a custom marker
      map.current.loadImage(
      'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
      (error, image) => {
      if (error) throw error;
      map.current.addImage('custom-marker', image);
      
      }
      );
    
      map.current.on('mouseenter', ['destinations', 'airports', 'attractions', 'ports-of-call', 'attractions', 'resorts', 'cities'], (e) => {
        // Change the cursor style as a UI indicator.
        map.current.getCanvas().style.cursor = 'pointer';

        });

         
        map.current.on('mouseleave', ['destinations', 'airports', 'attractions', 'ports-of-call', 'attractions', 'resorts', 'cities'], () => {
        map.current.getCanvas().style.cursor = '';
        // popup.remove();
        });
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
      map.current.on('click', (event) => {

       
       
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ['destinations', 'airports', 'attractions', 'ports-of-call', 'attractions', 'resorts', 'cities'] // replace with your layer name
        });
        if (!features.length) {
          return;
        }
        const feature = features[0];

       dispatch({type: "UPDATE_STOP", payload: feature})

        // let pointCoords = map.current.getSource("points")._data.features
        // let newPointCoords
        
        
        // newPointCoords = [...pointCoords, feature]
        // map.current.getSource("points").setData({
        //   type: 'FeatureCollection',
        //   features: [...newPointCoords]
        // })
        


        //   let coords
        //   if(map.current.getSource("route")?._data?.data === undefined) {
        //     coords = map.current.getSource("route")._data?.geometry?.coordinates
        //   }
        //   else {
        //     coords = map.current.getSource("route")._data?.data?.geometry?.coordinates
        //   }
        //   let newCoord = feature?.geometry?.coordinates
        //   // console.log(newCoord)
          
        //   // if(coords === undefined) {
        //     map.current.getSource("route").setData({
             
        //         type: 'Feature',
        //         properties: {},
        //         geometry: {
        //           type: 'LineString',
        //           coordinates: [...coords, [newCoord[0], newCoord[1]]]
        //         }
              
        //     })
        //   setTrip({points: map.current.getSource("points")._data.features, route: map.current.getSource("route")._data.geometry.coordinates})
                

        
        

      });
      });
      

    
        
    });
  return (
    <>

    <div className='wrapper'>
      {/* <AddStop/> */}
      <div className='sidebar'>
        {/* <Draggables/> */}
        {!addingTrip && (<button style={{zIndex:1000}} onClick={(e)=>{
          //setAddingTrip(true)
          dispatch({type:"UPDATE_ADDING_TRIP", payload: true})
        }}>
          Add Your Trip!
        </button>)} 
        {addingTrip && ( <>
        Welcome, thanks for adding a trip!
        
        <Divider/>
        <br/>
        Choose stops From a category:
       
        <Divider/>
        <br/>
        {visibleCities && <DraggableVirtualList {...{map, renderedLayer: 'cities'}}/>}
        {visibleAirports && <DraggableVirtualList {...{map, renderedLayer: 'airports'}}/>}
        {visiblePOC && <DraggableVirtualList {...{map, renderedLayer: 'ports_of_call'}}/>}
        {visibleAttractions && <DraggableVirtualList {...{map, renderedLayer: 'attractions'}}/>}
        {visibleResorts && <DraggableVirtualList {...{map, renderedLayer: 'resorts'}}/>}
        {visibleDestinations && <DraggableVirtualList {...{map, renderedLayer: 'destinations'}}/>} 
        <Airport {...{airport, setAirport}}/>
        <Attraction {...{attraction, setAttraction}}/>
        <Resort {...{resort, setResort}}/>
        <City {...{city, setCity}}/>
        <PortOfCall {...{poc, setPOC}} />
        <button style={{zIndex:1000}} onClick={(e) => {
          const clickedLayer = e.target.innerText
          e.preventDefault()
          e.stopPropagation()
          setVisibleCities(!visibleCities)
          
        }}>cities</button>
        <button style={{zIndex:1000}} onClick={(e) => {
          const clickedLayer = e.target.innerText
          e.preventDefault()
          e.stopPropagation()
          setVisibleAttractions(!visibleAttractions)
          
        }}>attractions</button>
        <button style={{zIndex:1000}} onClick={(e) => {
          const clickedLayer = e.target.innerText
          e.preventDefault()
          e.stopPropagation()
          setVisibleAirports(!visibleAirports)
          
        }}>airports</button>
        <button style={{zIndex:1000}} onClick={(e) => {
          const clickedLayer = e.target.innerText
          e.preventDefault()
          e.stopPropagation()
          setVisibleResorts(!visibleResorts)
          
        }}>resorts</button>
         <button style={{zIndex:1000}} onClick={(e) => {
          const clickedLayer = e.target.innerText
          e.preventDefault()
          e.stopPropagation()
          setVisibleDestinations(!visibleDestinations)
          
        }}>destinations</button>
        <Divider/>
        Then click markers to add stops!
        <br/>
        
       <br/>

       Submit when Done!
       <br/>
       <button style={{zIndex:1000}} onClick={(e) =>{
        //setAddingTrip(false);
        console.log(trip)
        if(trip.length === 0) {
          //setAllTrips([...allTrips, trip])
          
          dispatch({type:"UPDATE_ALERT", payload: {
            open: true,
            severity: 'error',
            message: 'Cannot add empty trip',
          }})
        }else {
          createTrip(trip, currentUser, dispatch, allTrips)
          // dispatch({type: "UPDATE_ALL_TRIPS", payload: [...allTrips, trip]})
          // dispatch({type:"UPDATE_ALERT", payload: {
          //   open: true,
          //   severity: 'success',
          //   message: 'Successfully added trip',
          // }})
        }
        dispatch({type: "UPDATE_TRIP", payload: []})
        dispatch({type:"UPDATE_ADDING_TRIP", payload: false})
       
        //setTrip({})
        }}>Done</button></>)}
        
        {/* lat: {lat} lng: {lng} zoom: {zoom} */}
      </div>
      <Stop {...{map}}/>
      <div ref={mapContainer} className="map-container" />
    </div>

    </>
  );
}

export default NewMap;
