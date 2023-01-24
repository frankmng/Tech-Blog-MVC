const { Router } = require("express");
const homeRoutes = require('./homeRoutes');
const apiRouter = require("./api");

const allRouter = new Router();

allRouter.use('/', homeRoutes);
allRouter.use('/api', apiRouter);

// router.use('/api', apiRoutes);

module.exports = allRouter;
