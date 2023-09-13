import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { instance } from 'services/baseAPI';
import { selectorFilter } from './filterReduce';
import { toast } from 'react-toastify';

export const getAllContacts = createAsyncThunk(
  'contact/getAllContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get('/contacts');
      return data;
    } catch (error) {
      toast.error('Oops! Something went wrong! Please try again!');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contact/addContact',
  async (newContact, thunkApi) => {
    try {
      const { data } = await instance.post('/contacts', newContact);
      return data;
    } catch (error) {
      toast.error('Oops! Something went wrong! Please try again!');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contact/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      toast.error('Oops! Something went wrong! Please try again!');
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const contactsInitialState = {
  contacts: [],
  error: null,
  isLoading: false,
};

export const contacts = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  extraReducers: builder =>
    builder
      //--------------------getAllContacts--------------------
      .addCase(getAllContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      //--------------------addContact--------------------
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [action.payload, ...state.contacts];
      })
      //--------------------deleteContact--------------------
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
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
export const contactsReducer = contacts.reducer;

//-------SELECTORS-------
export const selectorContacts = state => state.contacts.contacts;
export const selectorContactsIsLoading = state => state.contacts.isLoading;
export const selectorContactsError = state => state.contacts.error;
export const selectorContactsFiltered = createSelector(
  [selectorContacts, selectorFilter],
  (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
