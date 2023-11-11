import React, { PropsWithChildren, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import axios from 'axios';
import AdminTemplate from './templates/AdminTemplate';
import themeConfig from './theme.config';
import store from './store';

function App({ children }: PropsWithChildren) {
  // const arr = [
  //   {
  //     name: 'Nguyễn Văn A',
  //     email: 'nguyenvana@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Trần Thị B',
  //     email: 'tranthib@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Lê Văn C',
  //     email: 'levanc@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Phạm Thị D',
  //     email: 'phamthid@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Hoàng Văn E',
  //     email: 'hoangvane@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Nguyễn Thị F',
  //     email: 'nguyenthif@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Trần Văn G',
  //     email: 'tranvang@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Lê Thị H',
  //     email: 'lethih@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Phạm Văn I',
  //     email: 'phamvani@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Hoàng Thị K',
  //     email: 'hoangthik@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Nguyễn Văn L',
  //     email: 'nguyenvanl@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Trần Thị M',
  //     email: 'tranthim@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Lê Văn N',
  //     email: 'levann@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Phạm Thị O',
  //     email: 'phamthio@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Hoàng Văn P',
  //     email: 'hoangvanp@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Nguyễn Thị Q',
  //     email: 'nguyenthiq@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Trần Văn R',
  //     email: 'tranvar@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Lê Thị S',
  //     email: 'lethis@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Phạm Văn T',
  //     email: 'phamvant@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Hoàng Thị U',
  //     email: 'hoangthiu@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Nguyễn Văn V',
  //     email: 'nguyenvanv@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Trần Thị X',
  //     email: 'tranthix@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Lê Văn Y',
  //     email: 'levany@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Phạm Thị Z',
  //     email: 'phamthiz@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Hoàng Văn Khoai',
  //     email: 'hoangvankhoai@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Nguyễn Thị Lan',
  //     email: 'nguyenthilan@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Trần Văn Đạo',
  //     email: 'tranvandao@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Lê Thị Mai',
  //     email: 'lethimai@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Phạm Văn Tuấn',
  //     email: 'phamvantuan@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Hoàng Thị Ngọc',
  //     email: 'hoangthingoc@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  //   {
  //     name: 'Nguyễn Văn Hiếu',
  //     email: 'nguyenvanhieu@gmail.com',
  //     password: 'string',
  //     phoneNumber: 'string',
  //   },
  // ];
  const arrBranch = [
    {
      name: 'Xiên khè Q1',
      address: '117 Trần Khắc Chân, Phường Tân Đinh, Q1',
      phoneNumber: '0933 309 117',
      decs: 'lorem',
    },
    {
      name: 'Xiên Khè Koozi',
      address: '782 Trường Sa, Phường 14, Quận 3.',
      phoneNumber: '0933 309 117',
      decs: 'lorem',
    },
    {
      name: 'Xiên Khè Bliss',
      address: '801 Hoàng Sa, Phường 9, Quận 3.',
      phoneNumber: '0933 309 117',
      decs: 'lorem',
    },
    {
      name: 'Xiên Khè Gò Vấp',
      address: '1&2 Lê Đức Thọ, Phường 7, Gò Vấp.',
      phoneNumber: '0933 309 117',
      decs: 'lorem',
    },
    {
      name: 'Xiên Khè Street',
      address: '30 Phạm Ngũ Lão, Phường 4, Gò Vấp.',
      phoneNumber: '0933 309 117',
      decs: 'lorem',
    },
    {
      name: 'Xiên Khè 777',
      address: '347 Lê Văn Thọ, Phường 9, Gò Vấp.',
      phoneNumber: '0933 309 117',
      decs: 'lorem',
    },
    {
      name: 'Xiên Khè Felix',
      address: '1A Phổ Quang, Phường 2, Tân Bình.',
      phoneNumber: '0933 309 117',
      decs: 'lorem',
    },
  ];
  useEffect(() => {
    for (let i = 0; i < arrBranch.length; i++) {
      // axios({
      //   method: 'POST',
      //   url: 'http://localhost:3000/branch',
      //   data: arrBranch[i],
      // });
    }
  }, []);

  return (
    <div
      className={`${
        (store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''
      } ${themeConfig.menu} ${themeConfig.layout} ${
        themeConfig.rtlClass
      } main-section antialiased relative font-nunito text-sm font-normal`}
    >
      {children}
    </div>
  );
}

export default App;
