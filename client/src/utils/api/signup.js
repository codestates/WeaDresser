import axios from 'axios';
require('dotenv').config();

export const getEmailValidation = ( endpoint, params ) => {
  //! dotenv
  const SERVER = process.env.REACT_APP_SERVER_URL 
  // || "http://localhost:80";
  // const SERVER = "http://localhost:80/";
  const query = `?email=${params}`;
  console.log(SERVER + endpoint+query)
  return axios.get(
    SERVER + endpoint + query,
    { withCredentials : true }
  )
  .then(result => result)
  .catch( err => {
    return (err.response)
      ? err.response.status 
      : "Server disconnected"
  }) 
};
