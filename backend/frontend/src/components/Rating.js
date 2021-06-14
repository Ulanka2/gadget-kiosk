import React from 'react'

const Rating = ({value, text, color}) => {
    const rateColor = (value1, value2) => {
        return value >= value1 ? 'fas fa-star': value >= value2 ? 'fas fa-star-half-alt' : 'far fa-star'
    }

    return (
        <div className="rating">
            <span>
                <i className={rateColor(1,0.5)} style={{color}}></i>
            </span>
            <span>
                <i className={rateColor(2,1.5)} style={{color}}></i>
            </span>
            <span>
                <i className={rateColor(3,2.5)} style={{color}}></i>
            </span>
            <span>
                <i className={rateColor(4,3.5)} style={{color}}></i>
            </span>
            <span>
                <i className={rateColor(5,4.5)} style={{color}}></i>
            </span>

            <span>{text && text}</span>
        </div>
    )
}

export default Rating