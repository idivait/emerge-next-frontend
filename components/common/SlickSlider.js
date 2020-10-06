import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

class SlickSlider extends React.PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            render: false
        };
    }

    componentDidMount() {
        this.setState({
            render: true
        });
    }
    render() {
        const { children } = this.props;
        const settings = {
            adaptiveHeight: true,
            arrows: false,
            dots: true,
            focusOnSelect: true,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true,
            autoplay: true,
            autoplaySpeed: 8000,
            speed: 800,
            dotsClass: "dots",
            prevArrow: '<span class="prev"></span>',
            nextArrow: '<span class="next"></span>'
        };
        if (!this.state.render) return "";
        return (
            <div className="container fill-parent">
                <Slider {...settings} className="carousel">
                    {children}
                </Slider>
            </div>
        );
    }
}

export default SlickSlider;
