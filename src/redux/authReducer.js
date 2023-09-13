import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance, token } from 'services/baseAPI';
import { toast } from 'react-toastify';

export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (formUser, thunkApi) => {
    try {
      const { data } = await instance.post('users/signup', formUser);
      token.set(data.token);
      return data;
    } catch (error) {
      toast.error('Oops! Something went wrong! Please try again!');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logInUser = createAsyncThunk(
  'auth/logInUser',
  async (formUser, thunkApi) => {
    try {
      const { data } = await instance.post('users/login', formUser);
      token.set(data.token);
      return data;
    } catch (error) {
      toast.error('Oops! Something went wrong! Please try again!');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logOutUser',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.post('users/logout');
      token.clear();
      return data;
    } catch (error) {
      toast.error('Oops! Something went wrong! Please try again!');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refreshtUser',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userToken = state.auth.token;
      token.set(userToken);
      const { data } = await instance.get('users/current');
      return data;
    } catch (error) {
      toast.error('Oops! Something went wrong! Please try again!');
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      const token = state.auth.token;

      if (!token) return false;
    },
  }
);

const initialState = {
  userData: null,
  token: null,
  authenticated: false,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder =>
    builder
      //--------------------SINGUPUSER--------------------
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isLoading = false;
        state.authenticated = true;
      })
      //--------------------lOGINUSER--------------------
      .addCase(logInUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isLoading = false;
        state.authenticated = true;
      })
      //--------------------lOGOUTUSER--------------------
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.userData = null;
        state.token = null;
        state.authenticated = false;
        state.isLoading = false;
      })
      //--------------------REFRESHUSER--------------------
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
        state.authenticated = true;
      })

      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )

      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

//-------REDUCERS-------
export const authReducer = authSlice.reducer;

//-------SELECTORS-------
export const selectorUserData = state => state.auth.userData;
export const selectorToken = state => state.auth.token;
export const selectorAuthenticated = state => state.auth.authenticated;
export const selectorError = state => state.auth.error;
export const selectorIsLoading = state => state.auth.isLoading;
