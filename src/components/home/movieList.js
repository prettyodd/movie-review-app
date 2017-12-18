import React from 'react';

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
                    <input type="button" onclick="location.href='http://google.com';" value="Go to Google" />
                </div>
            )}
        </div>
    )
}

export default MovieList