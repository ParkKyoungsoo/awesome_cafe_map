import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { getGeocode } from "./api/addressToGeocode";

const handler: FastifyPluginCallback = (server, opts, next) => {
  server.post('/geocode',
    async (req: any, res) => getGeocode(server, req, res));

  next();
}

export default handler;