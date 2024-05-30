import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react';
import GlobalStyles from './styles/GlobalStyles.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  // <App />,
);
