import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authService, userService } from '../../services';
import { message, userConstant } from '../../constant';
import { ResourceNotFoundError, UnauthorizedError } from '../../constant/error';
import { createUserSchema, updateUserSchema } from './schemas/userSchema';
import models from '../../models';

const router = Router();
const { authorize } = authService;
const { UserType } = userConstant;

router.get('/', authorize(UserType.Admin), async (req, res, next) => {
  const users = await userService.findUsers().catch(next);
  res.send(users);
});

router.get('/me', authorize(), async (req, res, next) => {
  const user = await userService.findUser(req.user.id).catch(next);
  res.send(user);
});

router.get('/:id', async (req, res, next) => {
  const user = await userService.findUser(req.params.id).catch(next);
  res.send(user);
});

// router.post('/', celebrate(createUserSchema), async (req, res, next) => {
//   const createdUser = await userService.createUser(req.body).catch(next);
//   res.send(createdUser);
// });

// router.put('/', authorize(), celebrate(updateUserSchema), async (req, res, next) => {
//   const relatedUser = req.body._id === req.user.id;
//   if (!relatedUser) return next(new UnauthorizedError(message.UNABLE_TO_UPDATE_DIFFERENT_USER));

//   const updatedUser = await userService.updateUser(req.body).catch(next);
//   return res.send(updatedUser);
// });

// router.delete('/:id', authorize(UserType.Admin), async (req, res, next) => {
//   const userId = req.params.id;
//   const deletedUser = await userService.deleteUser(userId).catch(next);
//   if (!deletedUser) return next(new ResourceNotFoundError(models.User, userId));

//   return res.send(deletedUser);
// });

export default router;
