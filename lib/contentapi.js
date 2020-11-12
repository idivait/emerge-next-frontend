import GhostContentAPI from '@tryghost/content-api';
import { is404, handleError } from '@lib/utils';
const { GHOST_CONTENT_API, GHOST_API_URL } = process.env;
const api = new GhostContentAPI({
    url: GHOST_API_URL,
    version: 'v3',
    key: GHOST_CONTENT_API
});

export async function getSiteSettings(options) {
    const params = {};
    try {
        const settings = await api.settings.browse({ ...params, ...options });
        return settings;
    } catch (error) {
        handleError(error);
    }
}
