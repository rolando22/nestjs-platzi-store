import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  environment: process.env.NODE_ENV || 'local',
  port: Number(process.env.PORT) || 3000,
  apiKey: process.env.API_KEY || '1234',
  jwtSecret: process.env.JWT_SECRET || 'ABC123456789',
  jwtExpiration: process.env.JWT_EXPIRATION || '1d',
  database: {
    postgres: {
      user: process.env.POSTGRES_USER || '',
      host: process.env.POSTGRES_HOST || '',
      dbName: process.env.POSTGRES_DB || '',
      password: process.env.POSTGRES_PASSWORD || '',
      port: Number(process.env.POSTGRES_PORT) || 5432,
    },
    mysql: {
      user: process.env.MYSQL_USER || '',
      host: process.env.MYSQL_HOST || '',
      dbName: process.env.MYSQL_DATABASE || '',
      password: process.env.MYSQL_ROOT_PASSWORD || '',
      port: Number(process.env.MYSQL_PORT) || 3306,
    },
  },
}));
