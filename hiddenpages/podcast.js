// TODO: Page component based of WCDH podcast feed
// https://anchor.fm/s/10b39e34/podcast/rss

import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
// import Head from 'next/head';

import { Layout, FeedTemplate, WidgetWrapper } from '@components/common';
import { SidebarLayout } from '@components/common/structure';
import { Card } from '@components/common/cards';
import { MetaData } from '@components/common/meta';
import { getSiteSettings } from '@lib/contentapi';
import { getFeedAsJson } from '@lib/feed';
import { Converter } from 'showdown';
import config from '@config';

const stripHeaders = {
    type: 'lang',
    regex: /#{0,7}/g,
    replace: ''
};

var noMorePsExt = {
    type: 'output',
    filter: function (text, converter) {
        var re = /<\/?p[^>]*>/gi;
        text = text.replace(re, '');
        return text;
    }
};

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Podcast = ({ settings, info, items }) => {
    const { title, description, link, image } = info;
    const location = new URL(`${config.url}/podcast`);
    // TODO: Finish Featured for podcast
    const FeaturedHeading = () => (
        <div className="thumb featured">
            <h2>{title}</h2>
            <p>{description}</p>
            <a href={link}>More info</a>
        </div>
    );
    const ContentCard = ({
        author,
        itunes_summary,
        created,
        itunes_duration,
        title,
        url,
        enclosures
    }) => {
        url = url.replace(/(http|https):/gm, ``);
        const styles = {
            display: '-webkit-box',
            WebkitLineClamp: 8,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
            // maxWidth: '200px'
        };
        const embedStyles = {
            width: '100%'
        };
        const audioFile = enclosures[0].url;
        return (
            <Card url={url} external={true} image={image}>
                <a href={url}>
                    <h5>{title}</h5>
                </a>
                <div className="meta small" style={styles}>
                    <div dangerouslySetInnerHTML={{ __html: itunes_summary }}></div>
                </div>
                <ReactAudioPlayer src={audioFile} style={embedStyles} controls />
            </Card>
        );
    };
    const Content = () => (
        <>
            {items.map((item, i) => (
                <ContentCard key={i} {...item} />
            ))}
        </>
    );
    const Sidebar = () => <WidgetWrapper site={settings} />;
    return (
        <>
            {/* TODO: Figure out type. */}
            <MetaData settings={settings} location={location} />
            {/* <Head>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Head> */}
            <Layout site={settings} preview={preview}>
                <SidebarLayout
                    featured={<FeaturedHeading />}
                    content={<Content />}
                    sidebar={<Sidebar />}
                />
            </Layout>
        </>
    );
};

Podcast.propTypes = {
    items: PropTypes.array,
    info: PropTypes.object,
    settings: PropTypes.object
};

export default Podcast;

export async function getStaticProps({ preview, ...ctx }) {
    const settings = await getSiteSettings();
    const { items, ...info } = await getFeedAsJson(`https://anchor.fm/s/10b39e34/podcast/rss`);

    const props = {
        settings,
        items,
        info,
        preview
    };

    return {
        props
    };
}

// TODO: Paginate the podcasts episodes
