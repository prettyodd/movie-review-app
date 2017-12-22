import React from 'react'

class ReviewForm extends React.Component {

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addReview(this.refs.usernameRefs.value, this.refs.reviewRefs.value)
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="review-form">
                <input 
                    type="text" 
                    placeholder="Username" 
                    ref="usernameRefs" />
                  <textarea 
                     type="text"
                     placeholder="Write your review..."
                     ref="reviewRefs"
                     className="form-control" />
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-info">
                       Sumbit
                    </button>
                  </span>
                </div>
            </form>
        )
    }
}

export default ReviewForm