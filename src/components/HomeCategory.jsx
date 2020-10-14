import React from 'react'
import {Link} from 'react-router-dom'

export default function HomeCategory(props) {
    const { route, name, description,image } = props;
    return (
        <div className='col-4 mb-3'>
            <Link to={`/category/${route}`}>
                <div className='w-100'>
                    <img src={image} alt={description} className='w-100'/>
                </div>
                <h2 className='text-dark h4 my-1'><strong>{name}:</strong> </h2>
                <p className='text-dark m-0'> {description} </p>
            </Link>
            
        </div>
    )
}
