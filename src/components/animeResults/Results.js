import React, { Fragment, useContext } from 'react';
import ResultItem from './ResultItem';
import Spinner from '../layout/Spinner';
import ResultError from './ResultError';

import SearchContext from '../../contexts/Search/searchContext';

const Results = () => {
    const searchContext = useContext(SearchContext);

    const { loading, animeList } = searchContext;

    return (
        <Fragment>
            {loading 
                ? <Spinner /> 
                : <div style={userStyle}>
                    {(animeList !== null && animeList.length !== 0) ? animeList.map(anime => (
                        <ResultItem key={anime.node.id} anime={anime.node} />)) : 
                        <ResultError />}
                </div>
        }
        </Fragment>
    )
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Results
