// TODO: Split this mess into multiple post components, especially the bottom widgets

const OtherPost = ({ post, type }) => {
    const { title, feature_image, url, primary_author } = post;
    return (
        <div className="thumb dark-overlay col-md-6">
            <Link to={url}>
                <div className="photo">
                    <Image
                        source={feature_image || defaultImageSrc}
                        alt={title}
                        large={{ w: 714, h: 502 }}
                        small={{ w: 714, h: 502, q: 1 }}
                    />
                    <span className="info">
                        {type && <h6>{type}</h6>}
                        <span className="big-excerpt">{title}</span>
                        <span>
                            <ByAuthors authors={post.authors} />
                        </span>
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default OtherPost;
