import axios from 'axios';
import { https } from './configServ';

export const userServ = {
  loginServ: (data: any) => {
    return https.post('/auth/login', data);
  },
  registerServ: (data: any) => {
    return https.post('/auth/register', data);
  },
  getAllUser: () => {
    return https.get('/user/get-all');
  },
  deleteUserServ: (id: number) => {
    return https.delete(`/user/delete/${id}`);
  },
  addUserServ: (data: any) => {
    return https.post('/user', data);
  },
  uploadImageUser: (formData: any, id: number) => {
    return axios({
      method: 'POST',
      url: `http://localhost:8080/user/upload-branch-img/${id}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateUserServ: (formData: any, id: number) => {
    return axios({
      method: 'PUT',
      url: `http://localhost:8080/user/update/${id}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
