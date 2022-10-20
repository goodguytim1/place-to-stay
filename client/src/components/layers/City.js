import { Button, Dialog, Slide, Stack, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import {Close} from '@mui/icons-material'
const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });
function City({city, setCity}) {
    let overview = city?.properties['overview']
    if(typeof overview === "string") {
      overview = overview.replaceAll('<p>', '')
      overview = overview.replaceAll('</p>', '')
      console.log(overview)
    }
    let nightlife = city?.properties['nightlife']
    if(typeof nightlife === "string") {
      nightlife = nightlife.replaceAll('<p>', '')
      nightlife = nightlife.replaceAll('</p>', '')
      console.log(nightlife)
    }
    let climate_info = city?.properties['climate_info']
    if(typeof climate_info === "string") {
      climate_info = climate_info.replaceAll('<p>', '')
      climate_info = climate_info.replaceAll('</p>', '')
      console.log(climate_info)
    }
    let getting_around = city?.properties['getting_around']
    if(typeof getting_around === "string") {
      getting_around = getting_around.replaceAll('<p>', '')
      getting_around = getting_around.replaceAll('</p>', '')
      console.log(getting_around)
    }
    let kids_attractions_overview = city?.properties['kids_attractions_overview']
    if(typeof kids_attractions_overview === "string") {
      kids_attractions_overview = kids_attractions_overview.replaceAll('<p>', '')
      kids_attractions_overview = kids_attractions_overview.replaceAll('</p>', '')
      console.log(kids_attractions_overview)
    }
    let restaurant_overview = city?.properties['restaurant_overview']
    if(typeof restaurant_overview === "string") {
      restaurant_overview = restaurant_overview.replaceAll('<p>', '')
      restaurant_overview = restaurant_overview.replaceAll('</p>', '')
      console.log(restaurant_overview)
    }
    let shopping_overview = city?.properties['shopping_overview']
    if(typeof shopping_overview === "string") {
      shopping_overview = shopping_overview.replaceAll('<p>', '')
      shopping_overview = shopping_overview.replaceAll('</p>', '')
      console.log(shopping_overview)
    }
    let sightseeing_overview = city?.properties['sightseeing_overview']
    if(typeof sightseeing_overview === "string") {
      sightseeing_overview = sightseeing_overview.replaceAll('<p>', '')
      sightseeing_overview = sightseeing_overview.replaceAll('</p>', '')
      console.log(sightseeing_overview)
    }
    const handleClose = () => {
        // dispatch({ type: 'UPDATE_ROOM', payload: null });
        setCity(null)
      };
  return (
    <Dialog fullScreen
    open={Boolean(city)}
    onClose={handleClose}
    TransitionComponent={Transition}
    sx={{zIndex: 10001}}>

        <Stack>
        <Button sx={{mt: "25px"}} endIcon={<Close />} color="inherit" onClick={handleClose}>
            Exit
          </Button>
            <Typography variant="h3" component ='span' align='center'>{city?.properties['name']}</Typography>
            {city?.properties?.photo_path !== "{}" && <img style={{width:"100px", height: "100px", position: "absolute", left: 0, top: 0}}src={city?.properties?.photo_path} alt=""></img>}
            {overview !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Overview</Typography><Typography variant="p" component ='span' align='center'>{overview}</Typography></>)}
            {nightlife !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Nightlife</Typography><Typography variant="p" component ='span' align='center'>{nightlife}</Typography></>)}
            {climate_info !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Climate Info</Typography><Typography variant="p" component ='span' align='center'>{climate_info}</Typography></>)}
            {getting_around !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Getting Around</Typography><Typography variant="p" component ='span' align='center'>{getting_around}</Typography></>)}
            {kids_attractions_overview !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Kids Attractions</Typography><Typography variant="p" component ='span' align='center'>{kids_attractions_overview}</Typography></>)}
            {restaurant_overview !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Restaurants</Typography><Typography variant="p" component ='span' align='center'>{restaurant_overview}</Typography></>)}
            {shopping_overview !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Shopping</Typography><Typography variant="p" component ='span' align='center'>{shopping_overview}</Typography></>)}
            {sightseeing_overview !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Sightseeing</Typography><Typography variant="p" component ='span' align='center'>{sightseeing_overview}</Typography></>)}
        </Stack>
    </Dialog>
    
  )
  
}

export default City