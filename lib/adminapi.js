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
        filter: `status:'draft'+slug:'${slug}'`
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
        filter: `status:'published'+slug:'${slug}'`,
        ...defaultParams
    };
    try {
        const [post] = await api.posts.browse({ ...params, ...options });
        return post;
    } catch (error) {
        // Don't throw if an slug doesn't exist
        if (is404(error)) return;
        handleError(error);
    }
}

export async function getPostsByTag(slug, options) {
    // TODO: Figure out how to resolve options.filter properly
    // TODO Paginate requests
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

export async function getAllPosts() {
    const params = {
        limit: 'all',
        filter: "status:'published'"
    };
    try {
        const posts = await api.posts.browse(params);
        return posts;
    } catch (error) {
        handleError(error);
    }
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
