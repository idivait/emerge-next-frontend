import DefaultErrorPage from "next/error";
import Head from "next/head";

import Link from "next/link";
import Layout from "@components/Layout";
import Post from "@components/Post";
import { getPreviewPostBySlug } from "lib/adminapi";
import { updatePostIndex } from "@lib/algolia"

export default function BlogPost({ siteTitle, content, error }) {
//   Display 404 if there's an error in the props
  if (error) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }
  return (
    <>
      <Layout pageTitle={`${siteTitle} | ${content.title}`}>
        <div className="back">
          ←{" "}
          <Link href="/">
            <a>Back to post list</a>
          </Link>
          <Post post={content} />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ ...ctx }) {
  const { preview, res } = ctx;
  console.log("isPreview", preview);
  const { postname } = ctx.params;
  const content = await getPreviewPostBySlug(postname);
  const config = await import(`../../siteconfig.json`);

  if (!content || !preview) {
    res.statusCode = 404;
    return {
      props: {
        error: "oops",
      },
    };
  }

  return {
    props: {
      siteTitle: config.title,
      content: content || null,
    },
  };
}
