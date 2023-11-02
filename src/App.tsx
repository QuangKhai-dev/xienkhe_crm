import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminTemplate from './templates/AdminTemplate';
import Login from './pages/Login/Login';
import axios from 'axios';

function App() {
  const arr = [
    {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Trần Thị B',
      email: 'tranthib@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Lê Văn C',
      email: 'levanc@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Phạm Thị D',
      email: 'phamthid@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Hoàng Văn E',
      email: 'hoangvane@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Nguyễn Thị F',
      email: 'nguyenthif@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Trần Văn G',
      email: 'tranvang@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Lê Thị H',
      email: 'lethih@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Phạm Văn I',
      email: 'phamvani@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Hoàng Thị K',
      email: 'hoangthik@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Nguyễn Văn L',
      email: 'nguyenvanl@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Trần Thị M',
      email: 'tranthim@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Lê Văn N',
      email: 'levann@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Phạm Thị O',
      email: 'phamthio@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Hoàng Văn P',
      email: 'hoangvanp@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Nguyễn Thị Q',
      email: 'nguyenthiq@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Trần Văn R',
      email: 'tranvar@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Lê Thị S',
      email: 'lethis@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Phạm Văn T',
      email: 'phamvant@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Hoàng Thị U',
      email: 'hoangthiu@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Nguyễn Văn V',
      email: 'nguyenvanv@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Trần Thị X',
      email: 'tranthix@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Lê Văn Y',
      email: 'levany@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Phạm Thị Z',
      email: 'phamthiz@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Hoàng Văn Khoai',
      email: 'hoangvankhoai@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Nguyễn Thị Lan',
      email: 'nguyenthilan@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Trần Văn Đạo',
      email: 'tranvandao@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Lê Thị Mai',
      email: 'lethimai@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Phạm Văn Tuấn',
      email: 'phamvantuan@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Hoàng Thị Ngọc',
      email: 'hoangthingoc@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
    {
      name: 'Nguyễn Văn Hiếu',
      email: 'nguyenvanhieu@gmail.com',
      password: 'string',
      phoneNumber: 'string',
    },
  ];
  useEffect(() => {
    for (let i = 0; i < arr.length; i++) {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/auth/register',
        data: arr[i],
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/admin" element={<AdminTemplate />}></Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
