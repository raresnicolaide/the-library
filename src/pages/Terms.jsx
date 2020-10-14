import React from 'react'
import Layout from '../components/layout/Layout'
import Terms from '../assets/images/terms.png'
export default function TermsAndConditions() {
    return (
        <div>
            <Layout>
                <div className='d-flex flex-row justify-content-center p-3'>
                    <img style={{maxWidth:400, height:'auto'}} className='terms' src={Terms} alt='idk'/>
                </div>
            </Layout>
        </div>
    )
}
