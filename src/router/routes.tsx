import ManagerBranch from '../pages/Branch/ManagerBranch';
import DashBoard from '../pages/DashBoard/DashBoard';
import ManagerFood from '../pages/Food/ManagerFood';
import LoginPage from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import ManagerOrder from '../pages/OrderHistory/ManagerOrder';
import ManagePost from '../pages/Post/ManagePost';
import ManageUser from '../pages/User/ManageUser';
import VoucherManager from '../pages/VoucherManager/VoucherManager';

const routes = [
  // dashboard
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <DashBoard />,
  },
  {
    path: '/manage-user',
    element: <ManageUser />,
  },
  {
    path: '/manage-branch',
    element: <ManagerBranch />,
  },
  // {
  //   path: '/manage-food-branch',
  //   element: <ManagerBranch />,
  // },
  {
    path: '/manage-food',
    element: <ManagerFood />,
  },
  {
    path: '/manage-order',
    element: <ManagerOrder />,
  },
  {
    path: '/manage-order-user',
    element: <ManagerOrder />,
  },
  {
    path: '/manage-voucher',
    element: <VoucherManager />,
  },
  {
    path: '/manage-tin-tuc',
    element: <ManagePost />,
  },
];

export { routes };
