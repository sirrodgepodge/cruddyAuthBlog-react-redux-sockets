import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { persistState } from 'redux-devtools';
import { DevTools } from '../DevTools';
import { socketActionsMiddleware } from '../../socket';

export function configureStore(initialState) {
  let finalCreateStore;

  if (!process.env.CLIENT || process.env.NODE_ENV === 'production')
    finalCreateStore = applyMiddleware(thunk, socketActionsMiddleware)(createStore);
  else {
    finalCreateStore = compose(
      applyMiddleware(thunk, socketActionsMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
