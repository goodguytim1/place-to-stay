import { Close } from '@mui/icons-material';
import { AppBar, Box, Button, Dialog, Slide, Toolbar, Container } from '@mui/material'

import React from 'react'
import { forwardRef } from 'react';
//import { useValue } from '../context/ContextProvider';
import { useValue } from '../../context/ContextProvider';
import CustomizedRating from './CustomizedRating';

function AddStop() {

   const {state: {addingStop}, dispatch} = useValue()

    const handleClose = () => {
      //e.preventDefault()
      dispatch({type: "UPDATE_STOP", payload: null})
     //e.preventPropogation()
      //  setAddingStop(false)
      };
      const Transition = forwardRef((props, ref) => {
        return <Slide direction="up" {...props} ref={ref} />;
      });
  return (
    <> <Dialog
    fullScreen
    open={Boolean(addingStop)}
    onClose={handleClose}
    TransitionComponent={Transition}
    sx={{zIndex: 10001}}
  >
      <AppBar position="fixed" >
       
       <Toolbar>
        <Box sx={{flex:1, display: "flex", justifyContent:"flex-start", alignItems: "center"}}>
        
        {/* <Typography variant="h2" component="h3" align="center" sx={{ ml: 2, flex: 1, '@media (max-width:600px)': {
 fontSize: '1.5rem',
} }}>
           {trip?.title}
         </Typography> */}
        </Box>
        
         <Button endIcon={<Close />} color="inherit" position="absolute" sx={{top: 0, right: 0}}onClick={handleClose}>
           Exit
         </Button>
       </Toolbar>
     </AppBar>
     <Container  sx={{pl: "0px !important", pr: "0px !important", height: "100vh", maxWidth: "none !important", display: "flex", justifyContent: "center", alignItems: "center"}}>
     <CustomizedRating/>
    

    </Container>
     
    </Dialog></>
  )
}

export default AddStop