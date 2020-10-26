import Link from 'next/link';

import { ProfileImage } from '@components/common/images';
import { WebsiteList, PostGrid } from '@components/common/authors';
import { SocialLink } from '@components/common';

const FollowList = ({ title, twitter_url, facebook_url }) => {
    if (!twitter_url || !facebook_url) return <></>;
    const socialLinks = [];
    if (twitter_url)
        socialLinks.push({
            url: facebook_url,
            className: 'social-link',
            icon: 'facebook'
        });
    if (facebook_url)
        socialLinks.push({
            url: twitter_url,
            className: 'social-link',
            icon: 'twitter'
        });
    return (
        <>
            <h6>{title}</h6>
            <div className="social-share">
                {socialLinks.map((s) => (
                    <SocialLink {...s} />
                ))}
            </div>
        </>
    );
};

export const AuthorData = ({ posts, ...author }) => {
    const { profile_image, name, slug, website, location, twitter_url, facebook_url } = author;
    return (
        <>
            <header>
                {profile_image && <ProfileImage {...author} className="display-inline-block" />}
                <h5>
                    <Link href={slug}>
                        <a>{name}</a>
                    </Link>
                </h5>
            </header>
            {(website || location) && (
                <WebsiteList
                    title={`Author Website${(location && 's') || ''}`}
                    location={location}
                    website={website}
                />
            )}
            <FollowList title="Follow on" twitter_url={twitter_url} facebook_url={facebook_url} />
            <PostGrid posts={posts} {...author} />
        </>
    );
};

export default AuthorData;
