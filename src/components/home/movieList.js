import React from 'react';
import { Link } from 'react-router-dom'

const MovieList = ({ lists=[], currentUser }) => {
    return (
        <div className="movie-list" style={{ margin: 20 }}>
            {lists.map((list, i) =>
                <div key={i} className="movie" style={{ backgroundColor: 'white', padding: 15, margin: 15 }}>
                    <h2 style={{ marginTop: 0 }}>{list.title}</h2>
                        <div style={{ display: 'flex' }}>
                            <img src={`https://image.tmdb.org/t/p/w640${list.poster_path}`} style={{ height: '250px' }} /> 
                            <div style={{ marginLeft: '20px' }} >
                                <h3>Synopsis</h3>
                                <p>{list.overview}</p>
                                <button>
                                <Link 
                                    to={{
                                    pathname: `/movie/${list.id}`,
                                    locationState: { currentUser: currentUser }}}>
                                    Review
                                </Link>
                                </button>
                            </div>
                        </div>
                </div>
            )}
        </div>
    )
}

export default MovieList