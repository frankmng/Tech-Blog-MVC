const router = require('express').Router();
const { User, Post } = require('../models')
const withAuth = require('../utils/auth');

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

router.get('/new-post', withAuth, async (req, res) => {
  res.render('new-post', {
    logged_in: true
  })
})

router.get('/edit-post/:id', withAuth, async (req, res) => {
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


router.get('/dashboard', async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });

  const posts = postData.map((post) => post.get({ plain: true }));

  res.render('dashboard', {
    posts,
    logged_in: req.session.logged_in
  })
})
  
module.exports = router;
