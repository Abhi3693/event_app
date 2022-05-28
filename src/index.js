import './stylesheet/style.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './component/App';

let root = createRoot(document.getElementById('root'));
root.render(<App />);
