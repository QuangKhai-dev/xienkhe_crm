import axios from 'axios';
import { https } from './configServ';

export const branchServ = {
  getAllBranch: () => {
    return https.get('/branch/get-all');
  },
  deleteBranchServ: (id: number) => {
    return https.delete(`/branch/${id}`);
  },
  addBranchServ: (data: any) => {
    return https.post('/branch', data);
  },
  uploadImageBranch: (formData: any, id: number) => {
    return axios({
      method: 'POST',
      url: `http://localhost:3001/branch/upload-branch-img/${id}`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateBranchServ: (data: any, id: number) => {
    return https.put(`/branch/${id}`, data);
  },
};
