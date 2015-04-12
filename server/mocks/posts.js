if (!Array.prototype.find) {
 Array.prototype.find = function(predicate) {
  if (this == null) {
    throw new TypeError('Array.prototype.find called on null or undefined');
  }
  if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
  }
     var list = Object(this);
     var length = list.length >>> 0;
     var thisArg = arguments[1];
     var value;
     
     for (var i=0; i<length; i++) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
         return value;
    }
 }
 return undefined;
 };
}


var authors = [
         {
             id: 1,
             name: 'George',
             posts: [1,2]
         },
        {
            id: 2,
            name: 'Sally',
            posts: [3]
         }
    ];

var posts = [
          {
            id: 1,
            title: 'Bananas',
              author: 1,
              date: new Date(2014, 5, 21, 10, 0,0),
              body: 'The quick brown fox jumped over the lazy dog.  But why did this happen?  Wouldn’t you think a fox, regardless of how quick he might be, would choose to run away from the dog?  Foxes don’t strike me as the type of animals to taunt other animals – especially predatory creatures capable of killing them.  I understand that foxes don’t have the mental capacity or reasoning ability of humans, but certainly they possess enough sense to flee from a potentially dangerous situation before disaster strikes.'
          },
          {
            id: 2,
            title: 'Apples',
              author: 1,
              date: new Date(2014, 10, 8, 8, 0, 0),              
              body: 'This, my friends, is where the quick brown fox makes his mistake:  he underestimates the dog.  His pride, his desire to maintain his standard of living, and most importantly, his ability to catch a quick brown fox in mid-jump and turn him into a stationary dead fox.Now you may ask yourself why all of this matters, why we’ve covered all of this time and space on quick foxes and lazy dogs.  Believe me, that is a fair and valid question.  It all boils down to a simple and indisputable truth:  It’s damn near impossible to get 2,300 characters of sample text by riffing on Lorem ipsum dolor sit amet.  And since we’re about out of space, let’s keeping typing this sentence out until we either run out of space, getting partially chopped off, completely blow up the formatting, or overflow into page two.'
          },
          {
            id: 3,
            title: 'Oranges',
              author: 1,
              date: new Date(2014, 12, 4, 14, 0, 0),              
              body: 'post 3'
          },          
      ];


module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  postsRouter.get('/', function(req, res) {
    res.send({
        'posts': posts,
        'authors': authors
    });
  });

  postsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
    res.send({
      'post': posts.find(function(post) {
          return post.id == req.params.id
      }),
        'authors': authors
    });
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
