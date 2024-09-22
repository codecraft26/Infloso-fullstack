import express from 'express';
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail

  
} from '../controllers/userController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/verify-email/:token').get(verifyEmail);
router.route('/verify-email/resend').post(resendVerificationEmail);




export default router;
