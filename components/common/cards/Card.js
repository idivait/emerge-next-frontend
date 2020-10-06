import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { BGImage } from "../images";

const Card = ({
    url,
    image,
    overlay,
    children,
    className,
    imgOpt,
    imgOptSm,
}) => {
    imgOpt = imgOpt || { w: 278, h: 278 };
    imgOptSm = imgOptSm || { w: 40, h: 40 };

    return (
        <div className={`box ${className} ${overlay && "overlay"}`}>
            <div className="post-box vertical">
                <Link
                    to={url}
                    className={
                        `image-link ${!overlay && "arrow-icon"} dark-overlay ` +
                        (!image && `gradient`)
                    }
                >
                    {image && (
                        <BGImage
                            source={image}
                            className="bg-image"
                            large={imgOpt}
                            small={imgOptSm}
                        />
                    )}
                    {overlay && (
                        <div className="overlay-container">{overlay}</div>
                    )}
                </Link>
                <div className="extra-info">{children}</div>
            </div>
        </div>
    );
};

Card.propTypes = {
    url: PropTypes.string,
    image: PropTypes.string,
};

export default Card;
