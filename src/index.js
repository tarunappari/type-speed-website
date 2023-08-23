import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeContextProvider } from './Context/ThemeContext';
import { TimeModeContextProvider } from './Context/TimeModeContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TimeModeContextProvider>
        <BrowserRouter>
           <App />
        </BrowserRouter>
      </TimeModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

