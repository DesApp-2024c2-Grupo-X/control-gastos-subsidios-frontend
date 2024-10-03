import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@material-ui/core';
import theme from './theme';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from '@material-ui/lab';
import store from './state/store';
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CssBaseline />
      <Provider store={store}>
        <Suspense fallback={<CircularProgress />}>
          <ErrorBoundary
            fallback={<Alert severity="error">Algo se rompió feo :(</Alert>}
          >
            <App />
          </ErrorBoundary>
        </Suspense>
      </Provider>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
