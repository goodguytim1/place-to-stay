import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { forwardRef, useEffect, useState } from 'react';
import { useValue } from '../../context/ContextProvider';
import { Close, StarBorder } from '@mui/icons-material';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectCoverflow, Lazy, Zoom } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/lazy';
import 'swiper/css/zoom';
import './swiper.css';

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" {...props} ref={ref} />;
});

const Stop = ({map}) => {
  const {
    state: { stop, trip},
    dispatch,
  } = useValue();
  const [exp, setExp] = useState("")
  const [rating, setRating] = useState(-1)
  //console.log(map?.current)
  useEffect(() =>{
    console.log(rating)
  }, [rating])

  // useEffect(() => {
  //   if (stop) {
  //     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${stop.lng},${stop.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => setPlace(data.features[0]));
  //   }
  // }, [stop]);

  const handleClose = () => {
    dispatch({ type: 'UPDATE_STOP', payload: null });
  };
  return (
    <Dialog
      fullScreen
      open={Boolean(stop)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {stop?.properties?.name || stop?.properties?.['/Destination/name']}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
     
        <Stack sx={{ p: 3 }} spacing={2}>
          {/* <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >

          
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >

          </Stack> */}
          <Stack>
            {/* <Typography variant="h6" component="span">
              {'Add Personal Experience: '}
            </Typography>
            
            <TextField
          id="outlined-textarea"
          label="Multiline Placeholder"
          placeholder="Please add anything you would like to say about this stop..."
          multiline
          onChange={(e) =>{setExp(e.target.value)}}
        /> */}
          <Box 
              sx={{
                display: 'flex',
                alignItems: 'center',
                mt: 5,
                mb: 5
              }}
            >
              <Typography variant="h6" component="span">
                {'Set Rating: '}
              </Typography>
              <Rating
                name="stop-ratings"
                defaultValue={0}
                precision={0.5}
                emptyIcon={<StarBorder />}
                onChange={(e) =>{setRating(e.target.value)}}
              />
            </Box>

            <Button variant="outlined" onClick={() =>{
              if(rating < 0){ //exp === "" || 
                dispatch({type: "UPDATE_ALERT", payload: {
                  open: true,
                  severity: 'error',
                  message: 'Please make sure to add your experience and a rating!',
                }})
              }else {
                let pointCoords = map.current.getSource("points")._data.features
        let newPointCoords
        
        if(pointCoords.length === 0){
          newPointCoords = [stop]
        }else {
          newPointCoords = [...pointCoords, stop]
        }
       
        map.current.getSource("points").setData({
          type: 'FeatureCollection',
          features: [...newPointCoords]
        })

            let coords
          if(map.current.getSource("route")?._data?.data === undefined) {
            coords = map.current.getSource("route")._data?.geometry?.coordinates
          }
          else {
            coords = map.current.getSource("route")._data?.data?.geometry?.coordinates
          }
          let newCoord = stop?.geometry?.coordinates
          // console.log(newCoord)
          
          // if(coords === undefined) {
            map.current.getSource("route").setData({
             
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: [...coords, [newCoord[0], newCoord[1]]]
                }
              
            })
            stop.properties.rating = rating
        
                if(trip.length === 0) {
                  dispatch({type: "UPDATE_TRIP", payload: [stop]})
                }else{
                  dispatch({type: "UPDATE_TRIP", payload: [...trip, stop]})
                }
                
                dispatch({type: "UPDATE_STOP", payload: null})
                dispatch({type: "UPDATE_ALERT", payload: {
                  open: true,
                  severity: 'success',
                  message: 'Successfully added stop',
                }})
              }
              
            }}> Submit Stop</Button>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default Stop;
