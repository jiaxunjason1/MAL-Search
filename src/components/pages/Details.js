import React, { useContext, useEffect, Fragment } from 'react';
import SearchContext from '../../contexts/Search/searchContext';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import notfound from '../animeResults/notfound.png';
import setAccessToken from '../../utils/setAccessToken';
import axios from 'axios';

const Details = ({ match }) => {
    const searchContext = useContext(SearchContext);

    const { getAnime, animeData, loading } = searchContext;

    useEffect(() => {
        getAnime(match.params.id);
        //eslint-disable-next-line
    }, [])

    if (loading || !animeData) {
        return <Spinner />
    }

    const {
        id,
        title,
        main_picture,
        synopsis,
        mean,
        num_list_users,
        num_episodes,
        my_list_status
    } = animeData;

    const onSubmit = e => {
        e.preventDefault();
        if (localStorage.token) {
            setAccessToken(localStorage.token);
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const params = new URLSearchParams();
        params.append('status', 'plan_to_watch');

        axios.put(`/v2/anime/${id}/my_list_status`, params, config)
        .then(() => getAnime(id))
        .catch(err => console.log(err.message));
    }

    const onRemove = e => {
        e.preventDefault();
        if (localStorage.token) {
            setAccessToken(localStorage.token);
        }
        axios.delete(`/v2/anime/${id}/my_list_status`)
        .then(() => getAnime(id))
        .catch(err => console.log(err.message));
    }

    let listElement;

    if (my_list_status) {
        switch(my_list_status.status) {
            case 'completed':
                listElement =
                    <div className='bg-primary text-center my-1'>
                        <strong>Completed</strong>
                    </div>;
                break;
            case 'watching':
                listElement =
                    <div className='bg-watching text-center my-1'>
                        <strong>Watching</strong>
                    </div>;
                break;
            case 'on_hold':
                listElement = 
                    <div className='bg-onhold text-center my-1'>
                        <strong>On Hold</strong>
                    </div>;
                break;
            case 'dropped':
                listElement = 
                    <div className='bg-warning text-center my-1'>
                        <strong>Dropped</strong>
                    </div>;
                break;
            case 'plan_to_watch':
                listElement = 
                    <Fragment>
                    <div className='bg-ptw text-center my-1'>
                        <strong>Plan To Watch</strong>
                    </div>
                    <form onSubmit={onRemove}>
                        <input 
                            type='submit' 
                            value='Remove From Plan-To-Watch'
                            className='btn btn-dark btn-block'
                        />
                    </form>
                    </Fragment>;
                break;
            default:
                listElement = <h1>Error</h1>;
        }
    }

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>Back To Search</Link>
            <div className='card grid-2'>
                <div className='all-center'> 
                    <img 
                        src={main_picture ? main_picture.large : notfound}
                        className='anime-img'
                        alt=''
                        style={{width: '50%'}}
                    />
                    <h1>{title}</h1>
                </div>
                <div>
                    <Fragment>
                        <h3>Synopsis</h3>
                        <p>
                            {synopsis ? synopsis : 'No synopsis found.'}
                        </p>
                    </Fragment>
                    <hr className='primary'/>
                    <a href={`https://myanimelist.net/anime/${id}`} className='btn btn-primary my-1'>
                        View on MAL
                    </a>
                    <ul>
                        <li>
                            <Fragment>
                                <strong>Mean Score: </strong> {mean ? mean : 'N/A'}
                            </Fragment>
                        </li>
                        <li>
                            <Fragment>
                                <strong>Users With This Anime: </strong> 
                                {num_list_users ? num_list_users : 'Unknown'}
                            </Fragment>
                        </li>
                        <li>
                            <Fragment>
                                <strong>Number Of Episodes: </strong> 
                                {num_episodes ? num_episodes : 'Unknown'}
                            </Fragment>
                        </li>
                    </ul>
                </div>
            </div>
            {my_list_status && listElement}
            {!my_list_status && <form onSubmit={onSubmit}>
                <input 
                    type='submit'
                    value='Add To List'
                    className='btn btn-dark btn-block'
                />
                </form>}
        </Fragment>
    )
}

export default Details
