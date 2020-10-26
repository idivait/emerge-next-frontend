import Link from 'next/link';
import { Image, defaultImageSrc } from '@components/common/images';
import { ByAuthors } from '@components/common/authors';

const OtherPost = ({ title, feature_image, slug: url, authors, type }) => {
    // return <></>;
    return (
        <div className="thumb dark-overlay col-md-6">
            <Link href={url}>
                <a>
                    <div className="photo">
                        {/* TODO: Fix image on other post to be consistent size */}
                        <Image
                            source={feature_image || defaultImageSrc}
                            alt={title}
                            large={{ w: 714, h: 502 }}
                            small={{ w: 714, h: 502, q: 1 }}
                        />
                        <span className="info">
                            {type && <h6>{type}</h6>}
                            <span className="big-excerpt">{title}</span>
                            <span>
                                <ByAuthors authors={authors} />
                            </span>
                        </span>
                    </div>
                </a>
            </Link>
        </div>
    );
};

export default OtherPost;
