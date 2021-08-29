import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authService } from '../../services';
import authSchema from './schemas/authSchema';

const router = Router();

router.post('/login', celebrate(authSchema), async (req, res, next) => {
  try {
    const { user, token } = await authService.login(req.body);
    res.json({ type: user.type, token });
  } catch (e) {
    next(e);
  }
});

export default router;
