import React from 'react';

import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './i18n';
import { App } from './App';

import { blue, gold, red } from 'constant';
import { ContextModal } from 'modals';
import { store } from 'store';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const theme = createTheme({
  colors: {
    gold,
    red,
    blue,
  },
});

const modals = {
  formModal: ContextModal,
};

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <ModalsProvider modals={modals}>
          <Notifications />
          <App />
        </ModalsProvider>
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
