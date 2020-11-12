import { readingMinutes } from './utils';

export function readingTime(post, options = {}) {
    const minuteStr = typeof options.minute === 'string' ? options.minute : '1 min read';
    const minutesStr = typeof options.minutes === 'string' ? options.minutes : '% min read';

    if (!post.html && !post.reading_time) {
        return '';
    }

    let imageCount = 0;

    if (post.feature_image) {
        imageCount += 1;
    }

    const time = post.reading_time || readingMinutes(post.html, imageCount);
    let readingTime = '';

    if (time <= 1) {
        readingTime = minuteStr;
    } else {
        readingTime = minutesStr.replace('%', time);
    }

    return readingTime;
}
