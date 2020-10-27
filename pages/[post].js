import PropTypes from 'prop-types';
import Head from 'next/head';

import { Layout } from '@components/common';
import { MetaData } from '@components/common/meta';
import { PostTemplate } from '@components/common/articles';
import { getAllPosts, getPostBySlug, getPreviewPostBySlug } from '@lib/adminapi';
import { getSiteSettings } from '@lib/contentapi';
import config from '@config';

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ settings, ...postProps }) => {
    const { post, preview } = postProps;
    const location = new URL(`${config.url}/${post.slug}`);
    return (
        <>
            <MetaData data={post} settings={settings} location={location} type="article" />
            <Head>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Head>
            <Layout site={settings} preview={preview}>
                <PostTemplate location={location} {...postProps} />
            </Layout>
        </>
    );
};

// TODO: Generate proptypes on post
Post.propTypes = {};

export default Post;

// Generate post data:
// - the post
// - all authors posts
// - next and previous post stubs
// - TOC if applicable
export async function getStaticProps({ ...ctx }) {
    const { preview } = ctx;
    const { post: slug } = ctx.params;
    const settings = await getSiteSettings();
    let post = null;
    if (preview) {
        console.log('Preview mode enabled.');
        post = await getPreviewPostBySlug(slug);
    } else {
        post = await getPostBySlug(slug);
    }
    
    const authorPosts = await getAllPosts({
        filter: `author:'${post.primary_author.slug}'`,
        limit: 9,
        fields: `id, slug, title, feature_image`
    });
    const { tags, plaintext, published_at } = post;
    const issue = tags.find((tag) => tag.slug.startsWith('issue'));
    const TOCparams = issue && {
        order: 'published_at DESC',
        filter: `status:'published'+tag:${issue.slug}+tag:-hash-letter`
    };
    const TOC =
        issue && plaintext.indexOf('[TableOfContents]') > -1 && (await getAllPosts(TOCparams));

    const postParams = {
        order: `published_at`,
        include: `authors`,
        fields: `title,feature_image,slug,primary_author`
    };
    const next =
        !preview &&
        (await getPostBySlug('', {
            filter: `status:'published'+published_at:>${published_at}+slug:-${slug}`,
            ...postParams
        }));
    const prev =
        !preview &&
        (await getPostBySlug('', {
            filter: `status:'published'+published_at:<=${published_at}+slug:-${slug}`,
            ...postParams
        }));

    const props = {
        settings,
        post,
        preview: preview || null,
        next: next || null,
        prev: prev || null,

        TOC: TOC || null,
        authorPosts: authorPosts.length > 0 ? authorPosts : null
    };

    return {
        props
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
