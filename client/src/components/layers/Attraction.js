import { Button, Dialog, Slide, Stack, Typography } from '@mui/material'
import React, { forwardRef } from 'react'
import {Close} from '@mui/icons-material'
const Transition = forwardRef((props, ref) => {
    return <Slide direction="up" {...props} ref={ref} />;
  });
function Attraction({attraction, setAttraction}) {
  let address = attraction?.properties['address']
  if(typeof address === "string") {
    address = address.replaceAll('<p>', '')
    address = address.replaceAll('</p>', '')
    console.log(address)
  }
  let admission = attraction?.properties['admission']
  if(typeof admission === "string") {
    admission = admission.replaceAll('<p>', '')
    admission = admission.replaceAll('</p>', '')
    console.log(admission)
  }
  let description = attraction?.properties['description']
  if(typeof description === "string") {
    description = description.replaceAll('<p>', '')
    description = description.replaceAll('</p>', '')
    console.log(description)
  }
  let email = attraction?.properties['email']
  if(typeof email === "string") {
    email = email.replaceAll('<p>', '')
    email = email.replaceAll('</p>', '')
    console.log(email)
  }
  let website = attraction?.properties['website']
  if(typeof website === "string") {
    website = website.replaceAll('<p>', '')
    website = website.replaceAll('</p>', '')
    console.log(website)
  }
  let telephone = attraction?.properties['telephone']
  if(typeof telephone === "string") {
    telephone = telephone.replaceAll('<p>', '')
    telephone = telephone.replaceAll('</p>', '')
    console.log(telephone)
  }
    const handleClose = () => {
        // dispatch({ type: 'UPDATE_ROOM', payload: null });
        setAttraction(null)
      };
  return (
    <Dialog fullScreen
    open={Boolean(attraction)}
    onClose={handleClose}
    TransitionComponent={Transition}
    sx={{zIndex: 10001}}>

        <Stack>
        <Button sx={{mt: "25px"}} endIcon={<Close />} color="inherit" onClick={handleClose}>
            Exit
          </Button>
            <Typography variant="h3" component ='span' align='center'>{attraction?.properties['name']}</Typography>
            
            {description !== "{}" && (<><Typography variant="h2" component ='span' align='center'>Description</Typography><Typography variant="p" component ='span' align='center'>{description}</Typography></>)}
            <br></br>
            {admission !== "{}" && <Typography variant="p" component="span" align='left'>Admission: {admission}</Typography>}
            <br></br>
            {address !== "{}" && <Typography variant="p" component="span" align='left'>Address: {address}</Typography>}
            {website !== "{}" && <Typography variant="p" component="span" align='left'>Website: {website}</Typography>}
            {email !== "{}" && <Typography variant="p" component="span" align='left'>Email: {email}</Typography>}
            {telephone !== "{}" && <Typography variant="p" component="span" align='left'>Telephone: {telephone}</Typography>}
        </Stack>
    </Dialog>
    
  )
  
}

export default Attraction