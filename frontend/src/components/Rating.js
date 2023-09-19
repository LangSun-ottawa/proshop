import React,{useEffect, useState} from 'react'

function Rating(props) {
    const {_id ,value, text, color} = props
    const [stars, setStarts] = useState([])

    useEffect(() => {
        startsHandle()
    }, [value, color])

    const startsHandle = () => {
        let startTmp = []
        for(let i = 0; i < 5; i++){
            let className = value >= (i+1) ? 'fas fa-star' : value >= (i + 0.5) ? 'fas fa-star-half-alt' : 'far fa-star'
            startTmp.push(<i key={`${_id}-${i}`} style={{color}} className={className}></i>)
        }
        setStarts(startTmp)
    }

    return (
        <div className='rating'>
            {stars}
        </div>
    )
}

export default Rating
