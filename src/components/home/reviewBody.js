import React from 'react'
import { Link } from 'react-router-dom'

const ReviewBody = ({ paramsId, movie, currentUser, addReview=f=>f }) => {

    let reviewRefs, usernameRefs

    const onSubmit = (e) => {
        e.preventDefault()
        if (!usernameRefs) {
            addReview(currentUser, reviewRefs.value)
        } else {
            console.log(usernameRefs.value)
            addReview(usernameRefs.value, reviewRefs.value)
        }
    }

    const userReviewAndFormArea = () => { // logic for user review info & full form
        if (currentUser) { // If current user exist and movie.review exist
            console.log(movie.reviews)

            if (movie.reviews) {

                const ReviewObj = movie.reviews.reduce((obj, v) => {
                                    obj[v.user] = v
                                    return obj
                                    }, {})

                if (ReviewObj[currentUser]) {
                    return (
                        <span>Your Review: {ReviewObj[currentUser].review}</span>
                    )
                } else {
                    return (
                        console.log('currentUser exist, movie.reviews exist & but currentUser review not exist')
                    )
                }
            } else {
                return (
                    <form onSubmit={onSubmit}>
                    <textarea 
                       type="text"
                       placeholder="Write your review..."
                       ref={el => reviewRefs = el} // can't use this.refs on stateless component
                       className="form-control" />
                    <span className="input-group-btn">
                      <button type="submit" className="btn btn-info">
                         Sumbit
                      </button>
                    </span>
                    </form>
                )
            }
        } else {
            return (
                <form onSubmit={onSubmit}>
                <input 
                  type="text" 
                  placeholder="Username" 
                  ref={el => usernameRefs = el} />
                <textarea 
                   type="text"
                   placeholder="Write your review..."
                   ref={el => reviewRefs = el} 
                   className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">
                     Sumbit
                  </button>
                </span>
                </form>
            )
        }
    } 

    const reviewListArea = () => { 
        console.log(movie.reviews)
        if (!movie.reviews || movie.reviews === []) {
            return (
                <p>No review yet.</p>
            )
            console.log(movie.reviews)
        } else {
            console.log('should not run when no review exist')
            console.log(movie.reviews)

            const ReviewObj = movie.reviews.reduce((obj, v) => {
                obj[v.user] = v
                return obj
                }, {})

            return (
                <div>
                    <h3>Review list:</h3>
                    {Object.keys(ReviewObj).map((key, i) =>
                        <div key={i} className="Movies">
                            <span>Review: {ReviewObj[key].review} by {ReviewObj[key].user}</span>
                        </div>
                    )}
                </div>
            )
        }
    }

    return (
        <div>
            {userReviewAndFormArea()}
            {reviewListArea()}
        </div>
    )
}

export default ReviewBody
