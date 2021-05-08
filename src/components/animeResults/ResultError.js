import React, { useContext } from 'react';
import SearchContext from '../../contexts/Search/searchContext';

const ResultError = () => {
    const searchContext = useContext(SearchContext);

    return (
        <div>
            {searchContext.searchComplete ? <h1>No Results Found.</h1> : null}
        </div>
    )
}

export default ResultError
