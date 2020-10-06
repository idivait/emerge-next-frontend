import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

import { Header, Footer } from "./structure";

// Styles
import "../../styles/css/font-awesome.min.css";
import "../../styles/css/style.css";
import "../../styles/css/style-dark.css";
import "../../styles/css/style-personal.css";
import "../../styles/sass/main.scss";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page. test
 *
 */
class DefaultLayout extends React.Component {
    render() {
        const { data, children, bodyClass, isHome } = this.props;
        const site = data.allGhostSettings.edges[0].node;
        const twitterUrl = site.twitter
            ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
            : null;
        const facebookUrl = site.facebook
            ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}`
            : null;

        return (
            <>
                <Helmet>
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
                        type="text/css"
                    ></link>
                    <body className={bodyClass} />
                    <script
                        type="text/javascript"
                        src="//code.jquery.com/jquery-1.12.0.min.js"
                    ></script>
                    <script
                        type="text/javascript"
                        src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"
                    ></script>
                    {site.codeinjection_head}
                </Helmet>
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
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={(data) => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
