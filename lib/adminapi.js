import GhostAdminAPI from '@tryghost/admin-api';
import { is404, handleError } from '@lib/utils';
const { GHOST_ADMIN_API, GHOST_API_URL } = process.env;
const api = new GhostAdminAPI({
    url: GHOST_API_URL,
    version: 'v3',
    key: GHOST_ADMIN_API
});

const defaultParams = {
    formats: 'html,plaintext',
    include: 'authors,tags'
};

export async function getPreviewPostBySlug(slug) {
    const params = {
        limit: 'all',
        filter: `slug:'${slug}'`,
        ...defaultParams
    };
    try {
        const [post] = await api.posts.browse(params);
        return post;
    } catch (error) {
        // Don't throw if an slug doesn't exist
        if (is404(error)) return;
        handleError(error);
    }
}

export async function getPostBySlug(slug, options) {
    const params = {
        limit: 1,
        filter: `slug:${slug}`,
        ...defaultParams
    };
    try {
        const mOptions = { ...params, ...options };
        mOptions.filter = encodeURI(mOptions.filter);
        // const [post] = await api.posts.browse(mOptions);
        const post = await api.posts.read({ slug: slug, ...mOptions });
        return post;
    } catch (error) {
        // Don't throw if an slug doesn't exist
        if (is404(error)) return;
        handleError(error);
    }
}

export async function getPostsByTag(slug, options) {
    const params = {
        limit: 'all',
        filter: `status:'published'+tag:'${slug}'`,
        ...defaultParams
    };
    try {
        const posts = await api.posts.browse({ ...params, ...options });
        return posts;
    } catch (error) {
        // Don't throw if an slug doesn't exist
        if (is404(error)) return;
        handleError(error);
    }
}

export async function getAllPosts(options) {
    const params = {
        limit: 'all',
        filter: "status:'published'"
    };
    try {
        const mOptions = { ...params, ...options };
        const posts = await api.posts.browse(mOptions);
        return posts;
    } catch (error) {
        handleError(error);
    }
}

export async function getPrevNext(post, type, options) {
    const { id, published_at } = post;
    if (!post.id) handleError('Must include id.');
    if (!type) handleError('Must include type.');
    if (type !== 'next' && type !== 'prev') handleError('Type must be prev or next');

    const postParams = {
        limit: 1,
        order: `published_at`,
        include: `authors`,
        fields: `title,feature_image,slug,primary_author`,
        filter: `status:'published'+id:-${id}`,
        //Let options override
        ...options
    };

    const nextParams = {
        ...postParams,
        filter: `${postParams.filter}+published_at:>${published_at}`
    };

    const prevParams = {
        ...postParams,
        order: `${postParams.order} DESC`,
        filter: `${postParams.filter}+published_at:<=${published_at}`
    };

    const params = type === 'next' ? nextParams : prevParams;

    const result = await getAllPosts(params);

    return result[0];
}

export async function getAllSlugs() {
    const params = {
        limit: 'all',
        filter: "status:'published'",
        fields: 'slug'
    };
    try {
        const posts = await api.posts.browse(params);
        return posts;
    } catch (error) {
        handleError(error);
    }
}

export async function getAllTags(options) {
    const params = {
        limit: 'all',
        fields: 'slug'
    };
    try {
        const tags = await api.tags.browse({ ...params, ...options });
        return tags;
    } catch (error) {
        handleError(error);
    }
}

export async function getTag(slug, options) {
    const params = {
        slug
    };
    try {
        const tag = await api.tags.read({ ...params, ...options });
        return tag;
    } catch (error) {
        handleError(error);
    }
}
