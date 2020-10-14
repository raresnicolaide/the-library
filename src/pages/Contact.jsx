import React from 'react'
import Layout from '../components/layout/Layout'
import TextField from '@material-ui/core/TextField';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';


export default function Contact() {
    let name, email, message;
    function handleName(event) {
    }
    function handleEmail(event) {
    }
    function handleMessage(event) {
    }
    return (
        <div>
            <Layout>
                <div className='container-fluid d-flex flex-row'>
                    <div className='w-50 mt-4 mb-4 d-flex flex-column align-items-center'>
                        <Paper square className='w-75 p-5 d-flex flex-column'>
                            <form onSubmit={(e) => { e.preventDefault(); alert('Submitted form!')}} className='d-flex flex-column'>
                            <h3>Contact us</h3>
                            {/* <form className='w-75 p-5 d-flex flex-column'> */}
                                <TextField required id="standard-name" label="Name" value={name} onChange={handleName} />
                                <TextField required id="standard-email" label="Email" value={email} onChange={handleEmail} />
                                <TextField
                                    id="standard-message"
                                    label="Message"
                                    value={message}
                                    onChange={handleMessage}
                                    multiline
                                    rows={4}/>
                                <Button type='submit' className='bg-dark text-light mt-3 w-50 d-flex flex-row align-self-center' variant="contained" >
                                    Submit
                                </Button>
                            {/* </form> */}
                            </form>
                        </Paper>
                    </div>
                    <div className='d-flex flex-column justify-content-center'>
                        <h1>How can we help you?</h1>
                    </div>
                </div>
            </Layout>
        </div>
    )
}
