import { Router } from 'express';
import { authService } from '../../services';
import { userConstant } from '../../constant';

const router = Router();
const { authorize } = authService;
const { UserType } = userConstant;

const authorizedResponse = async (req, res) => {
  return res.json({ authorized: true, type: req.user ? req.user.type : '' });
};

router.get('/authorized', authorize(), authorizedResponse);
router.get('/admin-only', authorize(UserType.Admin), authorizedResponse);
router.get('/client-only', authorize(UserType.Client), authorizedResponse);

export default router;
