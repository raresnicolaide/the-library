import React, { Component } from 'react';
import products from '../../utils/products.json';
import ProductList from '../../components/ProductList';
import Layout from '../../components/layout/Layout';
import BaseListSideBar from '../../components/BaseListSideBar';
import './Category.css';
export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: {},
            items: [],
            filteredItems: []
        }
    }
    componentDidMount() {
        const { match } = this.props;
        const categoryName = match.params.categoryName;
        this.setState({ 
            category: products[categoryName], 
            items: products[categoryName].items,
            filteredItems: products[categoryName].items
        })
    }

    filterHandler(e){
        switch(e.target.value) {
            case '1': this.setState({
                filteredItems: this.state.items.filter(item => item.price < 100)
            }); break; 
            case '2': this.setState({
                filteredItems: this.state.items.filter(item => item.price >= 100 && item.price <= 150)
            }); break; 
            case '3': this.setState({
                filteredItems: this.state.items.filter(item => item.price > 150)
            }); break; 
            default: this.setState({filteredItems: this.state.items}); break;
        }
    }
    render() {
        return (
            <Layout>
                <div className='container-fluid container-min-max-width p-4'>
                    <div className='d-flex flex-row justify-content-between align-items-end'>
                        <h2 style={{fontWeight:'bold'}}>{this.state.category.name}</h2>
                        <div className='d-flex flex-row justify-content-end'>
                            <BaseListSideBar filterHandler={(e)=>this.filterHandler(e)}/>
                        </div>
                    </div>
                    <hr className='bg-dark'></hr>
                </div>
                <div className='container-fluid container-min-max-width'>
                    <ProductList 
                        products={this.state.filteredItems}
                    />
                </div>
            </Layout>
        )
    }
}
