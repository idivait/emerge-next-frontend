import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchOutline as SearchIcon } from '@styled-icons/evaicons-outline/SearchOutline';
import { CloseOutline as CloseIcon } from '@styled-icons/evaicons-outline/CloseOutline';

export default connectSearchBox(({ refine, currentRefinement, className, onFocus }) => (
    <form className={className}>
        <input
            className="SearchInput"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={(e) => refine(e.target.value)}
            value={currentRefinement}
            onFocus={onFocus}
        />
        {(currentRefinement.length === 0 && <SearchIcon className="SearchIcon" />) || (
            <CloseIcon className="SearchIcon CloseIcon" onClick={(e) => refine('')} />
        )}
    </form>
));
