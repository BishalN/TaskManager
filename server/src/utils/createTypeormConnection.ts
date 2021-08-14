import { getConnectionOptions, createConnection } from 'typeorm';
import { User } from '../entity/User';
import { Task } from '../entity/Task';

export const createTypeormConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return process.env.NODE_ENV === 'production'
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [User, Task],
        name: 'default',
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
      } as any)
    : createConnection({ ...connectionOptions, name: 'default' });
};
