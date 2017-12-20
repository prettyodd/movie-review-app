import React from 'react';
import {
    Link
  } from 'react-router-dom'

const MovieList = ({ lists=[] }) => {
    return (
        <div className="movie-list">
            {lists.map((list, i) =>
                <div key={i} className="movie">
                    <h2>{list.title}</h2>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w640${list.poster_path}`}/>
                        <h3>Synopsis</h3>
                        <p>{list.overview}</p>
                    </div>
                    <Link to={`/movie/${list.id}`}>Review</Link>
                </div>
            )}
        </div>
    )
}

export default MovieList