import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner 
            animation="grow" 
            role="status" 
            variant="dark"
            style={{
                height:'100px',
                width: '100px',
                margin: '0px auto',
                display: 'block'
            }}
        >
            <span className='sr-only'></span>
        </Spinner>
    )
}

export default Loader