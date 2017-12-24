import React from 'react'
import { Link } from 'react-router-dom'

const ReviewBody = ({ paramsId, currentUser, currentReview, addReview=f=>f }) => {

    let reviewRefs, usernameRefs

    const onSubmit = (e) => {
        e.preventDefault()
        if (usernameRefs.value === undefined) {
            console.log(usernameRefs.value)
            addReview(currentUser, reviewRefs.value)
        } else {
            console.log(usernameRefs.value)
            addReview(usernameRefs.value, reviewRefs.value)
        }
    }

    const userBodyOrFullForm = () => { 

        if (currentUser !== (undefined || '' || null || "")) {
            return (
                console.log(currentUser)
            )
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

    const reviewBodyOrReviewForm = () => {
        
        if (currentReview !== '') {
            return (
                <div>
                    <p>Your review: {currentReview}</p>
                    <Link to={`/movie/${paramsId}/reviews/${currentUser}`}>edit</Link>
                </div>
            )
        } else if (currentUser !== '' && currentReview === '') {
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
    }

    return (
        <div>
            {userBodyOrFullForm()}
            {reviewBodyOrReviewForm()}   
        </div>
    )
}

export default ReviewBody
