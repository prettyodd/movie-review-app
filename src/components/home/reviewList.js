import React from 'react' 

const ReviewList = ({ movie }) => {
    return (
        <div>
            <p>Review list:</p>
            <p>{movie[0].reviews[0].review} by {movie[0].reviews[0].user}</p>
        </div>
    )
}

export default ReviewList