import { Button, Dialog, Divider, Slide, Stack, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import {Close} from '@mui/icons-material'
const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });
function Resort({resort, setResort}) {

    const handleClose = () => {
        // dispatch({ type: 'UPDATE_ROOM', payload: null });
        setResort(null)
      };
      let overview = resort?.properties['overview']
      if(typeof overview === "string") {
        overview = overview.replaceAll('<p>', '')
        overview = overview.replaceAll('</p>', '')
        console.log(overview)
      }
      let activities = resort?.properties['activities']
      if(typeof activities === "string") {
        activities = activities.replaceAll('<p>', '')
        activities = activities.replaceAll('</p>', '')
        console.log(activities)
      }
      let restaurants = resort?.properties['restaurants']
      if(typeof restaurants === "string") {
        restaurants = restaurants.replaceAll('<p>', '')
        restaurants = restaurants.replaceAll('</p>', '')
        console.log(restaurants)
      }
      let shopping = resort?.properties['shopping']
      if(typeof shopping === "string") {
        shopping = shopping.replaceAll('<p>', '')
        shopping = shopping.replaceAll('</p>', '')
        console.log(shopping)
      }
      let nightlife = resort?.properties['nightlife']
      if(typeof nightlife === "string") {
        nightlife = nightlife.replaceAll('<p>', '')
        nightlife = nightlife.replaceAll('</p>', '')
        console.log(nightlife)
      }
      let skiing = resort?.properties['skiing']
      if(typeof skiing === "string") {
        skiing = skiing.replaceAll('<p>', '')
        skiing = skiing.replaceAll('</p>', '')
        console.log(skiing)
      }
      let negatives = resort?.properties['negatives']
      if(typeof negatives === "string") {
        negatives = negatives.replace('<p>', '')
        negatives = negatives.replace('</p>', '')
        console.log(negatives)
      }
      
  return (
    <Dialog fullScreen
    open={Boolean(resort)}
    onClose={handleClose}
    TransitionComponent={Transition}
    sx={{zIndex: 10001}}>

        <Stack >
        <Button sx={{mt: "25px"}} endIcon={<Close />} color="inherit" onClick={handleClose}>
            Exit
          </Button>
            <Typography variant="h3" component ='span' align='center'>{resort?.properties['name']}</Typography>
            <Divider/>
            <Typography variant="h2" component ='span' align='center'>Overview</Typography>
            <Typography variant="p" component ='span' align='center'>{overview}</Typography>
            <Typography variant="h2" component ='span' align='center'>Activities</Typography>
            <Typography variant="p" component ='span' align='center'>{activities}</Typography>
            <Typography variant="h2" component ='span' align='center'>Restaurants</Typography>
            <Typography variant="p" component ='span' align='center'>{restaurants}</Typography>
            <Typography variant="h2" component ='span' align='center'>Shopping</Typography>
            <Typography variant="p" component ='span' align='center'>{shopping}</Typography>
            <Typography variant="h2" component ='span' align='center'>Nightlife</Typography>
            <Typography variant="p" component ='span' align='center'>{nightlife}</Typography>
            { skiing !== '{}' && (<><Typography variant="h2" component ='span' align='center'>Skiing</Typography>
            <Typography variant="p" component ='span' align='center'>{skiing}</Typography></>)}
            <Typography variant="h2" component ='span' align='center'>Negatives</Typography>
            <Typography variant="p" component ='span' align='center'>{activities}</Typography>
            <img style={{width:"100px", height: "100px", position:'absolute', left: 0, top: 0}}src={resort?.properties?.photo_path} alt=""></img>
        </Stack>
    </Dialog>
    
  )
  
}

export default Resort