const express = require('express');
const { resetPasswordControllers, 
        signupControllers, loginControllers,
        forgotPasswordControllers
      } = require('../controllers/auth.controller');


const router = express.Router();

router.post('/signup',signupControllers);
router.post('/login',loginControllers);
router.post('/forgot-password',forgotPasswordControllers);
router.post('/reset-password/:token',resetPasswordControllers);

module.exports = router;