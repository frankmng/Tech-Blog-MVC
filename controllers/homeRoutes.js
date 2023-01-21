const router = require('express').Router();
const {User} = require('../models')
router.get('/', async (req, res) => {

    const userData = await User.findByPk(req.session.user_id)
    const user = userData.get({ plain: true });

    res.render('homepage', {
      user,
      logged_in: true
    });
})


router.get('/login', (req, res) => {
    // if (req.session.logged_in) {
    //   res.redirect('/profile');
    //   return;
    // }
  
    res.render('login');
  });
  
module.exports = router;
