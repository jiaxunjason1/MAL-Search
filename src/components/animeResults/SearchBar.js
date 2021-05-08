import React, { useContext, useState } from 'react';
import SearchContext from '../../contexts/Search/searchContext';
import AlertContext from '../../contexts/alert/alertContext';

const SearchBar = () => {
    const searchContext = useContext(SearchContext);
    const alertContext = useContext(AlertContext);

    const { searchAnime, searchComplete, clearAnime } = searchContext;
    const { setAlert } = alertContext;

    const [input, setInput] = useState('');

    const onChange = e => {
        setInput(e.target.value);
    }

    const onSubmit = e => {
        e.preventDefault();
        if (input === '') {
            setAlert('Please enter something.', 'light');
        } else if (input.length < 3) {
            setAlert('Please input a longer search term.', 'light');
        } else {
            searchAnime(input);
            setInput('');
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='form' >
                <input 
                    type='text' 
                    name='input' 
                    placeholder='Search for anime...'
                    value={input}
                    onChange={onChange}
                />
                <input type='submit' value='Search' className='btn btn-dark btn-block'/>
            </form>
            {searchComplete && <button
            className='btn btn-light btn-block' onClick={clearAnime}>
                Clear
                </button>}
        </div>
    )
}

export default SearchBar
