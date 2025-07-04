import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  userLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  userLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.userLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.userLoading = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;
export const selectUserLoading = (state: RootState) => state.auth.userLoading;

export const authReducer = authSlice.reducer;
