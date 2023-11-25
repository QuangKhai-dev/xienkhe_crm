import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

const AdminTemplate = (props: Props) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminTemplate;
