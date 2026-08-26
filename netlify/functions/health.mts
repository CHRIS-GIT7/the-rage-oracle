import type { Config, Context } from '@netlify/functions';

export default async function handler(req: Request, context: Context) {
  return Response.json({
    status: 'ok',
    service: 'The Rage Oracle™ — Brand Assessment Engine',
    timestamp: new Date().toISOString(),
  });
}

export const config: Config = {
  path: '/api/health',
};
