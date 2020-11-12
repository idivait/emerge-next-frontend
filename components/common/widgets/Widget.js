import PropTypes from 'prop-types';

const Widget = ({ title, className, children }) => {
    return (
        <div className={'widget ' + className}>
            {title && <h6 className="title">{title}</h6>}
            {children && children}
        </div>
    );
};

Widget.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node
};

export default Widget;
