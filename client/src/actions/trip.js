import deleteImages from './utils/deleteImages';
import fetchData from './utils/fetchData';

const url = process.env.REACT_APP_SERVER_URL + '/trip';

export const createTrip = async (trip, currentUser, dispatch, allTrips) => {
    dispatch({ type: 'START_LOADING' });
  
    const result = await fetchData(
      { url, body: trip, token: currentUser?.token },
      dispatch
    );
    if (result) {
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'success',
          message: 'The trip has been added successfully',
        },
      });
      clearTrip(dispatch, currentUser);
      dispatch({ type: 'UPDATE_SECTION', payload: 0 });
      dispatch({ type: 'UPDATE_ALL_TRIPS', payload: [...allTrips, result] });
    }
  
    dispatch({ type: 'END_LOADING' });
  };

  export const getTrips = async (dispatch) => {
    const result = await fetchData({ url, method: 'GET' }, dispatch);
    if (result) {
        // console.log(result)
       // return result
        dispatch({ type: 'UPDATE_ALL_TRIPS', payload: result });
    }
  };


  export const getUserTrips = async(dispatch, currentUser) => {
    const result = await fetchData({ url, method: 'GET' }, dispatch);
    if(result){
      // console.log(result)
      // console.log(currentUser)
      dispatch({type: 'UPDATE_ALL_TRIPS', payload: result.filter(res => res.uid === currentUser.id)})
    }
  }

  export const clearTrip = (
    dispatch,
    currentUser,
    images = [],
    updatedRoom = []
  ) => {
    dispatch({ type: 'UPDATE_TRIP', payload: updatedRoom});
    dispatch({type:"UPDATE_ADDING_TRIP", payload: false})
    dispatch({type: "UPDATE_STOP", payload: null})
    localStorage.removeItem(currentUser.id);
    // if (updatedRoom) {
    //   deleteImages(images, updatedRoom.uid);
    // } else {
    //   deleteImages(images, currentUser.id);
    // }
  };