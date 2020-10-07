

const SocialLink = ({ url, className, icon }) => {
    if (!url) {
        return ``;
    }
    return (
        <a href={url} className={className}>
            {icon && <i className={`fa fa-${icon}`}></i>}
        </a>
    );
};

export default SocialLink;
