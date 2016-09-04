// React And Redux Setup
import _ from 'lodash';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { configureStore } from '../../../shared/redux/store/configureStore';
import { fetchComponentData } from '../../utils/fetchData';

// Import string html string rendering functions
import { renderFullPage } from '../../../client/html';
import { renderError } from '../../../client/html';

// Import required modules
import routes from '../../../shared/routes';
import initialState from '../../../shared/redux/store/initialState';


module.exports = function isomorphicRoutes(app) {
  // Server Side Rendering based on routes matched by React-router.
  app.use((req, res, next) =>
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      if (err)
        return res.status(500).end(renderError(err));

      if (redirectLocation)
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);

      if (!renderProps)
        return next();

      // needed for isomorphic auth
      if (req.user)
        _.merge(initialState, {
          // remove sensitive info when sending to front end but do indicate whether or not user has a password
          // as they could have used Google or Facebook auth
          user: _.merge(_.omit(req.user.toObject(), ['password', 'salt']), {hasPassword: !!req.user.password})
        });

      // initialize server-side store;
      const store = configureStore(initialState);

      // server-side fetch what's needed by state at these routes to pre-render
      return fetchComponentData(store, renderProps.components, renderProps.params, req.headers)
        .then(() => {
          const initialView = renderToString(
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );
          const finalState = store.getState();

          res.status(200).end(renderFullPage(initialView, finalState));
        })
        .catch(serverError => res.status(500).end(renderError(serverError)));
    }));
};
