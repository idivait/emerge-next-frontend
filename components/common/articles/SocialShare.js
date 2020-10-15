import Proptypes from 'prop-types';

export const SocialShare = ({ location, title }) => (
    <>
        <h5>{title}</h5>
        <p className="social-share no-bottom">
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
                className="social-link">
                <i className="fa fa-facebook"></i>
            </a>
            <a href={`https://twitter.com/home?status=${location.href}`} className="social-link">
                <i className="fa fa-twitter"></i>
            </a>
            <a href={`https://plus.google.com/share?url=${location.href}`} className="social-link">
                <i className="fa fa-google-plus"></i>
            </a>
        </p>
    </>
);

SocialShare.Proptypes = {
    location: Proptypes.object,
    title: Proptypes.string
};

export default SocialShare;
