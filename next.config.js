const withReactSvg = require('next-react-svg');
const path = require('path');

module.exports = withReactSvg({
    target: 'serverless',
    include: path.resolve(__dirname, 'images/svg'),
    webpack(config) {
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/rss',
                destination: '/rss.xml' // Matched parameters can be used in the destination
            },
            {
                source: '/',
                destination: '/tag/hash-current/1'
            },
            {
                source: '/tag/:slug',
                destination: '/tag/:slug/1'
            }
        ];
    }
});
