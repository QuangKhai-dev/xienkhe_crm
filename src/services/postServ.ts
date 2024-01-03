import axios from 'axios';
import { https } from './configServ';

export const postServ = {
  getAllPost: () => {
    return https.get('/post');
  },
  createPost: (data: any) => {
    return axios({
      method: 'POST',
      url: `http://localhost:8080/post`,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deletePost: (id: number) => {
    return https.delete(`/post/${id}`);
  },
  updatePostServ: (id: number, data: any) => {
    return https.put(`/post/${id}`, data);
  },
};
