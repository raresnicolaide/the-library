import React from 'react';
import Layout from '../../components/layout/Layout';
import AboutPic from '../../assets/images/about.png';
import Paper from '@material-ui/core/Paper';
import './About.css';


function About() {
    return(
        <div>
            <Layout>
                <div className='w-100 d-flex flex-row justify-content-center p-5'>
                    <Paper elevation={5} square>
                        {/* <h3><strong> About me </strong></h3>
                        <Divider/>
                        <Avatar style={{width: 100, height: 100, marginLeft:20, marginTop: 10}} alt='Rares Nicolaide' src={Me} /> */}
                        <img className='me-picture' src={AboutPic} alt='demo' />
                    </Paper>

                </div>

            </Layout>
        </div>
    );
}

export default About;