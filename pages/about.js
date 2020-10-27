import Layout from '@components/Layout'

const About = ({ title, description, url, preview, ...props }) => {
  return (
    <>
      <Layout pageTitle={`${title} | About`} url={url} description={description} preview={preview}>
        <h1 className="title">Welcome to this demo blog!</h1>

        <p className="description">
          This is a simple blog built with Next, easily deployable on{' '}
          <a href="https://url.netlify.com/r1j6ybSYU">Netlify</a>.
        </p>

        <p>
          You can check out the{' '}
          <a href="https://github.com/cassidoo/next-netlify-blog-starter">
            repo here.
          </a>{' '}
          If you'd like to build it yourself,{' '}
          <a href="https://url.netlify.com/ByVW0bCF8">
            here is a tutorial on how to do so
          </a>
          !
        </p>

        <p>
          This project includes a basic layout and header, base styles, dynamic
          routing with getStaticPaths, and posts saved as Markdown.
        </p>
      </Layout>
    </>
  )
}

export default About

export async function getStaticProps({preview}) {
  const configData = await import(`../siteconfig.json`)

  return {
    props: {
      url: configData.url,
      title: configData.title,
      description: configData.description,
      preview: preview || null
    },
  }
}
