import React from 'react'

const Sound = ({onPlayerClick}) => {
    return (

    <svg  onClick={(event) => {
        event.stopPropagation();
        onPlayerClick();
    }} className="fill-current  button w-6 mx-2" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M19.779 2.349L18.668 4.013C20.699 5.663 22 8.179 22 11C22 13.822 20.699 16.338 18.668 17.988L19.779 19.651C22.345 17.639 24 14.516 24 11C24 7.485 22.346 4.362 19.779 2.349ZM17.55 5.687L16.428 7.367C17.396 8.28 18.008 9.565 18.008 11.001C18.008 12.437 17.396 13.723 16.428 14.636L17.55 16.316C19.047 15.03 20 13.128 20 11C20 8.873 19.048 6.971 17.55 5.687ZM12 0C10.823 0 10.467 0.684 10.467 0.684C10.467 0.684 7.406 4.047 5.298 5.531C4.91 5.778 4.484 6 3.73 6H2C0.896 6 0 6.896 0 8V14C0 15.104 0.896 16 2 16H3.73C4.484 16 4.91 16.222 5.297 16.469C7.405 17.953 10.466 21.317 10.466 21.317C10.466 21.317 10.823 22 12 22C13.104 22 14 21.105 14 20V2C14 0.895 13.104 0 12 0Z" />
    </svg>

)
}

export default Sound