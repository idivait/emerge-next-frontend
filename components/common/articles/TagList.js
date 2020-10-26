import PropTypes from 'prop-types';
import Link from 'next/link';

const TagLink = ({ visibility, id, slug, name }) => {
    if (visibility !== `public`) {
        return <></>;
    }
    return (
        <Link key={id} href={`/tag/${slug}/`}>
            <a>{name}</a>
        </Link>
    );
};

TagLink.propTypes = {
    visibility: PropTypes.string,
    id: PropTypes.string,
    slug: PropTypes.string,
    name: PropTypes.string
};

export const TagList = ({ tags, title }) => {
    if (tags.length === 0) return <></>;
    return (
        <p className="tags">
            <strong className="padding-bottom">{title}</strong>
            {tags.map((tag) => (
                <TagLink key={tag.id} {...tag} />
            ))}
        </p>
    );
};

TagList.propTypes = {
    tags: PropTypes.array,
    title: PropTypes.string
};

export default TagList;
