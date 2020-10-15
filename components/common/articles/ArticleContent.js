import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Luminous } from 'luminous-lightbox';

import { Converter } from 'showdown';
import tableOfContentsExt from '../shortcodes/TableOfContents';
import footnoteExt from '../shortcodes/Footnote';

class ArticleContent extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const gallery_images = document.querySelectorAll('.kg-gallery-image img');
        const post_images = document.querySelectorAll('.kg-image-card img');

        // Init lightbox
        const lightboxOptions = {
            sourceAttribute: 'src'
        };
        for (const image of new Set([...gallery_images, ...post_images])) {
            new Luminous(image, lightboxOptions);
        }

        // Resize gallery images
        gallery_images.forEach(function (image) {
            var container = image.closest('.kg-gallery-image');
            var width = image.attributes.width.value;
            var height = image.attributes.height.value;
            var ratio = width / height;
            container.style.flex = ratio + ' 1 0%';
        });
    }
    render() {
        const { post, TOC } = this.props;

        const converter = new Converter({
            extensions: [footnoteExt(), tableOfContentsExt(TOC)]
        });

        let html = post.html;
        //convert back to html with md extension
        html = converter.makeHtml(html);

        return (
            <article>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </article>
        );
    }
}

ArticleContent.propTypes = {
    post: PropTypes.object,
    TOC: PropTypes.array
};

export default ArticleContent;
