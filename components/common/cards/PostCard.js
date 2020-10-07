
import PropTypes from "prop-types";
import Link from "next/link";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";

import { Card } from ".";
import ByAuthors from "../authors/ByAuthors";

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`;
    const { authors } = post;
    const readingTime = readingTimeHelper(post, {
        minute: `<1m`,
        minutes: `%m`,
    });

    return (
        <Card url={url} image={post.feature_image}>
            <h5>
                <Link href={url}>
                    <a>{post.title}</a>
                </Link> 
            </h5>
            <span className="author">
                <ByAuthors authors={authors} />
            </span>
            <p className="meta small">
                <i className="fa fa-clock-o"></i>
                <span> {readingTime} read</span>
            </p>
        </Card>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default PostCard;
