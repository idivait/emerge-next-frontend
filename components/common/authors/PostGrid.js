export const PostList = ({ posts, ...author }) => {
    // post fields: id, slug, title, feature_image
    return <></>;
    {
        authorPosts.length > 0 && (
            <>
                <h6>More Posts by this author&hellip;</h6>
                <div className="authorPosts">
                    {authorPosts.map(({ id, slug, title, feature_image }) => (
                        <div key={id} className="thumb">
                            <div className="photo">
                                <Link to={`/${slug}/`} title={title}>
                                    <Image
                                        source={feature_image}
                                        large={{
                                            w: 216,
                                            h: 144
                                        }}
                                        small={{
                                            w: 216,
                                            h: 144,
                                            q: 1
                                        }}
                                    />
                                    <span className="info">
                                        <em className="arrow-right centered"></em>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    }
};

export default PostList;
