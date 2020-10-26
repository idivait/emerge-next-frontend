import { defaultImageSrc, BGImage } from '@components/common/images';
import { ByAuthors } from '@components/common/authors';

export const CoverImage = ({ small, large, published_at, authors, title, feature_image }) => (
    <figure className="post-image">
        <BGImage
            className="bg-image"
            source={feature_image || defaultImageSrc}
            large={large}
            small={small}
        />
        <div className="image-info">
            <h1 className="single-title no-bottom">{title}</h1>
            <p className="post-meta">
                <span alt={published_at} title={published_at}>
                    <ByAuthors authors={authors} />
                </span>
            </p>
        </div>
    </figure>
);

export default CoverImage;
