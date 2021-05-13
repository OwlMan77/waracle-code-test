import './index.css'
import React, { PropsWithoutRef } from 'react'

type ErrorProps = {
    errorMessage: string | null
}

function Error(props: PropsWithoutRef<ErrorProps>) {
    const { errorMessage } = props
    return errorMessage ? <div className="error-container"> {errorMessage} </div> : null
}
  
export default Error