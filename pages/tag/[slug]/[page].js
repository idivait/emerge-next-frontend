import { times } from 'lodash';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
import { Layout, WidgetWrapper, Featured, SlickSlider } from '@components/common';
import { SidebarLayout } from '@components/common/structure';
import { PostCard } from '@components/common/cards';
import { MetaData } from '@components/common/meta';
import { getAllTags, getPostsByTag, getTag } from '@lib/adminapi';
import { getSiteSettings } from '@lib/contentapi';

import config from '@config';

const tagPageSlug = (tag, page) => `/tag/${tag}/${page}`;

/**
 * Main Sidebar page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Sidebar = ({ posts, tags, letter, featured, tag, slug, settings, pageContext, preview }) => {
    const FeaturedPosts = () => (
        <SlickSlider>
            {!letter && <Featured key={tag.id} tag={tag} />}
            {letter && <Featured key={letter.id} post={letter} />}
            {featured.map((node) => (
                <Featured key={node.id} post={node} />
            ))}
        </SlickSlider>
    );
    const Content = () => (
        <>
            {posts.map((node) => {
                // Exclude letters
                if (node.tags.find((tag) => tag.name === '#letter')) {
                    return;
                }
                // The tag below includes the markup for each post - components/common/PostCard.js
                return <PostCard key={node.id} post={node} />;
            })}
        </>
    );
    const Widgets = () => (
        <WidgetWrapper site={{ description: settings.description }} tags={tags} />
    );
    return (
        <>
            <MetaData type="tag" location={{ pathname: slug }} settings={settings} />
            <Layout isHome={true} site={settings} preview={preview} >
                <SidebarLayout
                    featured={<FeaturedPosts />}
                    content={<Content />}
                    sidebar={<Widgets />}
                    pageContext={pageContext}
                />
                {/* <main id="content" className="content" role="main">
                    <div className="container container-masonry">
                        <div className="inner">
                            <div className="row">
                                <div className="col-sm-9">
                                    <div className="row posts-grid">
                                        <div className="box carousel-wrapper">
                                            <SlickSlider>
                                                {!letter && <Featured key={tag.id} tag={tag} />}
                                                {letter && (
                                                    <Featured key={letter.id} post={letter} />
                                                )}
                                                {featured.map((node) => (
                                                    <Featured key={node.id} post={node} />
                                                ))}
                                            </SlickSlider>
                                        </div>
                                        {posts.map((node) => {
                                            // Exclude letters
                                            if (node.tags.find((tag) => tag.name === '#letter')) {
                                                return;
                                            }
                                            // The tag below includes the markup for each post - components/common/PostCard.js
                                            return <PostCard key={node.id} post={node} />;
                                        })}
                                    </div>
                                    /* TODO: Fix Pagination component 
                                    <div className="row">
                                        <Pagination
                                            pageContext={pageContext}
                                            className="col-sm-12"
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <WidgetWrapper
                                        site={{ description: settings.description }}
                                        tags={tags}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main> */}
            </Layout>
        </>
    );
};

Sidebar.propTypes = {
    posts: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
    letter: PropTypes.object,
    featured: PropTypes.array,
    tag: PropTypes.object,
    url: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired,
    page: PropTypes.string
};

export default Sidebar;

// Generate data props per page.
// Includes:
//  - All of the posts for the tag
//  - All featured posts
//  - Letter for the posts if there is one
//  - Tag metadata

// TODO: Limit pages by config setting
export async function getStaticProps({ preview, ...ctx }) {
    const { slug: tagSlug, page } = ctx.params;
    const totalPages = 7;
    const tag = await getTag(tagSlug, { include: 'count.posts' });
    const posts = await getPostsByTag(tagSlug, { limit: totalPages, page });
    const letter = await getPostsByTag(tagSlug, {
        filter: `status:'published'+tag:'hash-letter'+tag:'${tagSlug}'`,
        limit: 1
    });

    const all_tags = await getAllTags({ fields: null, include: 'count.posts' });
    const tags = all_tags.reduce((total, { id, slug, name, count }) => {
        const t = {
            id,
            slug,
            name,
            postCount: count.posts
        };
        if (t.postCount === 0) return total;
        total.push(t);
        return total;
    }, []);
    const settings = await getSiteSettings();
    // TODO figure out sort based on
    // { order: DESC, fields: [published_at] }
    const featured = await getPostsByTag(tagSlug, {
        filter: `status:'published'+tag:${tagSlug}+featured:true`,
        limit: 5,
        order: 'DESC published_at'
    });

    // const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext
    const fullPath = `${config.url}${tagPageSlug(tagSlug, page)}`;
    const pageContext = {
        fullPath,
        ...posts.meta.pagination
    };

    const props = {
        url: config.url,
        slug: tagSlug,
        pageContext: pageContext || null,
        siteTitle: config.title,
        tag: tag || null,
        letter: letter.length > 0 ? letter[0] : null,
        featured: featured || null,
        posts: posts || null,
        tags: tags || null,
        settings: settings || null,
        preview: preview || null
    };

    return {
        props
    };
}

// Make a static page for each tag and each page for the tag
export async function getStaticPaths() {
    const tagSlugs = await getAllTags({ limit: 'all', fields: 'slug' });

    // Loop through tags and gets post meta base on limit.
    // For each page in the pagination, generate a path then push it onto the array.
    const paths = await tagSlugs.reduce(async (arr, { slug }) => {
        // resolve the accumulator's promise
        arr = await arr;
        const posts = await getPostsByTag(slug, { limit: 7, fields: '' });
        const { pages } = posts.meta.pagination;
        times(pages, (i) => {
            arr.push(tagPageSlug(slug, i + 1));
        });
        return arr;
    }, []);

    return {
        paths, // An array of path names, and any params
        fallback: false // so that 404s properly appear if something's not matching
    };
}
