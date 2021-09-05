import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import userService from './userService';
import roomService from './roomService';
import { UnauthorizedError } from '../../constant/error';
import { message, userConstant } from '../../constant';
import { cryptoUtil } from '../../util';

const jwtKey = process.env.JWT_SECRET_KEY;
const publicPath = ['/', '/auth/login', '/status'];
const { UserType } = userConstant;

const login = async ({ username, roomId }) => {
  const user = await userService.findUserByUsername(username);
  if (!user) throw new UnauthorizedError(message.WRONG_USERNAME);
  
  const roomChat = await roomService.findRoomByRoomId(roomId);
  if (!roomChat) throw new UnauthorizedError(message.WRONG_ROOM_ID);
  
  const token = generateToken(user);
  return { user, token };
};

const generateToken = (user) => {
  const payload = {
    id: user._id,
    username: user.username,
    type: user.type,
  };

  return jwt.sign(payload, jwtKey);
};

const authorize = (userTypes = []) => {
  if (typeof userTypes === 'string') userTypes = [userTypes];

  return [
    // Authenticate JWT token and attach payload to request object (req.user)
    expressJwt({ secret: jwtKey, algorithms: ['HS256'] }).unless({
      path: publicPath,
    }),

    // Authorize based on user type
    (req, res, next) => {
      if (userTypes.length && !userTypes.includes(req.user.type) && req.user.type !== UserType.Admin) {
        throw new UnauthorizedError();
      }

      // authentication and authorization successful
      next();
    },
  ];
};

const authService = {
  login,
  authorize,
};

export default authService;
