import '@babel/polyfill';

import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile); 

render(
    <App />,
    document.querySelector('#root')
);