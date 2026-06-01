import ReactDOM from 'react-dom/client';
import React from 'react';
import Router from '~/render/script/component/Router';
import communicate from '~/render/script/lib/communicate';
import syncData from '~/render/script/lib/syncData';
import focusAndBlur from '~/render/script/lib/focusAndBlur';

syncData();
focusAndBlur();

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = <Router />
root.render(router);

communicate();
setTimeout(() => window.ipc.send('render/ready'), 0);
