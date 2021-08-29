import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authService, roomService } from '../../services';
import { message, userConstant } from '../../constant';
import { ResourceNotFoundError, UnauthorizedError } from '../../constant/error';
import { createUserSchema, updateUserSchema } from './schemas/userSchema';
import models from '../../models';

const router = Router();
const { authorize } = authService;
const { UserType } = userConstant;

// router.get('/chatRoom', authorize(UserType.Client), async (req, res, next) => {
//   const users = await userService.findUsers().catch(next);
//   res.send(users);
// });

router.get('/:roomId', async (req, res, next) => {
  const room = await roomService.findRoomByRoomId(req.params.roomId).catch(next);
  res.send(room);
});

export default router;
