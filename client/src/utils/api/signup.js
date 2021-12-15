import axios from 'axios';

export const getEmailValidation = ( endpoint, params ) => {
  // const SERVER = process.env.REACT_APP_SERVER || "http://localhost:80";
  const SERVER = "http://localhost:80/";
  const query = `?email=${params}`;
  return axios.get(
    SERVER + endpoint + query, 
    { withCredentials : true }
  )
  .then(result => result.status)
  .catch( err => {
    return (err.response)
      ? err.response.status 
      : "Server disconnected"
  }) 
};

// response 형태
// {data: 'request on valid', status: 200, statusText: 'OK', headers: {…}, config: {…}, …}
// config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
// data: "request on valid"
// headers: {content-length: '16', content-type: 'text/html; charset=utf-8'}
// request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: true, upload: XMLHttpRequestUpload, …}
// status: 200
// statusText: "OK"