import React from "react";
import { Link } from "gatsby";

import config from "../../../utils/siteConfig";
import Logo from "../../../images/logo.inline.svg";
import MemberImages from "../../../images/member";

const Footer = ({ site }) => {
    const now = new Date();
    const disclaimer = `The works contained in this literary magazine expresses the views of their creators, not necessarily those of this publication.`;
    return (
        <footer id="footer" role="contentinfo">
            <div className="container">
                <p>
                    <Link to="/" className="mini-logo">
                        {site.logo ? (
                            <img
                                src={site.logo}
                                width="90"
                                height="33"
                                alt={site.title}
                            />
                        ) : (
                            <Logo />
                        )}
                    </Link>
                </p>
                <p>
                    &copy; <a href={site.url}>{site.title}</a>{" "}
                    {now.getFullYear()}
                </p>
                <p>
                    Website design by <a href="//idiva.it">iDiva.IT</a>
                </p>
                <p>
                    <a href={`/rss/`} className="social-link">
                        <i className="fa fa-rss"></i>
                    </a>
                </p>
                <hr />
                <p className="member-logos">
                    <h6>Proud Member of</h6>
                    <MemberImages />
                </p>
                <hr />
                <p>Disclaimer: {disclaimer}</p>
            </div>
        </footer>
    );
};

export default Footer;
