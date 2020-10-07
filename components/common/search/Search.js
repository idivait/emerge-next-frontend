import algoliasearch from 'algoliasearch/lite';
import { createRef, default as React, useState } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';
import useClickOutside from './useClickOutside';

export default function Search({ indices }) {
    const rootRef = createRef();
    const [query, setQuery] = useState();
    const [hasFocus, setFocus] = useState(false);
    const app_id = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const search_key = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY;
    if (!app_id || !search_key) return <></>;
    const searchClient = algoliasearch(app_id, search_key);

    useClickOutside(rootRef, () => {
        if (window.matchMedia('(min-width: 768px)').matches) {
            setFocus(false);
        }
    });

    return (
        <div ref={rootRef}>
            <InstantSearch
                searchClient={searchClient}
                indexName={indices[0].name}
                onSearchStateChange={({ query }) => setQuery(query)}>
                <SearchBox
                    className={`SearchForm`}
                    onFocus={() => setFocus(true)}
                    hasFocus={hasFocus}
                />
                <SearchResult
                    show={query && query.length > 0 && hasFocus}
                    indices={indices}
                    className="SearchResult"
                />
            </InstantSearch>
        </div>
    );
}
