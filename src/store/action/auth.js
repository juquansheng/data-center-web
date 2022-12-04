import { reqLogin, reqLogout } from "@/api/login";
import { reqUserInfo } from "@/api/user";
import { setToken, removeToken} from "@/utils/token.ts";
import {
  setUserInfo,
  removeUserInfo,
} from '@/store/slice/authSlice.ts';


export const login = (data) =>(dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({ username: data.username.trim(), password: data.password })
      .then((response) => {
        const { data } = response;
        console.log("login",data);
        if (data.status === 0) {
          const userInfo = data.userInfo;
          dispatch(setUserInfo(userInfo));
          const token = data.token;
          setToken(token);
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = () =>(dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout()
      .then((response) => {
        const { data } = response;
        if (data.status === 0) {
          dispatch(removeUserInfo());
          removeToken();
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUserInfo = (token) =>(dispatch) => {
  return new Promise((resolve, reject) => {
    reqUserInfo(token)
      .then((response) => {
        const { data } = response;
        if (data.status === 0) {
          const userInfo = data.userInfo;
          dispatch(setUserInfo(userInfo));
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
