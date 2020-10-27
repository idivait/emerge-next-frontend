import Link from "next/link"
import { Image } from "@components/common/images"

export const PostList = ({ posts }) => {
    return (
        (
        posts.length > 0 && (
            <>
                <h6>More Posts by this author&hellip;</h6>
                <div className="authorPosts">
                    {posts.map(({ id, slug, title, feature_image }) => (
                        <div key={id} className="thumb">
                            <div className="photo">
                                <Link href={`/${slug}/`} >
                                    <a title={title}>
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
                                    </a>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    )
    );
};

export default PostList;
