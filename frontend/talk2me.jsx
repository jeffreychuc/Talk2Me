import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import style from './stylesheets/application.scss';

document.addEventListener("DOMContentLoaded", () => {
  console.log('dom content loaded');
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
