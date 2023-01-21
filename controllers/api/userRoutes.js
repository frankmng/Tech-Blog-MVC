const { Router } = require('express');
const { User } = require('../../models');
const userRouter = new Router();

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


module.exports = userRouter;
