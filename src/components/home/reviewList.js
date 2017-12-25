import React from 'react' 

const ReviewList = ({ movie, currentUser }) => {

    console.log(movie.reviews[150])

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

    const ReviewObj = movie.reviews.reduce((obj, v) => { // this is how we assign function to a variable and the function can be called just by calling the {ReviewObj}
                        obj[v.user] = v
                        return obj
                    }, {})

    console.log(ReviewObj)
    console.log(ReviewObj[currentUser])

    const UserReview = () => {
        if (ReviewObj[currentUser] === undefined) {
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
        } else {
            return (
                <span>Review: {ReviewObj[currentUser].review} by {ReviewObj[currentUser].user}</span>
            )
        }
    }
    
    return (
        <div>
            {UserReview()}
            <div>
                <h3>Review list:</h3>
                {Object.keys(ReviewObj).map((key, i) =>
                    <div key={i} className="Movies">
                        <span>Review: {ReviewObj[key].review} by {ReviewObj[key].user}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ReviewList