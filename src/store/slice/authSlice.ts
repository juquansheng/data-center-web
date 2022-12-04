import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken} from "@/utils/token.ts";
 
export interface authState {
  name: string;
  role: string;
  avatar:string;
  token:string;
  id:string;
  menuConfig: [];
}
 
const initialState: authState = {
  name: "",
  role: "",
  avatar:"",
  token:getToken(),
  id:"",
  menuConfig: [],
};
 
                 
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state: authState, action: PayloadAction<authState>) => {
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.avatar = action.payload.avatar;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.menuConfig = action.payload.menuConfig;
    },
    removeUserInfo: (state: authState) => {
      state.name = '';
      state.role = '';
      state.avatar = '';
      state.token = '';
      state.id = '';
      state.menuConfig = [];
    },

  },
});
 
export const { setUserInfo, removeUserInfo} = authSlice.actions;
 
export default authSlice.reducer;
 
 