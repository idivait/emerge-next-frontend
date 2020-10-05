import Link from 'next/link'
import Layout from '@components/Layout'
import Post from '@components/Post'
import { getPostBySlug, getAllPosts } from 'lib/adminapi'

export default function BlogPost({ siteTitle, url, content }) {
  return (
    <>
      <Layout url={url} pageTitle={`${siteTitle} | ${content.title}`}>
        <div className="back">
          ←{' '}
          <Link href="/">
            <a>Back to post list</a>
          </Link>
          <Post post={content} />
        </div>

      </Layout>
    </>
  )
}

export async function getStaticProps({ ...ctx }) {
  const { postname } = ctx.params
  const content = await getPostBySlug(postname)
  const config = await import(`../../siteconfig.json`)

  return {
    props: {
      url: config.url,
      siteTitle: config.title,
      content: content || null
    },
  }
}

export async function getStaticPaths() {
  const blogSlugs = await getAllPosts()

  const paths = blogSlugs.map((post) => `/post/${post.slug}`)

  return {
    paths, // An array of path names, and any params
    fallback: false, // so that 404s properly appear if something's not matching
  }
}
