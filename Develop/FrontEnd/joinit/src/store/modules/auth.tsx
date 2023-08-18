import { createSlice } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie} from '../../storage/cookie';

const loggedIn = localStorage.getItem("access-token")? true : (getCookie() !== undefined? true :false)

const initialState = { 
  loggedIn,
}

const AuthLogin = createSlice({
  name : 'auth',
  initialState,
  reducers : {
    Login(state, action) {
      localStorage.setItem("access-token", action.payload.accessToken);
      localStorage.setItem("userPk", action.payload.userPk);
      setCookie(action.payload.refreshToken);
      state.loggedIn = true
    },

    Logout(state) {
      localStorage.removeItem("access-token");
      localStorage.removeItem("userPk");
      localStorage.removeItem("userType");
      removeCookie();
      state.loggedIn = false;
    } 
  }
})

export default AuthLogin;
export const { Login, Logout } = AuthLogin.actions;