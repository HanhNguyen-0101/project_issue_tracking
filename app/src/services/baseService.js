import axios from "axios";
import { DOMAIN, TOKEN } from "../utils/constants/settingSystem";

export class baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  get = (url) => {
    return axios.get(`${DOMAIN}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  };

  post = (url, data) => {
    return axios.post(`${DOMAIN}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  };

  put = (url, data) => {
    return axios.put(`${DOMAIN}${url}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  };

  delete = (url) => {
    return axios.delete(`${DOMAIN}${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
      },
    });
  };
}
