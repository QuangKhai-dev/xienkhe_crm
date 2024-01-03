import axios from 'axios';
import { https } from './configServ';

export const foodServ = {
  getAllFood: () => {
    return https.get('/food');
  },
  deleteFoodServ: (id: number) => {
    return https.delete(`/food/${id}`);
  },
  addFoodServ: (data: any) => {
    return axios({
      method: 'POST',
      url: `http://localhost:8080/food`,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateFoodServ: (data: any, id: number) => {
    return axios({
      method: 'PUT',
      url: `http://localhost:8080/food/${id}`,
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getCategory: () => {
    return https.get('/category-food');
  },
};
