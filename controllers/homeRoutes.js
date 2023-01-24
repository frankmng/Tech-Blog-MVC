const router = require('express').Router();
const { User, Post, Comment } = require('../models')
const isLoggedIn = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in 
    });
  } catch(err){
      res.status(500).json(err);
  }
})


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/new-post', isLoggedIn, async (req, res) => {
  res.render('new-post', {
    logged_in: true
  })
})

router.get('/edit-post/:id', isLoggedIn, async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });
  
  const post = postData.get({ plain: true });

  res.render('edit-post', {
    post,
    logged_in: req.session.logged_in
  })
})

router.get('/post/:id', async (req, res) => {
  const postData = await Post.findAll( {
    where: {
      id: req.params.id
     },
     include: [User]
   })

  const commentData = await Comment.findAll({
    where: {
     post_id: req.params.id
    },
    include: [User]
  })

  const posts = postData.map((post) => post.get({ plain: true }));
  const comments = commentData.map((comment) => comment.get({ plain: true }));

  res.render('single-post', {
    posts,
    comments,
    logged_in: req.session.logged_in
  })
})

router.get('/dashboard', isLoggedIn, async (req, res) => {
  const userData = await User.findByPk(req.session.user_id, {
    include: [
      {
        model: Post,
        attributes: ['id', 'name', 'description', 'date_created'],
      },
    ],
  });

  const user = userData.get({ plain: true });

  res.render('dashboard', {
    ...user,
    logged_in: req.session.logged_in
  })
})
  
module.exports = router;
