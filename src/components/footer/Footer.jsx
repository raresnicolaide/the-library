import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import {Icon}  from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

function Footer() {
    return(
        <footer>
            <div className='title p-3'>
                <h1> REA(D)CH NEW HEIGHTS </h1>
            </div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-4 d-flex flex-column'>
                        <Link to='/about'>About</Link> 
                        <Link to='/terms'>Terms & Conditions</Link>
                    </div> 
                    <div className='col-4 d-flex flex-row justify-content-around align-items-center'>
                        <a href="https://github.com/raresnicolaide">
                            <Icon component={GitHubIcon}/> 
                        </a>
                        <a href="https://linkedin.com/in/rareș-mihai-nicolaide-9a73a4140">
                            <Icon component={LinkedInIcon}/>
                        </a>
                    </div>
                    <div className='col-4  d-flex flex-column align-items-end'>
                        <Link to='/contact'>Contact</Link>
                        <Link to='/shipping'>Shipping</Link>
                    </div>

                </div>
            </div>
            <div className="a text-center py-1">
                &copy; Rares Nicolaide, 2020
            </div>
        </footer>
    );
}

export default Footer;