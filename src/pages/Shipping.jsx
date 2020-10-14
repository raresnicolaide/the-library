import React from 'react';
import Layout from '../components/layout/Layout';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

export default function Shipping() {
    return (
        <div>
            <Layout>
                <LocalShippingIcon className='m-5' style={{width:300, height:300, color:'black'}}/>
            </Layout>
        </div>
    )
}
