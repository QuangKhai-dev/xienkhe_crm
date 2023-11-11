import { createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';
import DefaultLayout from '../components/Layout/DefaultLayout';

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element: <DefaultLayout>{route.element}</DefaultLayout>,
  };
});

const router = createBrowserRouter(finalRoutes);

export default router;
