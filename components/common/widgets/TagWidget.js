 
import PropTypes from 'prop-types'
import Link from 'next/link'

import Widget from './Widget'
// import { getTagData } from './TagQuery'

const TagWidget = ({ title, className, regex, tags })=>{
    return<></>;
    let filter_tags = tags
    if (regex) {
        regex = RegExp(regex)
        filter_tags = tags.filter(tag=>{
            return regex.test(tag.slug)
        })
    }
    return (
        <Widget title={title} className={className}>
            <ul id="archives">
                { filter_tags.map(tag=>{
                    return (
                        <li class="cat-item">
                            <Link href={`/tag/${tag.slug}/`}>
                                <a>{tag.name}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </Widget>
    )
}

TagWidget.propTypes = {
    title : PropTypes.string,
    className : PropTypes.string,
    regex : PropTypes.string,
    slug : PropTypes.string
}

export default TagWidget