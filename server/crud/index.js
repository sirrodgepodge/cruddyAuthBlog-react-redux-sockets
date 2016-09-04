const express = require('express'),
      router = express.Router(),
      mongoose = require('mongoose'),
      Post = mongoose.model('Post'),
      Promise = require('bluebird');

// promisifies methods on "Post" and "Post" instances
Promise.promisifyAll(Post);
Promise.promisifyAll(Post.prototype);

// Get initial app data
router.get('/post', (req, res, next) => {
  Post.findAsync({}, null, {sort:'-createdDate'})
    .then(allPosts => res.json(allPosts))
    .catch(err => !console.log(err) && next(err));
});

router.post('/post', (req, res, next) => {
  const newPost = new Post(req.body);
  newPost.saveAsync()
    .then(savedPost => res.json(savedPost[0] || savedPost)) // sometimes returns array of [savedPost, 1], not sure if this a MongoDB or Mongoose version thing
    .catch(err => !console.log(err) && next(err));
});

router.put('/post/:id', (req, res, next) => {
  Post.findByIdAndUpdateAsync(req.params.id, req.body, {new:true}) // new option here says return the updated object to the following promise
    .then(updatedPost => res.status(200).json(updatedPost))
    .catch(err => !console.log(err) && next(err));
});

router.delete('/post/:id', (req, res, next) => {
  Post.findByIdAndRemoveAsync(req.params.id)
    .then(deletedPost => res.status(200).json(deletedPost))
    .catch(err => !console.log(err) && next(err));
});

module.exports = router;
