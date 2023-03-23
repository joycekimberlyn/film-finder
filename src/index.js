import React, { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react';

// pages
import Homepage from './pages/home';
import SearchPage from './pages/search';
import MovieDetails from './pages/movie';
import ErrorPage from './error-page';

// utilities
import theme from './utilities/theme';

// styles
import './styles/main.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/movie/:id',
    element: <MovieDetails />,
    errorElement: <ErrorPage />,
  },
]);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript />

      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
