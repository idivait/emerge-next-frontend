import PropTypes from "prop-types";

import Link from "next/link";
import ByAuthors from "./authors/ByAuthors";
import { BGImage, defaultImageSrc } from "./images";

const Featured = ({ post, tag }) => {
  const url = `/${post ? post.slug : tag.slug}/`;
  const author = post ? post.primary_author : tag && tag.description;
  const authorUrl = post
    ? `/author/${post.primary_author.slug}/`
    : `/tag/${tag.slug}`;
  const imgOptions = { w: 715, h: 715 };
  const imgOptionsSm = { w: 40, h: 40 };
  let hasTOC = false;
  const isLetter = post && post.tags.find((t) => t.slug === `hash-letter`);
  if (isLetter) hasTOC = post.plaintext.indexOf("[TableOfContents]") > -1;
  const tocUrl = hasTOC ? `${url}#toc` : ``;

  return (
    <div className="thumb featured">
      <noscript>
        <h1>{(post && post.title) || (tag && tag.name)}</h1>
      </noscript>
      <BGImage
        source={
          (post && post.feature_image) ||
          (tag && tag.feature_image) ||
          defaultImageSrc
        }
        className="scrim"
        small={imgOptionsSm}
        large={imgOptions}
      />
      <div className="photo">
        <Link href={url}>
          <a>
            <span className="info">
              <strong className="big-title">
                {(post && (post.title || post.name)) || (tag && tag.name)}
                {post && !isLetter && (
                  <div className="author">
                    <ByAuthors authors={post.authors} />
                  </div>
                )}
              </strong>
              <span className="excerpt">
                {post
                  ? (isLetter && (
                      <span>
                        Letter from the Editor
                        {hasTOC && (
                          <>
                            {" & "}
                            <Link href={tocUrl}>
                              <a>Table of Contents</a>
                            </Link>
                          </>
                        )}
                      </span>
                    )) ||
                    post.meta_description ||
                    post.description ||
                    post.excerpt
                  : tag && tag.description}
              </span>
              <em className="arrow-right"></em>
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

Featured.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      })
    ),
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string,
    }).isRequired,
    meta_description: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  featured: PropTypes.bool,
};

export default Featured;
