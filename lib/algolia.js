import algoliasearch from "algoliasearch";
const { ALGOLIA_API_KEY, NEXT_PUBLIC_ALGOLIA_APP_ID } = process.env;
const client = algoliasearch(NEXT_PUBLIC_ALGOLIA_APP_ID, ALGOLIA_API_KEY);

export async function updatePostIndex(posts) {
  const index = client.initIndex("ghost_posts");
  const objects = posts.map(({ id, title, slug, excerpt, primary_author }) => ({
    objectID: id,
    title,
    slug,
    excerpt,
    primary_author: {
      name: primary_author.name,
      slug: primary_author.slug,
    },
  }));

  return index.partialUpdateObjects(objects)
}
