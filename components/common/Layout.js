import PropTypes from 'prop-types';
import Head from 'next/head';

import { Header, Footer, PreviewBar } from './structure';
import { Component } from 'react';

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
class DefaultLayout extends Component {
    render() {
        const { site, children, bodyClass, preview } = this.props;
        // const twitterUrl = site.twitter
        //     ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        //     : null;
        // const facebookUrl = site.facebook
        //     ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
        //     : null;

        return (
            <>
                <Head>
                    <html lang={site.lang} />
                    <title>{site.title}</title>
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css"
                    />
                    <style type="text/css">{`${site.codeinjection_styles}`}</style>
                    <link
                        href="//fonts.googleapis.com/css?family=Playfair+Display:400,400italic%7CRoboto:400,700%7CDroid+Serif"
                        rel="stylesheet"
                        type="text/css"></link>
                    <body className={bodyClass} />
                    <script
                        type="text/javascript"
                        src="//code.jquery.com/jquery-1.12.0.min.js"></script>
                    <script
                        type="text/javascript"
                        src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
                    {site.codeinjection_head}
                </Head>
                {preview && <PreviewBar {...preview} />}
                <Header site={site} />
                <div className="site-wrapper">
                    {children}
                    <Footer site={site} />
                </div>
            </>
        );
    }
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    site: PropTypes.object.isRequired
};

export default DefaultLayout;
