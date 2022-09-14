import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import CartView from './views/CartView';
//import MainPageView from './views/MainPageView';
import reportWebVitals from './reportWebVitals';
//import DetailView from './views/DetailView';
//import AdminView from './views/AdminView';
//import LoginView from './views/LoginView';
//import RegisterView from './views/RegisterView';
//import OrdersView from './views/OrdersView';
//import ForgetPwdView from './views/ForgetPwdView';
//import BuyView from './views/BuyView';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
