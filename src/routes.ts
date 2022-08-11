import { FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { getGeocode } from "./api/addressToGeocode";
import { getCafeAddress } from "./api/getCafeAddress";

const handler: FastifyPluginCallback = (server, opts, next) => {
  server.post('/geocode',
    async (req: any, res) => getGeocode(server, req, res)
  );

  server.get('/getcafe',
    async (req: any, res) => getCafeAddress(server, req, res)
  );

  next();
}

export default handler;