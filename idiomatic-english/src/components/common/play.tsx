import React from 'react'

const Play = ({onPlayerClick}) => {
    return (

    <svg  onClick={(event) => {
        event.stopPropagation();
        onPlayerClick();
    }} className="fill-current  button w-5" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">

        <path d="M0 3.91295C-3.46032e-08 0.905243 3.6 -0.974567 6.48 0.529284L24.84 10.1163C27.72 11.6202 27.72 15.3798 24.84 16.8837L6.48 26.4707C3.6 27.9746 2.55199e-07 26.0948 2.20595e-07 23.0871L0 3.91295Z" fill="CurrentColor"/>



    </svg>

)
}

export default Play