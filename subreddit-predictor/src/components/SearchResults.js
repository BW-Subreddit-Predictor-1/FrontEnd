import React, { useContext } from 'react';
import { RedditContext } from '../contexts/RedditContext';



const SearchResults = () => {

    const results = useContext(RedditContext);


    return (
        <div>
            <h1 style={{color: 'white'}}>Subreddit Prediction Results</h1>

      <p>{results}</p>
        </div>
    )
}

export default SearchResults;