import type { RequestHandler } from '@sveltejs/kit';
import StoryblokClient from "storyblok-js-client";

const getDB = async () => {
  const spaceId = '314588';
  const Storyblok = new StoryblokClient({
    accessToken: 'pQ5I379xF9PDfxF8SvJmOAtt',
    oauthToken: 'Qm1gsIKIN65VpQczsBXADQtt-76480-GRsqzEnVvEPJrShv64yR',
  });

  return {
    store: async ({ username, score }) => {
      const response = await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: username,
          slug: username.toLowerCase().replace(/\s/g, '-'),
          content: {
            component: 'score',
            score: String(score),
            username: String(username),
          }
        },
        publish: 1,
      });

      return sanitize(response.data.story);
    },
    getAll: async () => {
      const params = new URLSearchParams();
      params.append('contain_component', 'score');
      params.append('sort_by', 'content.score:desc');
      params.append('with_summary', '1');
      const { data } = await Storyblok.get(`spaces/${spaceId}/stories?${params.toString()}`);

      return data.stories.map(sanitize);
    }

  }
};

const sanitize = (story: any) => {
  return {
    username: (story.content_summary || story.content)?.username,
    score: (story.content_summary || story.content)?.score,
  };
}

export const GET: RequestHandler = async ({ url }) => {
  const db = await getDB();
  const leads = await db.getAll();

  return new Response(JSON.stringify(leads));
};

export const POST: RequestHandler = async ({ request }) => {
  const db = await getDB();
  const data = await request.json();
  console.log(data);


  const response = await db.store(data);

  return new Response(JSON.stringify(response.story));
};
