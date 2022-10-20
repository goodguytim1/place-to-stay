import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import { TextField } from '@mui/material';



export default function VirtualList({map, renderedLayer}) {
    let label = "Filter "+ renderedLayer
    const [filter, setFilter] = React.useState('')
    const [features, setFeatures] = React.useState([])
   
    // console.log(map?.current?.querySourceFeatures('composite', {
    //   'sourceLayer': 'destinations'
    // }))
    // let features = map?.current?.querySourceFeatures('composite', {
    //     'sourceLayer': 'destinations'
    //   })

    function checkDuplicates() {
        let temp = features.map(f=>f)
        let map = {}
        for(let t of temp){
            if(map[t.properties['/Destination/name']]) {
                temp = temp.filter(t2 => t2 !== t)
            }
            map[t.properties['/Destination/name']] = true
        }
        setFeatures(temp)
    }
    function removeDuplicateKeyFromArray(arrayOfObjects){
        let keyHolder = {}
        arrayOfObjects = arrayOfObjects.filter((obj)=>{
            if(keyHolder[obj.properties['name']]){
                
               return false 
             }
            keyHolder[obj.properties['name']] = 1 //or true
            return true
          })
          console.log(arrayOfObjects)
          setFeatures(arrayOfObjects)
          console.log(keyHolder)
      }
      function removeDuplicateKeyFromArrayForDesinations(arrayOfObjects){
        let keyHolder = {}
        arrayOfObjects = arrayOfObjects.filter((obj)=>{
            if(keyHolder[obj.properties['/Destination/name']]){
                
               return false 
             }
            keyHolder[obj.properties['/Destination/name']] = 1 //or true
            return true
          })
          console.log(arrayOfObjects)
          setFeatures(arrayOfObjects)
          console.log(keyHolder)
      }
      React.useEffect(() => {
        //checkDu
        // let temp = map?.current?.querySourceFeatures('composite', {
        //     'sourceLayer': 'destinations'
        //   }).filter(((feature) => feature.properties['/Destination/name'].includes(filter)))
          // console.log(temp)
          // if(filter !== '')
          let temp
          console.log(map?.current?.querySourceFeatures('composite',
          {'sourceLayer': renderedLayer}
        ).filter(feature => feature.properties['/Destination/name'] === "Turin Ski Region"))
          if(filter === '') {
            temp= map?.current?.querySourceFeatures('composite',
            {'sourceLayer': renderedLayer}
          )
          }else {
            if(renderedLayer === 'destinations'){
              temp = map?.current?.querySourceFeatures('composite',
            {'sourceLayer': renderedLayer}
          ).filter(((feature) => feature.properties['/Destination/name'].includes(filter)))
            } else{
              temp = map?.current?.querySourceFeatures('composite',
            {'sourceLayer': renderedLayer}
          ).filter(((feature) => feature.properties['name'].includes(filter)))
            }
            

          }
        //   console.log(map?.current?.querySourceFeatures('composite',
        //   {'sourceLayer': 'cities'}
        // ))
          console.log(temp)
          setFeatures(temp)
          if(renderedLayer === 'destinations') {
            removeDuplicateKeyFromArrayForDesinations(temp)
          }else {
            removeDuplicateKeyFromArray(temp)
          }
          
        //   for(let t of temp) {
        //     console.log(t)
        //   }
        //   setFeatures(temp)
        // setFeatures(map?.current?.querySourceFeatures('composite', {
        //     'sourceLayer': 'destinations'
        //   }).filter(((feature) => feature.properties['/Destination/name'].includes(filter)))

        //      )
        // features = features.filter((feature) => feature.properties['/Destination/name'].includes(filter))
    }, [filter])

    React.useEffect(() => {
        console.log(features)
        // checkDuplicates()
    }, [features])
    function renderRow(props) {
        const { index, style } = props;
          //console.log(features)
         // console.log(`${features[index]?.properties['/Destination/name']}`)
        //  console.log(features[index]?.properties)
        //  console.log(renderedLayer)
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={()=>{
                map?.current?.flyTo({center: [features[index]?.geometry?.coordinates[0], features[index]?.geometry?.coordinates[1]], zoom: 5})
                
            }}>
                {/* {features.length > 0 && console.log(features[index].properties)} */}
                {renderedLayer === 'destinations' ? <ListItemText primary={`${features[index]?.properties['/Destination/name']}`} /> : <ListItemText primary={`${features[index]?.properties['name']}`} /> }
                
            </ListItemButton>
          </ListItem>
        );
      }
  return (
    <>
    {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
<TextField id="filled-basic" label="Filled" variant="filled" /> */}
<Box sx={{ width: '100%' }} >
    <TextField sx= {{zIndex: 2, width: '100%'}}id="standard-basic" label={label} variant="standard" onChange={(e) =>{setFilter(e.target.value)}}/>
    </Box>

    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
        {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
<TextField id="filled-basic" label="Filled" variant="filled" /> */}

      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={features?.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
    </>
    
  );
}
