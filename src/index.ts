import dotenv from 'dotenv';
dotenv.config();

import createServer from './server';

const PORT = process.env.PORT || '3000';
const server = createServer();

const start = async () => {
  try {
    await server.listen(+PORT);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();