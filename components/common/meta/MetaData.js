import PropTypes from 'prop-types';
import url from 'url';

// TODO Finish fixing metadata
import ArticleMeta from './ArticleMeta';
import WebsiteMeta from './WebsiteMeta';
import AuthorMeta from './AuthorMeta';
import config from '@config';

/**
 * MetaData will generate all relevant meta data information incl.
 * JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
 *
 */
const MetaData = ({ data, settings, title, description, image, location, type }) => {
    const canonical = url.resolve(config.url, location.pathname);

    if (type === 'article') {
        return <ArticleMeta settings={settings} data={data} canonical={canonical} />;
    } else if (type === 'tag') {
        return <WebsiteMeta settings={settings} data={data} canonical={canonical} type="Series" />;
    } else if (type === 'author') {
        return <AuthorMeta settings={settings} data={data} canonical={canonical} />;
    } else if (type === 'page') {
        return (
            <WebsiteMeta
                data={data}
                canonical={canonical}
                type="WebSite"
                config={config}
                settings={settings}
            />
        );
    } else {
        title = title || config.title || settings.title;
        description = description || config.description || settings.description;
        image = image || settings.cover_image || null;

        image = image ? url.resolve(config.url, image) : null;

        return (
            <WebsiteMeta
                settings={settings}
                data={data}
                canonical={canonical}
                title={title}
                description={description}
                image={image}
                type="WebSite"
            />
        );
    }
};

MetaData.defaultProps = {
    data: {}
};

MetaData.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.object,
        ghostTag: PropTypes.object,
        ghostAuthor: PropTypes.object,
        ghostPage: PropTypes.object
    }),
    settings: PropTypes.object.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default MetaData;
