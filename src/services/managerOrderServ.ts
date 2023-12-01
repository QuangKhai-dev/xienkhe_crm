import axios from 'axios';
import { https } from './configServ';

export const managerOrderServ = {
  getAllManagerOrder: () => {
    return https.get('/manager-order');
  },
  deleteManagerOrderServ: (id: number) => {
    return https.delete(`/user/delete/${id}`);
  },
  addManagerOrderServ: (data: any) => {
    return https.post('/user', data);
  },
};
