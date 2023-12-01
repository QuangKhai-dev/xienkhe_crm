import ManagerBranch from '../pages/Branch/ManagerBranch';
import DashBoard from '../pages/DashBoard/DashBoard';
import ManagerFood from '../pages/Food/ManagerFood';
import LoginPage from '../pages/Login/Login';
import ManagerOrder from '../pages/OrderHistory/ManagerOrder';
import ManageUser from '../pages/User/ManageUser';

const routes = [
  // dashboard
  {
    path: '/login',
    element: <LoginPage />,
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
  {
    path: '/manage-food-branch',
    element: <ManagerBranch />,
  },
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
];

export { routes };
