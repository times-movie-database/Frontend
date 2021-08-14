import React from 'react'

export default function Review(props) {
    return (
        <div>
            <div>{props.timestamp}</div>
            <div>{props.children}</div>
        </div>
    )
}
