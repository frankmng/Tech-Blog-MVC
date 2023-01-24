const { Router } = require('express');
const userRouter = require('./userRoutes');
const postRouter = require('./post');

const apiRouter = new Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/post', postRouter);

module.exports = apiRouter;
