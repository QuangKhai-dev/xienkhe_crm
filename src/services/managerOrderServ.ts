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
  addOrderTable: (data: any) => {
    return https.post('/user/order-table', data);
  },
  updateManagerOrderServ: (data: any) => {
    return https.put('/manager-order/update', data);
  },
};
