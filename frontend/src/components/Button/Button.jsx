
import React from 'react'
import { Link } from 'react-router-dom'

function Button({ name, path }) {
    return (
        <Link to={path}>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:via-purple-500 hover:to-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
                {name}
            </button>
        </Link>
    )
}


export default Button