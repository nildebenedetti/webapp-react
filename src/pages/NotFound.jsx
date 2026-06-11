import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
    <div className='container text-center mt-5'>
    <h1>Something went wrong</h1>
    <h2>Error 404</h2>
    <Link to="/Homepage">
    <button className='btn btn-warning'>COME BACK 'HOME'</button>
    </Link>
    </div>
    </>
  )
}

export default NotFound