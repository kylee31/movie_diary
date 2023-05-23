import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import DiaryProvider from './context/DiaryProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <DiaryProvider>
      <App />
    </DiaryProvider>
  </React.StrictMode>
);