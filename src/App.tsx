import React, { PropsWithChildren, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import axios from 'axios';
import AdminTemplate from './templates/AdminTemplate/AdminTemplate';
import themeConfig from './theme.config';
import store from './store';

function App({ children }: PropsWithChildren) {
  const arrUser = [
    {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phoneNumber: '0850327441',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Trần Thị B',
      email: 'tranthib@gmail.com',
      phoneNumber: '0934740991',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Lê Minh C',
      email: 'leminhc@gmail.com',
      phoneNumber: '0971865635',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Phạm Thị D',
      email: 'phamthid@gmail.com',
      phoneNumber: '0974517023',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Hoàng Văn E',
      email: 'hoangvane@gmail.com',
      phoneNumber: '0983181467',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Nguyễn Văn F',
      email: 'nguyenvanf@gmail.com',
      phoneNumber: '0934019278',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Trần Thị G',
      email: 'tranthig@gmail.com',
      phoneNumber: '0974836291',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Lê Minh H',
      email: 'leminhh@gmail.com',
      phoneNumber: '0934718265',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Phạm Thị I',
      email: 'phamthii@gmail.com',
      phoneNumber: '0938165247',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Hoàng Văn J',
      email: 'hoangvanj@gmail.com',
      phoneNumber: '0878902341',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Nguyễn Văn K',
      email: 'nguyenvank@gmail.com',
      phoneNumber: '0934718234',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Trần Thị L',
      email: 'tranthil@gmail.com',
      phoneNumber: '0938165372',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Lê Minh M',
      email: 'leminhm@gmail.com',
      phoneNumber: '0834871029',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Phạm Thị N',
      email: 'phamthin@gmail.com',
      phoneNumber: '0878902146',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Hoàng Văn O',
      email: 'hoangvano@gmail.com',
      phoneNumber: '0878923471',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Nguyễn Văn P',
      email: 'nguyenvanp@gmail.com',
      phoneNumber: '0974836240',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Trần Thị Q',
      email: 'tranthiq@gmail.com',
      phoneNumber: '0834892761',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Lê Minh R',
      email: 'leminhr@gmail.com',
      phoneNumber: '0934718260',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Phạm Thị S',
      email: 'phamthis@gmail.com',
      phoneNumber: '0834162987',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Hoàng Văn T',
      email: 'hoangvant@gmail.com',
      phoneNumber: '0878923416',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Nguyễn Văn U',
      email: 'nguyenvanu@gmail.com',
      phoneNumber: '0938147290',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Trần Thị V',
      email: 'tranthiv@gmail.com',
      phoneNumber: '0934182765',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Lê Minh X',
      email: 'leminhx@gmail.com',
      phoneNumber: '0934178294',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Phạm Thị Y',
      email: 'phamthiy@gmail.com',
      phoneNumber: '0834162975',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Hoàng Văn Z',
      email: 'hoangvanz@gmail.com',
      phoneNumber: '0934125967',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Nguyễn Văn W',
      email: 'nguyenvanw@gmail.com',
      phoneNumber: '0938986421',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Trần Thị U',
      email: 'tranthiu@gmail.com',
      phoneNumber: '0834769812',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Lê Minh X',
      email: 'leminhx@gmail.com',
      phoneNumber: '0934718269',
      role: 'user',
      isActive: 1,
    },
    {
      name: 'Phạm Thị W',
      email: 'phamthiw@gmail.com',
      phoneNumber: '0934178294',
      role: 'user',
      isActive: 1,
    },
  ];

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
  // useEffect(() => {
  //   for (let i = 0; i < arrUser.length; i++) {
  //     axios({
  //       method: 'POST',
  //       url: 'http://localhost:8080/auth/register',
  //       data: arrUser[i],
  //     });
  //   }
  // }, []);

  const arrVoucher = [
    {
      name: 'XE-20230101000000-001',
      discount: 10,
      description: 'Mô tả voucher 1',
      expired: '2023-12-31T23:59:59.999Z',
      createdAt: '2023-01-01T00:00:00.000Z',
    },
    {
      name: 'XE-20230102000000-002',
      discount: 20,
      description: 'Mô tả voucher 2',
      expired: '2023-12-31T23:59:59.999Z',
      createdAt: '2023-01-02T00:00:00.000Z',
    },
    {
      name: 'XE-20230103000000-003',
      discount: 30,
      description: 'Mô tả voucher 3',
      expired: '2023-12-31T23:59:59.999Z',
      createdAt: '2023-01-03T00:00:00.000Z',
    },
    {
      name: 'XE-20230104000000-004',
      discount: 40,
      description: 'Mô tả voucher 4',
      expired: '2023-12-31T23:59:59.999Z',
      createdAt: '2023-01-04T00:00:00.000Z',
    },
    {
      name: 'XE-20230105000000-005',
      discount: 50,
      description: 'Mô tả voucher 5',
      expired: '2023-12-31T23:59:59.999Z',
      createdAt: '2023-01-05T00:00:00.000Z',
    },
    // Thêm 45 mẫu dữ liệu khác ở đây
  ];

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
