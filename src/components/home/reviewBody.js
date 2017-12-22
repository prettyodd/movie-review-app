import React from 'react'

const ReviewBody = ({ movie, paramsId }) => {
    return (
        <div>
            <p>You logged in as: {movie.reviews[0].user}</p>
                <h3>Your review:</h3>
            <p>{movie.reviews[0].review}</p>
            <Link to={`/movie/${paramsId}/${movie.reviews[0]._id}`}>edit</Link>
        </div>
    )
}

export default ReviewBody
