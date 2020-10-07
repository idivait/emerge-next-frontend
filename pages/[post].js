import PropTypes from 'prop-types';
import Head from 'next/head';

import { Layout } from '@components/common';
import { MetaData } from '@components/common/meta';
import { PostTemplate } from '@components/common/articles';
import { getAllPosts, getPostBySlug } from '@lib/adminapi';
import { getSiteSettings } from '@lib/contentapi';

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ settings, ...postProps }) => {
    const { post } = postProps;
    return (
        <>
            <MetaData
                data={post}
                settings={settings}
                location={{ pathname: post.slug }}
                type="article"
            />
            <Head>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Head>
            <Layout site={settings}>
                <PostTemplate {...postProps} />
            </Layout>
        </>
    );
};

Post.propTypes = {
    // data: PropTypes.shape({
    //     ghostPost: PropTypes.shape({
    //         authors: PropTypes.object,
    //         codeinjection_styles: PropTypes.object,
    //         title: PropTypes.string.isRequired,
    //         html: PropTypes.string.isRequired,
    //         feature_image: PropTypes.string,
    //         published_at: PropTypes.string,
    //         primary_author: PropTypes.shape({
    //             cover_image: PropTypes.string,
    //             slug: PropTypes.string,
    //             name: PropTypes.string,
    //         }),
    //         tags: PropTypes.shape({
    //             slug: PropTypes.string,
    //         }),
    //     }).isRequired,
    //     authorPosts: PropTypes.object,
    // }).isRequired,
    // location: PropTypes.object.isRequired,
};

export default Post;

// Generate post data:
// - the post
// - all authors posts
// - next and previous post stubs
// - TOC if applicable
export async function getStaticProps({ ...ctx }) {
    const { post: slug } = ctx.params;
    const settings = await getSiteSettings();
    const post = await getPostBySlug(slug);
    const { published_at } = post;

    const postParams = {
        order: `published_at`,
        include: `authors`,
        fields: `title,feature_image,slug,primary_author`
    };
    const next = await getPostBySlug('', {
        filter: `status:'published'+published_at:>${published_at}+slug:-${slug}`,
        ...postParams
    });
    const prev = await getPostBySlug('', {
        filter: `status:'published'+published_at:<=${published_at}+slug:-${slug}`,
        ...postParams
    });

    // TODO: TOS generation?

    return {
        props: {
            settings,
            post,
            next: next || null,
            prev: prev || null
        }
    };
}

export async function getStaticPaths() {
    const posts = await getAllPosts({ fields: 'slug' });
    const paths = posts.map(({ slug }) => `/${slug}`);
    return {
        paths,
        fallback: false
    };
}

export const postQuery = `
    query($slug: String!, $author: String!, $issue: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
        authorPosts: allGhostPost(
            filter: {
                primary_author: { name: { eq: $author } }
                slug: { ne: $slug }
            }
            limit: 9
        ) {
            edges {
                node {
                    ...GhostPostFields
                    authors {
                        name
                        slug
                    }
                }
            }
        }
        TOC: allGhostPost(
            sort: { order: DESC, fields: [published_at] }
            filter: {
                tags: { elemMatch: { name: { eq: $issue, nin: "#letter" } } }
            }
        ) {
            edges {
                node {
                    authors {
                        name
                        slug
                    }
                    id
                    title
                    slug
                    primary_author {
                        name
                        slug
                    }
                }
            }
        }
    }
`;
