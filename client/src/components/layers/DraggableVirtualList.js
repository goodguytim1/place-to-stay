import { Box, Paper } from '@mui/material';
import VirtualList from './VirtualList';
import React from 'react';

import Draggable from 'react-draggable';

function DraggableVirtualList({map, renderedLayer}) {
    // console.log(data)
    // const eventLogger = (e: MouseEvent, data: Object) => {
    //     console.log('Event: ', e);
    //     console.log('Data: ', data);
    //   };
    // console.log(renderedLayer)
  return (
    <Draggable>
          <Paper sx={{position:'absolute', top: '50vh', left: '50vw'}}>
            <VirtualList {...{map, renderedLayer}}/>
          </Paper>
        </Draggable>
  )
}

export default DraggableVirtualList