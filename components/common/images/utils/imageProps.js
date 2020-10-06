import PropTypes from "prop-types";

const imageProps = {
    children: PropTypes.node,
    source: PropTypes.string,
    className: PropTypes.string,
    small: PropTypes.shape({
        w: PropTypes.number,
        h: PropTypes.number,
    }),
    large: PropTypes.shape({
        w: PropTypes.number,
        h: PropTypes.number,
    }),
};

export default imageProps;
