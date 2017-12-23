import React from 'react'

class Login extends React.Component {

    onSubmit(e) {
        e.prevent.default()
        this.props.logInUser(this.refs.usernameRefs.value, this.refs.passwordRefs.value)
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="string" placeholder="Name" refs="usernameRefs" />
                <input placeholder="password" refs="passwordRefs"/>
            </form>
        )
    }
}

export default Login