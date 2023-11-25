import ManagerBranch from '../pages/Branch/ManagerBranch';
import DashBoard from '../pages/DashBoard/DashBoard';
import ManagerFood from '../pages/Food/ManagerFood';
import LoginPage from '../pages/Login/Login';
import ManagerOrder from '../pages/OrderHistory/ManagerOrder';
import Contacts from '../pages/User/Contacts';

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
    element: <Contacts />,
  },
  {
    path: '/manage-branch',
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
];

export { routes };
