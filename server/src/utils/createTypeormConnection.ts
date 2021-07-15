import { createConnection } from "typeorm";

export const createTypeormConnection = async () => {
  const conn = await createConnection();
  return conn;
};
