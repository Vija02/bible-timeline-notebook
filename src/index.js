import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from 'containers/Root';
import registerServiceWorker from './registerServiceWorker';

import sizeMe from 'react-sizeme'
sizeMe.noPlaceholders = true;

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
