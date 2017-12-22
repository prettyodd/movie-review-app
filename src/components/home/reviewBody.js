import React from 'react'
import { Link } from 'react-router-dom'

const ReviewBody = ({ movie, paramsId, currentUser, currentReview }) => {
    return (
        <div>
            <p>You logged in as: {currentUser}</p>
                <h3>Your review:</h3>
            <p>{currentReview}</p>
            <Link to={`/movie/${paramsId}/${movie.reviews[0]._id}`}>edit</Link>
        </div>
    )
}

export default ReviewBody
