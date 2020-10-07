

import { buildOpts, imageProps, preloadImage, editImage } from "./utils";

class Image extends React.PureComponent {
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
        const { source, small, large, className } = this.props;
        const placeholder = editImage(
            source,
            buildOpts(small || { w: 200, h: 200 })
        );

        const bgImage = this.state.source || placeholder;

        return (
            <>
                {source ? (
                    <img
                        src={bgImage}
                        className={
                            className ||
                            `` +
                                (source && ` b-lazy`) +
                                (this.state.source && ` b-loaded`)
                        }
                        width={large.w}
                        height={large.h}
                    />
                ) : (
                    <div
                        className="gradient"
                        style={{
                            width: `100%`,
                            paddingBottom: `${(large.h / large.w) * 100}%`,
                            minHeight: 0,
                        }}
                    ></div>
                )}
            </>
        );
    }
}

export default Image;
