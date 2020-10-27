import PropTypes from 'prop-types';
import Link from 'next/link';
import { times } from 'lodash';

const PageLinks = ({ total, page, location }) => {
    const pages = [];
    times(total, (p) => {
        p = p + 1;
        const path = generatePathName(location.pathname, p);
        if (!path) return;
        if (p === page) {
            pages.push(<span className="pagination-location-num">{p}</span>);
            return;
        }
        pages.push(
            <Link href={path} key={p}>
                <a>
                    <span className="pagination-location-num">{p}</span>
                </a>
            </Link>
        );
    });
    return <>{pages}</>;
};

const generatePathName = (pathname, newPath) => {
    const re = /\/(?<page>\d+)/gm;
    if (!newPath) return null;
    return pathname.replace(re, `/${newPath}`);
};

const Pagination = ({ fullPath, className, page, pages: totalPages, next, prev }) => {
    if (totalPages === 1) return <></>;
    const location = new URL(fullPath);
    const previousPagePath = generatePathName(location.pathname, prev);
    const nextPagePath = generatePathName(location.pathname, next);

    return (
        <nav className={`pagination ${className}`} role="navigation">
            <div>
                {previousPagePath && (
                    <Link href={previousPagePath} rel="prev">
                        <a>Prev</a>
                    </Link>
                )}
            </div>
            <div className="pagination-location">
                {/* Page {page} of {totalPages} */}
                <PageLinks total={totalPages} page={page} location={location} />
            </div>
            <div>
                {nextPagePath && (
                    <Link href={nextPagePath} rel="next">
                        <a>Next</a>
                    </Link>
                )}
            </div>
        </nav>
    );
};

Pagination.propTypes = {
    page: PropTypes.number,
    totalPages: PropTypes.string,
    fullPath: PropTypes.string
};

export default Pagination;
