module.exports = {
  target: 'serverless',
  async redirects() {
    return [
      {
        source: '/rss',
        destination: '/rss.xml',
        permanent: true,
      },
    ]
  },
}
