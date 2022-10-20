import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Avatar } from '@mui/material';

function ReadOnlyRating({rating, properties, currentUser}) {
    // console.log(rating)
    // console.log(currentUser)
  return (
    <>
    <Typography component="legend">{properties?.name || properties?.["/Destination/name"]}</Typography>
    {currentUser?.name  && <Typography component="legend">Rated by: {currentUser?.name}</Typography> }
    {currentUser && <Avatar src={currentUser?.photoURL} alt={currentUser?.name}>
            {currentUser?.name?.charAt(0).toUpperCase()}
          </Avatar>}
      <Rating precision={0.5} name={properties?.name || properties?.["/Destination/name"]} value={Number(rating)} readOnly />
      </>
  )
}

export default ReadOnlyRating