import React from 'react' 

const MovieHeader = ({ movie }) => {

    console.log(movie.poster_path)

    return (
        <div style={{ display: 'flex', marginTop: 20, marginBottom: 20 }} > 
            <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} style={{ height: '300px' }} />
            <div style={{ marginLeft: 20 }} >
                <h1>{movie.title}</h1>
                <h2>Synopsis:</h2> 
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}

export default MovieHeader