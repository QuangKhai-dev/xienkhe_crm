import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

// router
import { RouterProvider } from 'react-router-dom';
import router from './router';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Tailwind css
import './tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
