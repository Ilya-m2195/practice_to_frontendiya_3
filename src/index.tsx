import { gold } from 'constants';

import React from 'react';

import { MantineProvider, createTheme } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './i18n';
import { App } from './App';

import { store } from 'store';
import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const theme = createTheme({
  colors: {
    gold,
  },
});

root.render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
