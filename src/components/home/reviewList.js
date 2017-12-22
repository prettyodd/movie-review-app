import React from 'react' 

const ReviewList = ({ movie }) => {
    return (
        <div>
            <h3>Review list:</h3>
            {movie.reviews.map((rev, i) =>
                <div key={i} className="Movies">
                    <p>Review: {rev.review}</p>
                    <p>by: {rev.user}</p>
                </div>
            )}
        </div>
    )
}

export default ReviewList