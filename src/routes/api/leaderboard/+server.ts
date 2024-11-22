
import type { RequestHandler } from '@sveltejs/kit';
import { JSONFilePreset } from 'lowdb/node';

const getDB = async () => {
  const db = await JSONFilePreset('db.json', { leads: [] });
  db.write();
  return db;
};

export const GET: RequestHandler = async ({ url }) => {
  const db = await getDB();

  return new Response(JSON.stringify([...db.data.leads].sort((a, b) => b.score - a.score)));
};

export const POST: RequestHandler = async ({ request }) => {
  const db = await getDB();

  const data = await request.json();

  db.data.leads.push(data);
  db.write();

  return new Response(JSON.stringify(db.data.leads));
};
