import GhostAdminAPI from '@tryghost/admin-api'
const { GHOST_ADMIN_API, GHOST_API_URL } = process.env
const api = new GhostAdminAPI({
    url: GHOST_API_URL,
    version: "v3",
    key: GHOST_ADMIN_API
});

const is404 = (error) => /not found/i.test(error.message)

export async function getPreviewPostBySlug(slug) {
    const params = { 
        limit: 'all',
        filter: `status:'draft'+slug:'${slug}'` 
    }
    try {
        const [ post ] = await api.posts.browse(params)
        return post
    } catch (error) {
        // Don't throw if an slug doesn't exist
        if (is404(error)) return
        throw error
    }
}

export async function getPostBySlug(slug) {
    const params = { 
        limit: 'all',
        filter: `status:'published'+slug:'${slug}'` 
    }
    try {
        const [ post ] = await api.posts.browse(params)
        return post
    } catch (error) {
        // Don't throw if an slug doesn't exist
        if (is404(error)) return
        throw error
    }
}

export async function getPostsByTag(slug, options){
    // TODO: Figure out how to resolve options.filter properly
    // TODO Paginate requests
    const params = { 
        limit: 'all',
        filter: `status:'published'+tag:'${slug}'` 
    }
    if (options.filter) options.filter = `${params.filter}+${options.filter}`
    try {
        const posts = await api.posts.browse({...params, ...options})
        return posts
    } catch (error) {
        // Don't throw if an slug doesn't exist
        if (is404(error)) return
        throw error
    }
}

export async function getAllPosts() {
    const params = {
        limit : 'all',
        filter: "status:'published'"
    }
    try {
        const posts = await api.posts.browse(params)
        return posts
    } catch(err){
        console.error(err)
        throw err
    }
}

export async function getAllSlugs() {
    const params = {
        limit : 'all',
        filter: "status:'published'",
        fields: 'slug'
    }
    try {
        const posts = await api.posts.browse(params)
        return posts
    } catch(err){
        console.error(err)
        throw err
    }
}

export async function getAllTags(options){
    const params = {
        limit: 'all',
        fields: 'slug'
    }
    // TODO: Implement tags api
    try {
        const tags = await api.tags.browse(params)
        return tags
    } catch(err){
        console.error(err)
        throw err
    }

}

export async function getGhostSettings(options){
    // TODO: Implement settings api.
}