import DashBoard from '../pages/DashBoard/DashBoard';
import LoginPage from '../pages/Login/Login';
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
];

export { routes };
