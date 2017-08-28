const Auth = require('./../controller/Auth');
const authRouter = require('express').Router();

authRouter.post('/authenticate',Auth.login);
authRouter.post('/signup',Auth.signUp);
authRouter.get('/verify',Auth.verify);

module.exports = authRouter;
