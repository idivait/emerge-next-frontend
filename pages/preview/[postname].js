import Link from 'next/link'
import Layout from '@components/Layout'
import Post from '@components/Post'
import { getPreviewPostBySlug } from 'lib/adminapi'

export default function BlogPost({ siteTitle, content }) {
    if(!content) return <></>
  return (
    <>
      <Layout pageTitle={`${siteTitle} | ${content.title}`}>
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

export async function getServerSideProps({ ...ctx }) {
  const { postname } = ctx.params
  const content = await getPreviewPostBySlug(postname)
  const config = await import(`../../siteconfig.json`)

  return {
    props: {
      siteTitle: config.title,
      content: content || null
    },
  }
}
