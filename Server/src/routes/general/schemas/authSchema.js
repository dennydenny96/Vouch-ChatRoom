import { Joi, Segments } from 'celebrate';

const authSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().required(),
    roomId: Joi.number().required(),
  }),
};

export default authSchema;
