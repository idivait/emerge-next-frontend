import _ from 'lodash';
export const generateRssItem = ({ slug, title, description, date }, { subpath, url }) => `
<item>
  <guid>${url}${subpath ? `/${subpath}` : ``}/${slug}</guid>
  <title>${_.escape(title)}</title>
  <link>${url}${subpath ? `/${subpath}` : ``}/${slug}</link>
  <description>${_.escape(description)}</description>
  <pubDate>${new Date(date).toUTCString()}</pubDate>
</item>
`;

export const generateRss = (posts, { title, subpath, url, description }) => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${_.escape(title)}</title>
      <link>${url}</link>
      <description>${_.escape(description)}</description>
      <language>en</language>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${url}/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map((post) => generateRssItem(post, { subpath, url })).join('')}
    </channel>
  </rss>
`;
