import express from 'express';
import {handleUserLogin, handleUserSignup} from '../Controllers/user.js';

const router = express.Router();

router.post('/',handleUserSignup)
router.post('/login',handleUserLogin)

export default router;