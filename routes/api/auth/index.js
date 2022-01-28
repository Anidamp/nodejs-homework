import { Router } from 'express';
import {
  validateCreate,
  validateCredentials,
  validateUpdateSubscription,
  validateToken,
} from './validation';
import { Roles } from '../../../connection/constants';
import {
  registration,
  login,
  logout,
  getCurrent,
  updateSubscription,
  uploadAvatar,
  verifyUser,
  repeatEmailForverifyUser,
} from '../../../controllers/auth';
import guard from '../../../middlewares/guard';
import roleAccess from '../../../middlewares/roleAcces';
import { upload } from '../../../middlewares/upload';

const router = new Router();

router.patch(
  '/',
  [guard, roleAccess(Roles.PRO), validateUpdateSubscription],
  updateSubscription,
);
router.post('/signup', validateCreate, registration);
router.post('/login', validateCredentials, login);
router.get('/logout', guard, logout);
router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar);
router.get('/current', validateToken, guard, getCurrent);
router.get('/verify/:verificationToken', verifyUser);
router.post('/verify', repeatEmailForverifyUser);

export default router;