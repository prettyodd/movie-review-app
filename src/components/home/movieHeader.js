import React from 'react' 

const MovieHeader = ({ movie }) => {
    return (
        <div>
            <h1>{movie[0].title}</h1>
                <h2>Synopsis:</h2> 
            <p>{movie[0].overview}</p>
        </div>
    )
}

export default MovieHeader