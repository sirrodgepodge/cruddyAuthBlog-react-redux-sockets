import io from 'socket.io-client';
import _ from 'lodash';

// need to define out here for server render
let socket;

const isClient = process.env.CLIENT;

// only connect on client
if (isClient)
  socket = io('', {path: '/socket'});
else
  socket = {};


// blocks socket emitting attempts server-side
socket.isoEmit = (eventName, eventObj, ...otherArgs) => {
  // if action came from socket do not emit, and get rid of fromSocket prop from actual dispatch
  if (eventObj.fromSocket)
    delete eventObj.fromSocket;
  else if (isClient)
    isClient && socket.emit(eventName, eventObj, ...otherArgs);
};


// blocks socket listening attempts server-side
socket.isoOn = (...args) => {
  isClient && socket.on(...args);
};


// error handling
socket.isoOn('error', err => {
  console.error(err.message);

  // reconnect after socket error (not working)
  // socket = io.connect('', {path: '/socket', 'force new connection': true});
});


// add socketActions provided in reduxer
socket.boundActions = [];


// add action to bound "piping" set
socket.bindAction = actionType => {
  // handle array
  if (Array.isArray(actionType))
    return actionType.forEach(val => socket.bindAction(val));

  // check if actionType already exists
  if (!~socket.boundActions.indexOf(actionType)) {
    socket.boundActions.push(actionType);

    // sockets have been connected to store add listeners (otherwise can still emit events)
    if (socket.dispatch)
      socket.dispatchEventOn(actionType);
  }
};


socket.emitIfBound = action => {
  // test if type is in bound actions
  if (~socket.boundActions.indexOf(action.type))
    socket.isoEmit(action.type, action);
};


// inits piping of event into reducer (must be connected to store)
socket.dispatchEventOn = eventName => socket.dispatch && socket.isoOn(eventName, socket.dispatch);

// run in client index.js to give sockets access to dispatching
export function connectSocketsToStore(store, socketActions) {
  socket.dispatch = action => store.dispatch(_.merge(action, {fromSocket: true}));

  // join user's channel, done here because user's initial auth status comes from server
  const user = store.getState().user;
  if (user && user.email) socket.isoEmit('joinChannel', user.email);

  // make boundActions listen for emissions from other users
  socket.bindAction(socketActions);
}


export function socketActionsMiddleware() {
  return next => action => {
    socket.emitIfBound(action);
    next(action);
  };
}

export default socket;
