import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Provider} from 'mobx-react';

import './index.css';
import App from './App';
import Store from './store'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={new Store()}>
      <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
