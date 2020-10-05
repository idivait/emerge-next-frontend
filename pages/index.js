import fs from 'fs'

import Layout from "@components/Layout";
import PostList from "@components/PostList";

import { getAllPosts } from "@lib/adminapi";
import { generateRss } from "@lib/rss";

const Index = ({ posts, title, description, url, ...props }) => {
  return (
    <>
      <Layout url={url} pageTitle={title} description={description}>
        <h1 className="title">Welcome to this demo blog!</h1>

        <p className="description">
          This is a simple blog built with Next, easily deployable on{" "}
          <a href="https://url.netlify.com/r1j6ybSYU">Netlify</a>.
        </p>
        <main>
          <PostList posts={posts} />
        </main>
        <p>
          You can look at the repository for this project{" "}
          <a href="https://github.com/cassidoo/next-netlify-blog-starter">
            here
          </a>
          , and a tutorial on how to build it {` `}
          <a href="https://url.netlify.com/ByVW0bCF8">here</a>.
        </p>
      </Layout>
      <style jsx>{`
        .title {
          margin: 1rem auto;
          font-size: 3rem;
        }
      `}</style>
    </>
  );
};

export default Index;

export async function getStaticProps() {
  const configData = await import(`../siteconfig.json`);

  const posts = await getAllPosts();

  const rss = generateRss(
    posts.map(({ slug, title, custom_excerpt, excerpt, published_at }) => ({
      slug,
      title,
      description: custom_excerpt || excerpt,
      date: published_at,
    })),
    {
      title: configData.title,
      subpath: "post",
      url: configData.url,
      description: configData.description,
    }
  );

  fs.writeFileSync('./public/rss.xml', rss);

  return {
    props: {
      posts,
      url: configData.url,
      title: configData.title,
      description: configData.description,
    },
  };
}
