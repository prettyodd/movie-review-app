import React from 'react'

class ReviewForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="review-form">
                <input 
                    type="text" 
                    placeholder="Username" 
                    ref={input => this.usernameRefs = input} />
                  <textarea 
                     type="text"
                     placeholder="Write your review..."
                     ref={input => this.reviewRefs = input}
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