import * as Joi from 'joi';

export const appConfigSchema = Joi.object({
  // APP
  NODE_ENV: Joi.string().valid('dev', 'stag', 'prod', 'test'),
  PORT: Joi.number().required(),
  API_KEY: Joi.string().required(),
  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
  // DATABASE POSTGRES
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  // TYPEORM
  TYPEORM_HOST: Joi.string().required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_PORT: Joi.number().required(),
});
