import socket from '../../../socket';


export function connectSocketActions() {
  // these listeners are on global events
  socket.dispatchEventOn('addPost');
  socket.dispatchEventOn('deletePost');
  socket.dispatchEventOn('updatePost');

  // this listener is channel-specific (set server-side)
  socket.dispatchEventOn('editPost');
}
