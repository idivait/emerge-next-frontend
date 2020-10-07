 
import PropTypes from 'prop-types'
import Link from 'next/link'

const Pagination = ({ pageContext, className }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className={`pagination ${className}`} role="navigation">
            <div>
                {previousPagePath && (

                    <Link href={previousPagePath} rel="prev">
                        <a>Prev</a>
                    </Link>

                )}
            </div>
            {numberOfPages > 1 && <div className="pagination-location">Page {humanPageNumber} of {numberOfPages}</div>}
            <div>
                {nextPagePath && (

                    <Link href={nextPagePath} rel="next">
                        <a>Next</a>
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
