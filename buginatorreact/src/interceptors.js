import axios from 'axios';

const interceptors = () => {

  // For GET requests
  axios.interceptors.request.use(
    (req) => {
      if (!req.headers.Authorization) {
        req.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
      }
      return req;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // For POST requests
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 401) {
        console.log('Unauthorized 2');
        window.location.href = "/";
      }
      return Promise.reject(err);
    }
  );



}

export default interceptors;
