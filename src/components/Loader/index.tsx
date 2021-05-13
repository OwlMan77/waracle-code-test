import './index.css'
import React from 'react'

import CatImage from '../../assets/cat-loader.gif'

function Loader() {
    return <img className="Loader" src={CatImage} alt="cartoon cat waiting" />
}

export default Loader