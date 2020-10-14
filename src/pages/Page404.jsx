import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../assets/images/logowbg.png';
function Page404() {
    return(
        <div className="d-flex flex-column align-items-center">
                <h1 className='m-5'> Error 404: Page not found</h1>
                <Link to='/'>
                    <img src={Logo} alt="logo" />
                </Link>
        </div>
    );
}

export default Page404;