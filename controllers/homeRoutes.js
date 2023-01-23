const router = require('express').Router();
const {User} = require('../models')

router.get('/', async (req, res) => {
    const userData = await User.findByPk(req.session.user_id)

    res.render('homepage', {
      userData,
      logged_in: req.session.logged_in 
    });
})


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });
  
module.exports = router;
