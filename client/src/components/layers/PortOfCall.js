import { Button, Dialog, Slide, Stack, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import {Close} from '@mui/icons-material'
const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });
function PortOfCall({poc, setPOC}) {
    let contact = poc?.properties['contact']
      if(typeof contact === "string") {
        contact = contact.replaceAll('<p>', '')
        contact = contact.replaceAll('</p>', '')
        console.log(contact)
      }
      let overview = poc?.properties['overview']
      if(typeof overview === "string") {
        overview = overview.replaceAll('<p>', '')
        overview = overview.replaceAll('</p>', '')
        console.log(overview)
      }
      let excursion1 = poc?.properties['excursion1']
      if(typeof excursion1 === "string") {
        excursion1 = excursion1.replaceAll('<p>', '')
        excursion1 = excursion1.replaceAll('</p>', '')
        console.log(excursion1)
      }
      let excursion2 = poc?.properties['excursion2']
      if(typeof excursion2 === "string") {
        excursion2 = excursion2.replaceAll('<p>', '')
        excursion2 = excursion2.replaceAll('</p>', '')
        console.log(excursion2)
      }
      let excursion3 = poc?.properties['excursion3']
      if(typeof excursion3 === "string") {
        excursion3 = excursion3.replaceAll('<p>', '')
        excursion3 = excursion3.replaceAll('</p>', '')
        console.log(excursion3)
      }
      let excursion4 = poc?.properties['excursion4']
      if(typeof excursion4 === "string") {
        excursion4 = excursion4.replaceAll('<p>', '')
        excursion4 = excursion4.replaceAll('</p>', '')
        console.log(excursion4)
      }
      let excursion5 = poc?.properties['excursion5']
      if(typeof excursion5 === "string") {
        excursion5 = excursion5.replaceAll('<p>', '')
        excursion5 = excursion5.replaceAll('</p>', '')
        console.log(excursion5)
      }
      let restaurant1 = poc?.properties['restaurant1']
      if(typeof restaurant1 === "string") {
        restaurant1 = restaurant1.replaceAll('<p>', '')
        restaurant1 = restaurant1.replaceAll('</p>', '')
        console.log(restaurant1)
      }
      let restaurant2 = poc?.properties['restaurant2']
      if(typeof restaurant2 === "string") {
        restaurant2 = restaurant2.replaceAll('<p>', '')
        restaurant2 = restaurant2.replaceAll('</p>', '')
        console.log(restaurant2)
      }
      let restaurant3 = poc?.properties['restaurant3']
      if(typeof restaurant3 === "string") {
        restaurant3 = restaurant3.replaceAll('<p>', '')
        restaurant3 = restaurant3.replaceAll('</p>', '')
        console.log(restaurant3)
      }
      let shopping = poc?.properties['shopping']
      if(typeof shopping === "string") {
        shopping = shopping.replaceAll('<p>', '')
        shopping = shopping.replaceAll('</p>', '')
        console.log(shopping)
      }
    const handleClose = () => {
        // dispatch({ type: 'UPDATE_ROOM', payload: null });
        setPOC(null)
      };
  return (
    <Dialog fullScreen
    open={Boolean(poc)}
    onClose={handleClose}
    TransitionComponent={Transition}
    sx={{zIndex: 10001}}>

        <Stack>
        <Button sx={{mt: "25px"}} endIcon={<Close />} color="inherit" onClick={handleClose}>
            Exit
          </Button>
            <Typography variant="h3" component ='span' align='center'>{poc?.properties['name']}</Typography>
            <Typography variant="h2" component ='span' align='center'>contact</Typography>
            <Typography variant="p" component ='span' align='center'>{contact}</Typography>
            <Typography variant="h2" component ='span' align='center'>Overview</Typography>
            <Typography variant="p" component ='span' align='center'>{overview}</Typography>
            {/* <Typography variant="h2" component ='span' align='center'>Overview</Typography> */}
            <Typography variant="p" component ='span' align='left'>Excursion1: {excursion1}</Typography>
            <Typography variant="p" component ='span' align='left'>Excursion2: {excursion2}</Typography>
            <Typography variant="p" component ='span' align='left'>Excursion3: {excursion3}</Typography>
            <Typography variant="p" component ='span' align='left'>Excursion4: {excursion4}</Typography>
            <Typography variant="p" component ='span' align='left'>Excursion5: {excursion5}</Typography>
            <Typography variant="p" component ='span' align='left'>Restaurant1: {restaurant1}</Typography>
            <Typography variant="p" component ='span' align='left'>Restaurant2: {restaurant2}</Typography>
            <Typography variant="p" component ='span' align='left'>Restaurant3: {restaurant3}</Typography>
            <Typography variant="h2" component ='span' align='center'>Shopping</Typography>
            <Typography variant="p" component ='span' align='left'>{shopping}</Typography>

            {poc?.properties?.photo_path !== "{}" && <img style={{width:"100px", height: "100px", position:'absolute', top: 0, left: 0}}src={poc?.properties?.photo_path} alt=""></img>}
        </Stack>
    </Dialog>
    
  )
  
}

export default PortOfCall