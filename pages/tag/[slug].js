import PropTypes from "prop-types";

// import {
//     Layout,
//     Pagination,
//     WidgetWrapper,
//     Featured,
//     SlickSlider,
// } from "@components/common";
// import { PostCard } from "@components/common/cards";
import { MetaData } from "@components/common/meta";
import { getAllTags, getPostsByTag } from "@lib/adminapi"

/**
 * Main Sidebar page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Sidebar = ({ content, url, slug, ... props }) => {
    // const isHome = false;
    // const posts = data.posts.edges;
    // const tag = data.tag;
    // const letters = data.letters.edges;
    // const featured = data.featured.edges;
    // const tagLetter = letters.reduce((result, curr, i) => {
    //     let lettags = curr.node.tags;
    //     if (lettags.find((t) => t.slug === tag.slug)) {
    //         return curr.node;
    //     }
    //     return result;
    // }, null);

    return (
        <>
            <MetaData location={`${location}/${slug}`} />
            {/*
            <Layout isHome={true}>
                <main id="content" className="content" role="main">
                    <div className="container container-masonry">
                        <div className="inner">
                            <div className="row">
                                <div className="col-sm-9">
                                    <div className="row posts-grid">
                                        <div className="box carousel-wrapper">
                                            <SlickSlider>
                                                {!tagLetter && !isHome && (
                                                    <Featured
                                                        key={tag.id}
                                                        tag={tag}
                                                    />
                                                )}
                                                {tagLetter && (
                                                    <Featured
                                                        key={tagLetter.id}
                                                        post={tagLetter}
                                                    />
                                                )}
                                                {featured.map(({ node }) => (
                                                    <Featured
                                                        key={node.id}
                                                        post={node}
                                                    />
                                                ))}
                                            </SlickSlider>
                                        </div>
                                        {posts.map(({ node }) => {
                                            // Exclude letters
                                            if (
                                                node.tags.find(
                                                    (tag) =>
                                                        tag.name === "#letter"
                                                )
                                            ) {
                                                return;
                                            }
                                            // The tag below includes the markup for each post - components/common/PostCard.js
                                            return (
                                                <PostCard
                                                    key={node.id}
                                                    post={node}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="row">
                                        <Pagination
                                            pageContext={pageContext}
                                            className="col-sm-12"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <WidgetWrapper />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout> */}
        </>
    );
};

Sidebar.propTypes = {
    // data: PropTypes.shape({
    //     posts: PropTypes.object.isRequired,
    //     tag: PropTypes.object.isRequired,
    //     letters: PropTypes.object.isRequired,
    //     featured: PropTypes.object.isRequired,
    // }).isRequired,
    // location: PropTypes.shape({
    //     pathname: PropTypes.string.isRequired,
    // }).isRequired,
    // pageContext: PropTypes.object,
};

export default Sidebar;

// TODO: Generate data props per page.
// Includes:
//  - All of the posts for the tag
//  - All featured posts
//  - Letter for the posts if there is one
//  - Tag metadata
export async function getStaticProps({ ...ctx }) {
    console.log(ctx)
    const { slug : tagSlug } = ctx.params
    const content = await getPostsByTag(tagSlug, {limit : 7})
    const config = await import(`../../siteconfig.json`)
  
    return {
      props: {
        url: config.url,
        slug: tagSlug,
        siteTitle: config.title,
        content: content || null
      },
    }
  }
  
  // Make a static page for each tag
  export async function getStaticPaths() {
    const tagSlugs = await getAllTags()
  
    const paths = tagSlugs.map((tag) => `/tag/${tag.slug}`)
  
    return {
      paths, // An array of path names, and any params
      fallback: false, // so that 404s properly appear if something's not matching
    }
  }

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
const pageQuery = `
    query GhostHashCurrentQuery(
        $slug: String = "hash-current"
        $limit: Int!
        $skip: Int!
    ) {
        tag: ghostTag(slug: { eq: $slug }) {
            ...GhostTagFields
        }
        letters: allGhostPost(
            filter: {
                tags: { elemMatch: { slug: { eq: "hash-letter" } } }
                visibility: { eq: "public" }
            }
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
        featured: allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: {
                featured: { eq: true }
                tags: { elemMatch: { slug: { eq: $slug, ne: "hash-letter" } } }
            }
            limit: 5
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
        posts: allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
            limit: $limit
            skip: $skip
        ) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
    }
`;
