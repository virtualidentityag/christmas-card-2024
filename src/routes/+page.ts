import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
  const leads = await fetch(`${url.origin}/api/leaderboard`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': url.origin,
    },
  }).then(res => res.json())

  return {
    leads,
  }
};