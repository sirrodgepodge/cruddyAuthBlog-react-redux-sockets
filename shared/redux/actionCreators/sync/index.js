import * as actionTypes from '../../actionTypes';


export function initializeUserAndPosts({user, posts}) {
  return {
    type: actionTypes.INITIALIZE_APP,
    user,
    posts
  };
}

export function localAuth(user) {
  return {
    type: actionTypes.LOCAL_AUTH,
    user
  };
}

export function logout() {
  return {
    type: actionTypes.LOG_OUT
  };
}

export function editPost(post) {
  const action = {
    type: actionTypes.EDIT_POST,
    post
  };
  return action;
}

export function addPost(post) {
  const action = {
    type: actionTypes.ADD_POST,
    post
  };
  return action;
}

export function deletePost(_id) {
  const action = {
    type: actionTypes.DELETE_POST,
    _id
  };
  return action;
}

export function updatePost({index, post}) {
  const action = {
    type: actionTypes.UPDATE_POST,
    index,
    post
  };
  return action;
}
