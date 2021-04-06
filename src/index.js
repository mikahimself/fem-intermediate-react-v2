import React from 'react';
import { render } from 'react-dom';
import App from "./App";
import "./style.css";

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
  }

render( <App/>, document.getElementById('root') );