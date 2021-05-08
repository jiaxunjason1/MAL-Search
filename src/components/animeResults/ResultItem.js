import React from 'react';
import PropTypes from 'prop-types';
import notfound from './notfound.png';
import { Link } from 'react-router-dom';

const ResultItem = ({ anime: { id, title, main_picture } }) => {
    return (
        <div className='card text-center'>
            <img 
                src={main_picture ? main_picture.medium : notfound} 
                alt='anime-img' 
                className='anime-img' 
            />
            <div>
                <h3>{title}</h3>
                <div className='card-btn'>
                    <Link to={`/anime/${id}`} className='btn btn-dark btn-sm my-1'>
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

ResultItem.propTypes = {
    anime: PropTypes.object.isRequired
}

export default ResultItem;
