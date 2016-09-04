import React from 'react';
import _ from 'lodash';
import routes from '../shared/routes';
import { DevTools } from '../shared/redux/DevTools';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { configureStore } from '../shared/redux/store/configureStore';
import { socketActions } from '../shared/redux/reducers';
import { connectSocketsToStore } from '../shared/socket';


// boolean checks
const isProd = process.env.NODE_ENV === 'production';


// react's HTML5 history handler
const history = browserHistory;


// grab initial state off window
const store = configureStore(window.__INITIAL_STATE__);


// gives sockets dispatch capabilities
connectSocketsToStore(store, socketActions);


// determine where react hooks to actual DOM
const DomEntryPoint = document.getElementById('root');


// polyfill or augment ES6 native promises with 'bluebird' library throughout app
window.Promise = window.Promise && _.merge(window.Promise, require('bluebird')) || require('bluebird');


// enable debugger if in dev and client
if (!isProd)
  window.React = React;


// inform dev users if isomorphic load failed (checks for "data-react-checksum" attribute)
if (!isProd)
  if (!DomEntryPoint || !DomEntryPoint.firstChild || !DomEntryPoint.firstChild.attributes || !DomEntryPoint.firstChild.attributes['data-react-checksum'] && (!DomEntryPoint.firstChild.firstChild || !DomEntryPoint.firstChild.firstChild.attributes || !DomEntryPoint.firstChild.firstChild.attributes['data-react-checksum'])) // eslint-disable-line max-len
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.'); // eslint-disable-line


// hook client-side app to DOM
render((
  <Provider store={store}>
      <Router history={history} routes={routes} />
  </Provider>
), DomEntryPoint);


// enable DevTools if in dev and if user does not have redux Devtools extension installed
if (!isProd && !window.devToolsExtension) {
  const devToolsDest = document.createElement('div');
  DomEntryPoint.parentNode.insertBefore(devToolsDest, DomEntryPoint.nextSibling);
  render(
    <Provider store={store} key="provider">
      <DevTools />
    </Provider>,
    devToolsDest
  );
}
