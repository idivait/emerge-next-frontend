import React from "react";

import { buildOpts, imageProps, preloadImage, editImage } from "./utils";

class BGImage extends React.PureComponent {
    static propTypes = imageProps;

    constructor(props) {
        super(props);
        this.state = {
            source: null,
        };
    }

    componentDidMount() {
        const { source, large } = this.props;
        preloadImage(source, large).then((full) => {
            this.setState({ source: full });
        });
    }

    render() {
        const { source, small, className, children, id } = this.props;
        const placeholder = editImage(
            source,
            buildOpts(small || { w: 200, h: 200 })
        );

        const bgImage = this.state.source || placeholder;

        return (
            <div
                id={id}
                className={
                    className +
                    (source ? ` b-lazy` : ` gradient`) +
                    (this.state.source && ` b-loaded`)
                }
                style={{
                    backgroundImage: source && `url(${bgImage})`,
                }}
            >
                {children && children}
            </div>
        );
    }
}

export default BGImage;
