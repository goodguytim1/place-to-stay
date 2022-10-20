import { Button, Dialog, Slide, Stack, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import {Close} from '@mui/icons-material'
const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });
function Airport({airport, setAirport}) {
    let airport_facilities = airport?.properties['airport_facilities']
    if(typeof airport_facilities === "string") {
      airport_facilities = airport_facilities.replaceAll('<p>', '')
      airport_facilities = airport_facilities.replaceAll('</p>', '')
      console.log(airport_facilities)
    }
    let car_parking = airport?.properties['car_parking']
    if(typeof car_parking === "string") {
      car_parking = car_parking.replaceAll('<p>', '')
      car_parking = car_parking.replaceAll('</p>', '')
      console.log(car_parking)
    }
    let car_rental = airport?.properties['car_rental']
    if(typeof car_rental === "string") {
      car_rental = car_rental.replaceAll('<p>', '')
      car_rental = car_rental.replaceAll('</p>', '')
      console.log(car_rental)
    }
    let contacts = airport?.properties['contacts']
    if(typeof contacts === "string") {
      contacts = contacts.replaceAll('<p>', '')
      contacts = contacts.replaceAll('</p>', '')
      console.log(contacts)
    }
    let location = airport?.properties['location']
    if(typeof location === "string") {
      location = location.replaceAll('<p>', '')
      location = location.replaceAll('</p>', '')
      console.log(location)
    }
    let taxi = airport?.properties['taxi']
    if(typeof taxi === "string") {
      taxi = taxi.replaceAll('<p>', '')
      taxi = taxi.replaceAll('</p>', '')
      console.log(taxi)
    }
    let transfer_city = airport?.properties['transfer_city']
    if(typeof transfer_city === "string") {
      transfer_city = transfer_city.replaceAll('<p>', '')
      transfer_city = transfer_city.replaceAll('</p>', '')
      console.log(transfer_city)
    }
    let transfer_terminals = airport?.properties['transfer_terminals']
    if(typeof transfer_terminals === "string") {
      transfer_terminals = transfer_terminals.replaceAll('<p>', '')
      transfer_terminals = transfer_terminals.replaceAll('</p>', '')
      console.log(transfer_terminals)
    }
    const handleClose = () => {
        // dispatch({ type: 'UPDATE_ROOM', payload: null });
        setAirport(null)
      };
  return (
    <Dialog fullScreen
    open={Boolean(airport)}
    onClose={handleClose}
    TransitionComponent={Transition}
    sx={{zIndex: 10001}}>

        <Stack>
        <Button sx={{mt: "25px"}} endIcon={<Close />} color="inherit" onClick={handleClose}>
            Exit
          </Button>
            <Typography variant="h3" component ='span' align='center'>{airport?.properties?.full_name}</Typography>
            {contacts !== "{}" && <Typography variant="p" component="span" align="left">Contacts: {contacts}</Typography>}
            {location !== "{}" && <Typography variant="p" component="span" align="left">Location: {location}</Typography>}
            {airport_facilities !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Airport Facilities</Typography><Typography variant="p" component ='span' align='center'>{airport_facilities}</Typography></>)}
            {car_parking !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Car Parking</Typography><Typography variant="p" component ='span' align='center'>{car_parking}</Typography></>)}
            {car_rental !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Car Rental</Typography><Typography variant="p" component ='span' align='center'>{car_rental}</Typography></>)}
            {taxi !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Taxi</Typography><Typography variant="p" component ='span' align='center'>{taxi}</Typography></>)}
            {transfer_city !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Transfer City</Typography><Typography variant="p" component ='span' align='center'>{transfer_city}</Typography></>)}
            {transfer_terminals !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Transfer Terminals</Typography><Typography variant="p" component ='span' align='center'>{transfer_terminals}</Typography></>)}
        </Stack>
    </Dialog>
    
  )
}

export default Airport