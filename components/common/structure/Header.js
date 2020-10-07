import PropTypes from "prop-types";
import Link from "next/link";

import { Navigation } from ".";
import Logo from "@images/svg/logo.inline.svg";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showMenu: false };
    }

    toggleMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu,
        });
    };

    render() {
        const { site } = this.props;

        return (
            <header
                id="top"
                className={`navbar ${
                    this.state.showMenu ? "open-mobile-menu" : ""
                }`}
                role="banner"
            >
                <div className="container">
                    <div className="inner">
                        <div className="site-title">
                            <h1>
                                <Link href="/">
                                    <a>
                                    {site.logo ? (
                                        <img
                                            src={site.logo}
                                            className="site-logo"
                                            width="144"
                                            height="52"
                                            alt={site.title}
                                        />
                                    ) : (
                                        <Logo alt={site.title} />
                                    )}
                                    </a>
                                </Link>
                            </h1>
                            <a
                                onClick={this.toggleMenu}
                                className="site-menu-toggle"
                            >
                                <span className="sr-only">
                                    Toggle navigation
                                </span>
                                <em className="first"></em>
                                <em className="middle"></em>
                                <em className="last"></em>
                            </a>
                        </div>
                        <div id="site-menu">
                            <nav>
                                <ul>
                                    <Navigation
                                        data={site.navigation}
                                        navclassName="menu-item"
                                    />
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    site: PropTypes.object,
};

export default Header;
