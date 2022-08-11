import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export async function getCafeAddress(
  server: FastifyInstance,
  req: FastifyRequest,
  res: FastifyReply
): Promise<void> {

  const callMarkdown = await fetch('https://github.com/utilForever/awesome-cafe/blob/main/README.md', {
    method: 'GET'
  });

  const callMarkdonwToText = await callMarkdown.text();

  // console.log(callMarkdonwToText);

  res.code(200).send({
    callMarkdonwToText
  });


}