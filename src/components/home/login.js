import React from 'react'

const Login = ({ currentUser, logOut=f=>f }) => {

    return (
        <div>
        <span style={{ marginRight: 10 }} >You logged in as <strong>{currentUser}</strong></span>
        <span><button onClick={logOut}>Log out</button></span>
        </div>
    )
}

export default Login