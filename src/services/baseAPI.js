import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

export const token = {
  set: token => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  clear: () => {
    instance.defaults.headers.common.Authorization = ``;
  },
};
