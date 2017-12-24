import React from 'react'

const Login = ({ currentUser, logOut=f=>f }) => {

    return (
        <div>
        <p>You logged in as: {currentUser}</p>
        <a onClick={logOut}>Log out</a>
        </div>
    )
}

export default Login