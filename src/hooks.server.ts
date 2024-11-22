import { error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ resolve, event }) => {
  let cors = '';
  if (event.url.pathname.startsWith('/api')) {

    /* regex matching all localhost:5173 and netlify.app domains */
    const validDomains = /^(localhost|127\.0\.0\.1|[\w-]+\.netlify\.app)$/;

    let originDomain = null;

    try {
      if (event.request.headers.get('origin') !== null) {
        originDomain = new URL(event.request.headers.get('origin') || '').hostname;
        if (validDomains.test(originDomain)) {
          cors = `https://${originDomain}`
        } else {
          error(403, 'Invalid origin');
        }
      }
    } catch (e) {
      console.log('error', e);

      // error(403, 'Invalid origin');
    }
    // Apply CORS header for API routes
    // Required for CORS to work
    if (event.request.method === 'OPTIONS' && cors) {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Origin': cors,
          'Access-Control-Allow-Headers': '*',
        }
      });
    }
  }

  const response = await resolve(event);
  if (event.url.pathname.startsWith('/api')) {
    response.headers.append('Access-Control-Allow-Origin', cors);
  }
  return response;
};