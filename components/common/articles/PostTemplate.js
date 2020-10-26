import ReactMarkdown from 'react-markdown/with-html';
import { DateTime } from 'luxon';
import Link from 'next/link';

// import { SocialLink } from '@components/common';
import { CoverImage, ProfileImage } from '@components/common/images';
import {
    ArticleContent,
    SocialShare,
    TagList,
    OtherPost,
    AuthorData
} from '@components/common/articles';
// import WebsiteList from '@components/common/authors/WebsiteList';
import ByAuthors from '@components/common/authors/ByAuthors';

// TODO: Split this mess into multiple post components, especially the bottom widgets
// TODO: Import subcomponents
// TODO: set props
// TODO: Set proptypes

const PostTemplate = ({ post, location, next, prev, TOC, authorPosts }) => {
    const { primary_author: author, tags: alltags } = post;
    const published_at = DateTime.fromISO(post.published_at).toLocaleString(DateTime.DATETIME_MED);
    const tags = alltags.sort((a, b) =>
        a.name.localeCompare(b.name, `en`, { sensitivity: `base` })
    );
    let imgOpt = { w: 1060, h: 640 };
    let imgOptSm = { w: 1060, h: 640, q: 1 };

    const ColRow = ({ cols }) => {
        const num = cols.length;
        return (
            <div className="row">
                {cols.map(({ title, content }, i) => (
                    <div key={i} className={`col-sm-${12 / num} ${title}`}>
                        {content}
                    </div>
                ))}
            </div>
        );
    };

    const AuthorBio = ({ bio }) =>
        bio && (
            <>
                <h5>About the Author</h5>
                <ReactMarkdown source={bio} escapeHtml={false} />
            </>
        );

    const AuthorPosts = ({ posts }) => {
        return <></>;
    };
    return (
        <main id="content" role="main" className="post-template">
            <div className="container">
                <CoverImage small={imgOptSm} large={imgOpt} {...post} />
                <div className="row">
                    <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
                        <ArticleContent post={post} TOC={TOC} />

                        <div className="row">
                            <div className="col-sm-6">
                                <SocialShare location={location} title="Share This" />
                            </div>
                            <div className="col-sm-6">
                                <TagList tags={post.tags} title="Tagged:" />
                            </div>
                        </div>
                        <div className="clear"></div>
                        <div className="sep margin-2"></div>
                        <h5>Continue Reading</h5>
                        <div className="owl-carousel owl-thumbs-2 continue-reading">
                            <div className="row">
                                {prev && <OtherPost type="prev" {...prev} />}
                                {next && <OtherPost type="next" {...next} />}
                            </div>
                        </div>
                        <div className="margin-5"></div>
                        <ColRow
                            cols={[
                                { title: 'bio', content: <AuthorBio bio={author.bio} /> },
                                {
                                    title: 'author-info',
                                    content: <AuthorData posts={authorPosts} {...author} />
                                }
                            ]}
                        />
                        {/* <div className="row">
                            <AuthorRow></AuthorRow> */}
                        {/*<div className="col-sm-6 bio">
                                
                                {author.bio && (
                                    <ReactMarkdown source={author.bio} escapeHtml={false} />
                                )}
                            </div>
                            //             <div className="col-sm-6 author-info">
                    //                 <header>
                    //                     {author.profile_image && (
                    //                         <p>
                    //                             <Link
                    //                                 to={`/author/${author.slug}`}
                    //                                 class="display-inline-block">
                    //                                 <Image
                    //                                     source={author.profile_image}
                    //                                     large={{
                    //                                         w: 80,
                    //                                         h: 80,
                    //                                         q: 'auto',
                    //                                         portrait: true
                    //                                     }}
                    //                                     small={{
                    //                                         w: 80,
                    //                                         h: 80,
                    //                                         q: 10,
                    //                                         portrait: true
                    //                                     }}
                    //                                     className="round"
                    //                                     alt=""
                    //                                 />
                    //                             </Link>
                    //                         </p>
                    //                     )}
                    //                     <h5>
                    //                         <Link to={`/author/${author.slug}`}>{author.name}</Link>
                    //                     </h5>
                    //                 </header>
                    //                 {(author.website || author.location) && (
                    //                     <WebsiteList
                    //                         title={`Author Website${(author.location && 's') || ''}`}
                    //                         location={author.location}
                    //                         website={author.website}
                    //                     />
                    //                 )}
                    //                 {(author.facebook_url || author.twitter_url) && (
                    //                     <>
                    //                         <h6>Follow On</h6>
                    //                         <p className="social-share">
                    //                             <SocialLink
                    //                                 url={author.facebook_url}
                    //                                 className="social-link"
                    //                                 icon="facebook"
                    //                             />
                    //                             <SocialLink
                    //                                 url={author.twitter_url}
                    //                                 className="social-link"
                    //                                 icon="twitter"
                    //                             />
                    //                         </p>
                    //                     </>
                    //                 )}
                    //                 {authorPosts.length > 0 && (
                    //                     <>
                    //                         <h6>More Posts by this author&hellip;</h6>
                    //                         <div className="authorPosts">
                    //                             {authorPosts.map(({ node }) => (
                    //                                 <div key={node.id} className="thumb">
                    //                                     <div className="photo">
                    //                                         <Link
                    //                                             to={`/${node.slug}/`}
                    //                                             title={node.title}>
                    //                                             <Image
                    //                                                 source={node.feature_image}
                    //                                                 large={{
                    //                                                     w: 216,
                    //                                                     h: 144
                    //                                                 }}
                    //                                                 small={{
                    //                                                     w: 216,
                    //                                                     h: 144,
                    //                                                     q: 1
                    //                                                 }}
                    //                                             />
                    //                                             <span className="info">
                    //                                                 <em className="arrow-right centered"></em>
                    //                                             </span>
                    //                                         </Link>
                    //                                     </div>
                    //                                 </div>
                    //                             ))}
                    //                         </div>
                    //                     </>
                    //                 )}
                    //             </div>*/}
                        {/* </div> */}
                        <div className="clear"></div>
                        <div className="margin-4"></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PostTemplate;
