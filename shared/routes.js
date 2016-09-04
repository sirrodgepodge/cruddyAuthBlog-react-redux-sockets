import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './App';
import Dashboard from './r_Dashboard';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard}/>
  </Route>
);

export default routes;
