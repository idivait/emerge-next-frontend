import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown/with-html';
import { Widget, TagWidget } from './widgets';

import Search from './search/Search';

const searchIndices = [
    { name: `ghost_authors`, title: 'Authors' },
    { name: `ghost_posts`, title: 'Posts' }
];

// Define WidgetWrapper for reuse

const WidgetWrapper = ({ site, tags }) => {
    return (
        <>
            <Widget className="search">
                <Search indices={searchIndices} />
            </Widget>
            <Widget title="About Us">
                <div className="no-bottom">
                    <ReactMarkdown source={site.description} escapeHtml={false} />
                </div>
            </Widget>
            <Widget title="Donate">
                <p>Help keep our eZine ad-free.</p>
                <a href="https://www.writerscolony.org/shop" className="button filled color">
                    Donate
                </a>
            </Widget>
            {tags && (
                <>
                    <TagWidget regex="category-.*" title="Categories" tags={tags} />
                    <TagWidget regex="issue-.*" title="Issues" tags={tags} />
                </>
            )}
            <Widget className="widget_newsletter no-bottom">
                <form
                    action="https://emerge-writerscolony.us17.list-manage.com/subscribe/post?u=2f6d89de220b516cc4a31cb85&amp;id=1b00815c27"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate"
                    target="_blank"
                    noValidate>
                    <div id="mc_embed_signup_scroll">
                        <h6 className="title">Subscribe to our Newsletter</h6>
                        <input
                            type="email"
                            defaultValue=""
                            name="EMAIL"
                            className="email"
                            id="mce-EMAIL"
                            placeholder="email address"
                            required
                        />
                        <div style={{ position: 'absolute', left: -5000 }} aria-hidden="true">
                            <input
                                type="text"
                                name="b_2f6d89de220b516cc4a31cb85_1b00815c27"
                                tabIndex="-1"
                                defaultValue=""
                            />
                        </div>
                        <input
                            type="submit"
                            value="Subscribe"
                            name="subscribe"
                            id="mc-embedded-subscribe"
                            className="button filled color"
                        />
                    </div>
                </form>
            </Widget>
        </>
    );
};

WidgetWrapper.propTypes = {
    site: PropTypes.object.isRequired,
    tags: PropTypes.array
};

export default WidgetWrapper;
