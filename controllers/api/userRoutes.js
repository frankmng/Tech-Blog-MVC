const { Router } = require('express');
const { User } = require('../../models');
const userRouter = new Router();

// user sign up
userRouter.post('/signup', async (req, res) => {
    const { name, password } = req.body
    try {
      const user = await User.create({
        name,
        password,
      });
  
      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.logged_in = true;
  
        res.status(200).json(user);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // user login
userRouter.post('/login', async (req, res) => {
  const { name, password } = req.body
  try {
    const userData = await User.findOne({ where: { name: name } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again!' });
      return;
    }
    const validPassword = await userData.checkPassword(password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// user logout
userRouter.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = userRouter;
