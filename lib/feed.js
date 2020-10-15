import Feed from 'rss-to-json';
import { handleError } from '@lib/utils';

export const getFeedAsJson = async (url) => {
    try {
        const json = await Feed.load(url);
        return json;
    } catch (err) {
        console.log(err);
        handleError(err);
    }
};
