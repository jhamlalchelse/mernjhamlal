import React from 'react'
import {Link} from 'react-router-dom'
import './error.css'

const Error = () => {
    return (
        <>
        <div className="div-error">
            <h1>WE ARE SORRY PAGE, NOT FOUND!</h1>
            <p>THE PAGE WE ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD IT NAME CHANGED OR ITS TEMPORARILY REMOVED</p>
            <button className=" btn btn-outline-danger w-50"><Link to="/" style={{textDecoration:"none"}}>Home</Link></button>
        </div>
        </>
    )
}

export default Error
