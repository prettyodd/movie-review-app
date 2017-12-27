import React from 'react'
import { Link } from 'react-router-dom'
import AddNewMovie from './api/addNewMovie'

const ReviewBody = ({ paramsId, movie, APIstate=f=>f, currentUser, currentReview, editReview, deleteReview, newMovie, onEdit=f=>f, addReview=f=>f }) => {

    let reviewRefs, usernameRefs, actionType

    const onSubmit = (e) => {
        e.preventDefault()
        if (movie.reviews) { // Movie available on local db
            if (!usernameRefs) { // user has login and will add review
                actionType = 'update'
                console.log(actionType)
                addReview(currentUser, reviewRefs.value, actionType)
            } else { // will login and add review
                actionType = 'update'
                console.log(actionType)
                addReview(usernameRefs.value, reviewRefs.value, actionType)
            }
        } else if (!usernameRefs) { // user has login and will add review
            actionType = 'addNewMovie'
            addReview(currentUser, reviewRefs.value, actionType)
        } else { // will login and add review
            actionType = 'addNewMovie'
            console.log(actionType)
            addReview(reviewRefs.value, reviewRefs.value, actionType)
        }
    }

    const reviewForm = () => {
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

    const userReviewAndFormArea = () => { // logic for user review info & full form
        if (currentUser) { // If current user exist and movie.review exist
            console.log(movie.reviews)

            if (movie.reviews) {

                const ReviewObj = movie.reviews.reduce((obj, v) => {
                                    obj[v.user] = v
                                    return obj
                                    }, {})

                if (ReviewObj[currentUser]) {
                    if (editReview) {
                        console.log(editReview)
                        return (
                            reviewForm()
                        )
                    } else {
                        return (
                            <div>
                                <span>Your Review: {ReviewObj[currentUser].review}</span>
                                <a onClick={onEdit}>EDIT</a>
                                <a onClick={(e) => addReview(currentUser, currentReview, 'delete')}>DELETE</a>
                            </div>
                        )
                    }
                } else {
                    console.log('2')
                    return (
                        reviewForm()
                    )
                }
            } else {
                console.log('3')
                return (
                    reviewForm()
                )
            }
        } else {

            const OnSubmit = (e) => {
                e.preventDefault()
                AddNewMovie(paramsId, movie, usernameRefs.value, reviewRefs.value, APIstate=f=>f)
            }

            return (
                <form onSubmit={OnSubmit}>
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
        if (!movie.reviews) {
            return (
                <p>No review yet.</p>
            )
            console.log(movie.reviews)
        } else if (movie.reviews.length === 0) {
            return (
                <p>No review yet.</p>
            )
        } else {
            console.log('reduce method will executed for because review exist')
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
