import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ContextProvider from './components/user_dashboard/AI/Context.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
  </StrictMode>
);
