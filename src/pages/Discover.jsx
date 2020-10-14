import React from 'react';
import HomeCategory from '../components/HomeCategory';
import Layout from '../components/layout/Layout';
import products from '../utils/products.json';


class Discover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        const categories = Object.keys(products)
        // Cand componenta se monteaza, este actualizat state-ul cu categoriile aferente.
        // In mod normal datele ar veni dintr-un API, dar tot in componentDidMount ar fi setate.
        // ATENTIE! La setarea state-ului am folosit ES6, metoda prescurata
        this.setState({categories});
    }
    render() {
        return (
            <Layout>
                <div className='container-fluid container-min-max-width mt-3'>
                    <div className='row'>
                        {this.state.categories.map((category, index) =>
                            <HomeCategory 
                                key={index}
                                route={category}
                                name={products[category].name}
                                description={products[category].description}
                                image={products[category].image}
                            />
                        )}
                    </div>
                </div>
            </Layout>
        )
    }
}
export default Discover;