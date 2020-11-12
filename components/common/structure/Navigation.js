import PropTypes from 'prop-types';
import Link from 'next/link';

/**
 * Navigation component
 *
 * The Navigation component takes an array of your Ghost
 * navigation property that is fetched from the settings.
 * It differentiates between absolute (external) and relative link (internal).
 * You can pass it a custom class for your own styles, but it will always fallback
 * to a `site-nav-item` class.
 *
 */
const Navigation = ({ data, navClass }) => (
    <>
        {data.map(({ url, label }, i) => {
            if (url.match(/^\s?http(s?)/gi)) {
                return (
                    <li key={i}>
                        <a
                            className={navClass}
                            href={url}
                            key={i}
                            target="_blank"
                            rel="noopener noreferrer">
                            {label}
                        </a>
                    </li>
                );
            } else {
                return (
                    <li key={i}>
                        <Link href={url}>
                            <a className={navClass}>{label}</a>
                        </Link>
                    </li>
                );
            }
        })}
    </>
);

Navigation.defaultProps = {
    navClass: `site-nav-item`
};

Navigation.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    navClass: PropTypes.string
};

export default Navigation;
