import React from 'react' 

const MovieHeader = ({ movie }) => {
    return (
        <div>
            <h1>{movie.title}</h1>
                <h2>Synopsis:</h2> 
            <p>{movie.overview}</p>
        </div>
    )
}

export default MovieHeader