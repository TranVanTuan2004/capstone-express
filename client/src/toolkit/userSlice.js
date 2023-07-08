import { createSlice } from '@reduxjs/toolkit'
import { localUser } from '../utils/localUser';

const initialState = {
  userInfo: localUser.get()
}

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    userLogin(state, action) {
      state.userInfo = action.payload
      localUser.set(action.payload)
      localStorage.setItem("token", action.payload.token)
    }
  }
});

export const {userLogin} = userSlice.actions


export default userSlice.reducer