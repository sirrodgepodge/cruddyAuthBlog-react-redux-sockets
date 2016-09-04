import * as syncActionCreators from '../sync';
import API from '../../../utils/API';


export function initializationRequests(loadedUser) {
  return dispatch =>
    // retrieve app initialization data once root component has mounted
    Promise.all([
      loadedUser && Promise.resolve({body: loadedUser}) || API.get('/auth/session'),
      API.get('/api/post'),
    ])
    .then(([{body: user}, {body: posts}]) =>
      dispatch(syncActionCreators.initializeUserAndPosts({
        user: user || null,
        posts: posts.sort((a, b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)) // sort by date, descending
      })))
    .catch(err => console.error(err));
}

export function localAuthRequest(email, password) {
  return dispatch => API.post({
    route: '/auth/login',
    body: {
      email,
      password
    }
  }).then(({body: user}) =>
    dispatch(syncActionCreators.localAuth(user)))
  .catch(err => console.error(err));
}

export function logoutRequest(userEmail) { // userEmail used to leave socket channel
  return dispatch => API.get('/auth/logout')
    .then(() =>
      dispatch(syncActionCreators.logout(userEmail)))
    .catch(err => console.error(err));
}

export function addPostRequest(postBody) {
  return dispatch => API.post({
    route: '/api/post',
    body: postBody
  })
  .then(({body: newPost}) =>
    dispatch(syncActionCreators.addPost(newPost)))
  .catch(err => console.error(err));
}

export function deletePostRequest(_id) {
  return dispatch => API.del(`/api/post/${_id}`)
    .then(() => dispatch(syncActionCreators.deletePost(_id)))
    .catch(err => console.error(err));
}

export function updatePostRequest(postForm) {
  const index = postForm.editIndex;
  return dispatch => API.put({
      route: `/api/post/${postForm.editId}`,
      body: {
        title: postForm.title,
        body: postForm.body,
        createdDate: new Date()
      }
    })
    .then(({body: post}) =>
      dispatch(syncActionCreators.updatePost({
        index,
        post
      })))
    .catch(err => console.error(err));
}
