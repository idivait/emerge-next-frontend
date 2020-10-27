import ReactMarkdown from 'react-markdown/with-html';

import { CoverImage } from '@components/common/images';
import {
    ArticleContent,
    SocialShare,
    TagList,
    OtherPost,
    AuthorData
} from '@components/common/articles';
import { ColRow } from '@components/common/structure';

const PostTemplate = ({ post, location, next, prev, TOC, authorPosts }) => {
    const { primary_author: author, tags: alltags } = post;
    let imgOpt = { w: 1060, h: 640 };
    let imgOptSm = { w: 1060, h: 640, q: 1 };

    const AuthorBio = ({ bio }) =>
        bio && (
            <>
                <h5>About the Author</h5>
                <ReactMarkdown source={bio} escapeHtml={false} />
            </>
        );

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
                        <div className="clear"></div>
                        <div className="margin-4"></div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PostTemplate;
