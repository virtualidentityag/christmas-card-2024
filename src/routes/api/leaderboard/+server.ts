import { env } from '$env/dynamic/private';
import { error, type RequestHandler } from '@sveltejs/kit';
import StoryblokClient from "storyblok-js-client";

const getDB = async () => {
  const spaceId = '314588';
  const Storyblok = new StoryblokClient({
    accessToken: 'pQ5I379xF9PDfxF8SvJmOAtt',
    oauthToken: env.STORYBLOK_PAT,
  });

  return {
    store: async ({ username, score }) => {
      if (score < 100) {
        return;
      }
      if (!username) {
        username = 'Anonymous';
      }
      const slug = username.toLowerCase().replace(/\s/g, '-').trim();
      const res = await Storyblok.get(`spaces/${spaceId}/stories`, {
        filter_query: {
          username: {
            in: username,
          },
        },
      });

      const total = res.data.stories.length;
      const response = await Storyblok.post(`spaces/${spaceId}/stories`, {
        story: {
          name: total > 0 ? `${username} ${total}` : username,
          slug: total > 0 ? `${slug}-${total}` : slug,
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
      const scores = [];
      const { data, total } = await Storyblok.get(`spaces/${spaceId}/stories?with_summary=1`, {
        contain_component: 'score',
        sort_by: 'content.score:desc:int',
        per_page: 100,
      });

      if (total === 0) {
        return [];
      }
      scores.push(...data.stories.map(sanitize));
      if (total > 100) {
        const pages = Math.ceil(total / 100);
        for (let i = 2; i <= pages; i++) {
          const { data } = await Storyblok.get(`spaces/${spaceId}/stories?with_summary=1`, {
            contain_component: 'score',
            sort_by: 'content.score:desc:int',
            per_page: 100,
            page: i,
          });
          scores.push(...data.stories.map(sanitize));
        }
      }

      return scores;
    },
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
  try {
    await db.store(data);
    const leaderboard = await db.getAll();
    return new Response(JSON.stringify(leaderboard));
  } catch (e) {
    if (e.status === 422) {
      return error(409, 'Username already exists');
    }
    console.error(e);
  }

};
