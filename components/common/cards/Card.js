import PropTypes from 'prop-types';
import Link from 'next/link';
import { BGImage } from '../images';

const Card = ({ url, image, overlay, children, className, imgOpt, imgOptSm, external = false }) => {
    imgOpt = imgOpt || { w: 278, h: 278 };
    imgOptSm = imgOptSm || { w: 40, h: 40 };

    const WrapperURL = ({ children: wkids }) => {
        const wclasses =
            `image-link ${!overlay && 'arrow-icon'} dark-overlay ` + (!image && `gradient`);

        return !external ? (
            <Link href={url}>
                <a className={wclasses}>{wkids}</a>
            </Link>
        ) : (
            <a href={url} className={wclasses}>
                {wkids}
            </a>
        );
    };

    return (
        <div className={`box ${className} ${overlay && 'overlay'}`}>
            <div className="post-box vertical">
                <WrapperURL>
                    {image && (
                        <BGImage
                            source={image}
                            className="bg-image"
                            large={imgOpt}
                            small={imgOptSm}
                        />
                    )}
                    {overlay && <div className="overlay-container">{overlay}</div>}
                </WrapperURL>
                <div className="extra-info">{children}</div>
            </div>
        </div>
    );
};

Card.propTypes = {
    url: PropTypes.string,
    image: PropTypes.string
};

export default Card;
