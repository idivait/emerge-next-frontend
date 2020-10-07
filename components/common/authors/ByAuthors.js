import Link from 'next/link';
import { Fragment } from 'react';
import PropTypes from 'prop-types';

const ByAuthors = ({ authors }) => (
    <>
        {` `}
        by{` `}
        {authors.map((author, i) => (
            <Fragment key={author.id}>
                <Link href={`/author/${author.slug}/`}>
                    <a>{author.name}</a>
                </Link>
                {i < authors.length - 1 && authors.length > 1 ? ' and ' : ''}
            </Fragment>
        ))}
    </>
);

ByAuthors.propTypes = {
    authors: PropTypes.array.isRequired
};

export default ByAuthors;
