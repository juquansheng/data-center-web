import axios from "axios";
import { Modal } from "antd";
import { getToken } from "@/utils/token.ts";
import {
  logout
} from '@/store/action/auth.js';
import { useDispatch } from 'react-redux';

//create axios
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API, // api 的 base_url
  timeout: 5000, // request timeout
});


service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers.Authorization = getToken();
    
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);


service.interceptors.response.use(
  (response) => response,
   response => {
     const res = response.data
     if (res.code !== 20000) {
       Message({
         message: res.message,
         type: 'error',
         duration: 5 * 1000
       })
  
       if (res.code === 401) {
         // import { Message, MessageBox } from 'element-ui'
         MessageBox.confirm('You have been logged out because you have not operated for a long time. You can cancel staying on this page or log in again', 'Confirm logout?', {
           confirmButtonText: 'relogin',
           cancelButtonText: 'cancel',
           type: 'warning'
         }).then(() => {
           store.dispatch('FedLogOut').then(() => {
             location.reload()
           })
         })
       }
       return Promise.reject('error')
     } else {
       return response.data
     }
   },
  (error) => {
    console.log("err" + error); // for debug
    const { status } = error.response;
    const dispatch = useDispatch();
    if (status === 403) {
      Modal.confirm({
        title: "Confirm logout?",
        content:
          "You have been logged out because you haven't operated for a long time. You can cancel staying on this page or log in again",
        okText: "relogin",
        cancelText: "cancel",
        onOk() {
          let token = getToken();
          
          dispatch(logout(token));
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }
    return Promise.reject(error);
  }
);

export default service;
