import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const ByAuthors = ({ authors }) => (
    <>
        {` `}
        by{` `}
        {authors.map((author, i) => (
            <>
                <Link to={`/author/${author.slug}/`}>{author.name}</Link>
                {i < authors.length - 1 && authors.length > 1 ? " and " : ""}
            </>
        ))}
    </>
);

ByAuthors.propTypes = {
    authors: PropTypes.object.isRequired,
};

export default ByAuthors;
