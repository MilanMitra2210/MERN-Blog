import express, { Router } from 'express';
import { googleAuthController, signinController, signupController } from '../controllers/authController.js';

// router object
const authRoutes = express.Router();

authRoutes.post('/signup', signupController );

authRoutes.post('/signin', signinController );

authRoutes.post('/google-auth', googleAuthController );

export default authRoutes;