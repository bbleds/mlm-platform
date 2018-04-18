import React from 'react'

export default () => {
  return(
      <div>
        <h1>Login or Register</h1>
        <div className="card-panel">
            <ul>
                <li> <a href="/api/v1/auth/google">Login or Register with Google</a></li>
            </ul>
        </div>
    </div>
  )
}