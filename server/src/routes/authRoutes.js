import express, { Router } from 'express';
import { signinController, signupController } from '../controllers/authController.js';

// router object
const authRoutes = express.Router();

authRoutes.post('/signup', signupController );

authRoutes.post('/signin', signinController );

export default authRoutes;