import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { TotalsContext } from './contexts';
import reportWebVitals from './reportWebVitals';

require('./FontAwesome');

ReactDOM.render(
  <React.StrictMode>
    <TotalsContext.TotalsProvider>
      <App />
    </TotalsContext.TotalsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
