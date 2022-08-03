import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

interface IPostGecode {
  Body: string
}

export async function getGeocode(
  server: FastifyInstance,
  req: FastifyRequest<IPostGecode>,
  res: FastifyReply
): Promise<void> {

  const address = JSON.parse(req.body).address;

  try {
    const callGeocode = await fetch('https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=' + new URLSearchParams(address), {
      method: 'GET',
      headers: {
        'X-NCP-APIGW-API-KEY-ID': '77cjhgmasg',
        'X-NCP-APIGW-API-KEY': 'W3rFi1JgvmLjB4cadesjHCWrdSzZbdBUmMFJ7rAa',
      },
    });

    const callGeocodeJson = await callGeocode.json();
    const addresses = callGeocodeJson.addresses[0];
    const addrLatLng = {
      lat: addresses.x,
      lng: addresses.y
    };

    await res.code(200).send({
      result: 'OK',
      addrLatLng
    });

  } catch (err) {
    await res.code(500).send({
      result: ' ERR',
      err
    });
  }
}
