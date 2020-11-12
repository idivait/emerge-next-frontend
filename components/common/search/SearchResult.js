import Link from 'next/link';
import { default as React } from 'react';
import {
    connectStateResults,
    Highlight,
    Hits,
    connectInfiniteHits,
    Index,
    Snippet,
    PoweredBy
} from 'react-instantsearch-dom';

const InfiniteHits = ({
    hits,
    hasPrevious,
    refinePrevious,
    hasMore,
    refineNext,
    className,
    indexName
}) => (
    <div className={`ais-InfiniteHits ${className}`}>
        <button
            className="ais-InfiniteHits-loadPrevious"
            disabled={!hasPrevious}
            onClick={refinePrevious}>
            Show previous
        </button>
        <ol className="ais-InfiniteHits-list">
            {hits.map((hit) => (
                <li className="ais-InfiniteHits-item" key={hit.objectID}>
                    <PageHit hit={hit} indexName={indexName} />
                </li>
            ))}
        </ol>
        <button className="ais-InfiniteHits-loadMore" disabled={!hasMore} onClick={refineNext}>
            Show more
        </button>
    </div>
);

const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);

const HitCount = connectStateResults(({ searchResults }) => {
    const hitCount = searchResults && searchResults.nbHits;

    return hitCount > 0 ? (
        <div className="HitCount">
            {hitCount} result{hitCount !== 1 ? `s` : ``}
        </div>
    ) : null;
});

const PageHit = ({ hit, indexName }) => {
    const isAuthor = indexName === `ghost_authors`;
    return (
        <Link href={`${isAuthor ? `/author` : ``}/${hit.slug}/`}>
            <a>
                <div>
                    <span>
                        <Highlight
                            attribute={isAuthor ? `name` : `title`}
                            hit={hit}
                            tagName="mark"
                        />
                        {!isAuthor && (
                            <>
                                <br />
                                <span className="author">
                                    by{` `}
                                    <Highlight
                                        attribute="primary_author.name"
                                        hit={hit}
                                        tagName="mark"
                                    />
                                </span>
                            </>
                        )}
                    </span>

                    <Snippet attribute={isAuthor ? `bio` : `excerpt`} hit={hit} tagName="mark" />
                </div>
            </a>
        </Link>
    );
};

const HitsInIndex = ({ index }) => (
    <Index indexName={index.name}>
        <header>
            <h6>{index.title}</h6>
            <HitCount />
        </header>
        <CustomInfiniteHits className="Hits" indexName={index.name} />
    </Index>
);

const SearchResult = ({ indices, className, show }) => (
    <div className={className} style={{ display: show ? `block` : `none` }}>
        {indices.map((index) => (
            <HitsInIndex index={index} key={index.name} />
        ))}
        <PoweredBy />
    </div>
);

export default SearchResult;
