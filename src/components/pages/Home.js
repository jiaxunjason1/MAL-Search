import React, { Fragment } from 'react';
import Results from '../animeResults/Results';
import SearchBar from '../animeResults/SearchBar';

const Home = () => {
    return (
        <Fragment>
            <SearchBar />
            <Results />
        </Fragment>
    )
}

export default Home
