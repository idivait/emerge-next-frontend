import React from "react";
import PropTypes from "prop-types";

import Showdown from "showdown";
var noMorePsExt = {
    type: "output",
    filter: function (text, converter) {
        var re = /<\/?p[^>]*>/gi;
        text = text.replace(re, "");
        return text;
    },
};
const converter = new Showdown.Converter({ extensions: [noMorePsExt] });

const isLink = (link) => {
    const regex = /<a href=\"([^\"]*)\">(.*)<\/a>/i;
    return regex.exec(link);
};

const WebsiteList = ({ title, website, location, className }) => {
    const locations =
        location && location.split(",").map((loc) => converter.makeHtml(loc));

    const Icon = () => <i className={"fa-li fa " + className}></i>;

    return (
        <div className={"webslist "}>
            {title && <h6 className="title">{title}</h6>}
            <ul className={className && "fa-ul"}>
                <li>
                    <Icon />
                    <a href={website} target="_blank">
                        Author Site
                    </a>
                </li>
                {(locations &&
                    locations.map((loc, i) => {
                        const link = isLink(loc);
                        if (!link) return;

                        return (
                            <li key={i}>
                                {className && <Icon />}
                                <a href={link[1]} target="_blank">
                                    {link[2]}
                                </a>
                            </li>
                        );
                    })) ||
                    ""}
            </ul>
        </div>
    );
};

WebsiteList.propTypes = {
    title: PropTypes.string,
    website: PropTypes.string,
    location: PropTypes.string,
    className: PropTypes.string,
};

export default WebsiteList;
