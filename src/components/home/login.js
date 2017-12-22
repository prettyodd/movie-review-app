import React from 'react'

class Login extends React.Component {
    render() {
        return (
            <div>
                <input type="string" placeholder="Name" />
                <input placeholder="password" />
            </div>
        )
    }
}

export default Login