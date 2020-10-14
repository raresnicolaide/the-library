import React from 'react';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Photo from '../../assets/images/foto.png';
import Button from '@material-ui/core/Button';
import './Home.css';

function Home(props) {
    const {user, signOut} = props;
    
    return(
        <div className='home'>
            <Layout
                user={user}
                signOut={signOut}
            >
                <div className='image'>
                    <Paper
                        className='square d-flex flex-column align-items-center ml-5'
                        square 
                        elevation={0}>
                        <img src ={Photo} alt='Greetings' className='greetings'/>
                        <Link className='mb-3' to='/discover'>
                            <Button size='large' style={{background:'rgb(251, 251, 83)', fontWeight:'bold'}}>Discover</Button>
                        </Link>
                    </Paper>
                </div>
            </Layout>
        </div>
    );
}


export default Home;