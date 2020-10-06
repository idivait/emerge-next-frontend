import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, className }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className={`pagination ${className}`} role="navigation">
            <div>
                {previousPagePath && (

                    <Link to={previousPagePath} rel="prev">
                            Prev
                    </Link>

                )}
            </div>
            {numberOfPages > 1 && <div className="pagination-location">Page {humanPageNumber} of {numberOfPages}</div>}
            <div>
                {nextPagePath && (

                    <Link to={nextPagePath} rel="next">
                            Next
                    </Link>
                )}
            </div>
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
