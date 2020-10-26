import Link from 'next/link';
import { Image } from '@components/common/images';

export const ProfileImage = ({ slug, profile_image, className, imageOpts }) => {
    const profileOpts = {
        ...{
            small: {
                w: 80,
                h: 80,
                q: 10,
                portrait: true
            },
            large: {
                w: 80,
                h: 80,
                q: 'auto',
                portrait: true
            }
        },
        ...imageOpts
    };
    return (
        <Link href={`/author/${slug}`} class="display-inline-block">
            <a className={className}>
                <Image source={profile_image} className="round" alt="" {...profileOpts} />
            </a>
        </Link>
    );
};

export default ProfileImage;
