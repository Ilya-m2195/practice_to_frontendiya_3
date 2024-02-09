import React from 'react';

import { MantineProvider } from '@mantine/core';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './i18n';
import { App } from './App';

import { store } from 'store';
import '@mantine/core/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <MantineProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MantineProvider>
  </React.StrictMode>,
);
