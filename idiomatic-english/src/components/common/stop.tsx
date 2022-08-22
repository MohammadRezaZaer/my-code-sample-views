import React from 'react'

const Stop = ({onPlayerClick}) => {
    return (

    <svg  onClick={(event) => {
        event.stopPropagation();
        onPlayerClick();
    }} className="fill-current  button w-5 " viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">

            <rect width="27" height="27" rx="4" fill="currentColor"/>


    </svg>

)
}

export default Stop