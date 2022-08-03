import fastify, { FastifyInstance } from 'fastify';
import fastifyNext from '@fastify/nextjs';
import handler from './routes';

function createServer(): FastifyInstance {
  const server = fastify({ logger: true });
  server.register(fastifyNext)
    .after(() => {
      server.next('/map');
    });

  server.register(handler, { prefix: '/api' });

  return server;
}

export default createServer;