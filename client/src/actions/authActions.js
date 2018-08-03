import { GET_ERRORS , SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
//Register
export const registerUser = (userData , history) => dispatch => {
  // return {
  //   type: TEST_DISPATCH,
  //   payload: userData

  // }
  axios.post('/api/users/register', userData)
          .then( res => {
           history.push('/login')
          })
          .catch(err => 
            dispatch({
              type: GET_ERRORS, 
              payload: err.response.data
            })
          );
}

//Login = Get User Token
export const loginUser = (userData) => dispatch => {   
  axios.post('/api/users/login' , userData)
        .then(res => {
          //Save to localStorage
          const { token } = res.data; 

          //set token to ls
          localStorage.setItem('jwtToken', token);

          //set token to Auth header
          setAuthToken(token);
          //Decode token to get user data
          const decoded = jwt_decode(token);
          // set Current user
          dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
          dispatch({
            type: GET_ERRORS, 
            payload: err.response.data
          })
        );
};

// set logged in user 
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER, 
    payload: decoded 
  }
}

//Log user out
export const logoutUser = () => dispath => {
  //Remove token from localstorage
  localStorage.removeItem('jtwToken');

  //Remove auth header for future requests
  setAuthToken(false);
  
  //set current user to {} which will set is Authenticated to false
  dispath(setCurrentUser({}));
}