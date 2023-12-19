import { https } from './configServ';

export const voucherServ = {
  getAllVoucher: () => {
    return https.get('/voucher/get-all');
  },
  deleteVoucherServ: (id: number) => {
    return https.delete(`/voucher/${id}`);
  },
  addVoucherServ: (data: any) => {
    return https.post('/voucher', data);
  },
};
