import React from 'react'
import Layout from '../components/layout/Layout'
import { connect } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeFromFavorites } from '../redux/actions/favoritesActions';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

function Favorites(props) {
    return (
            // Nu uitam de Layout, pentru a avea Header si Footer
            <Layout>
                <div className="cart-page container-fluid container-min-max-width
                    d-flex flex-column justify-content-center align-items-around">
                    {
                        // Daca avem produse in cart, le afisam.
                        // PRODUSELE sunt venite din store si salvate in props prin functia mapStateToProps!!
                        props.products.length
                        ? 
                        <div className="w-100 d-flex flex-column align-items-center">
                            <h2 className='pt-3'>Favorites</h2>

                            {
                                // Afisam produsele din cart.
                                props.products.map(product => {
                                    return (
                                        <div key={product.id} className='w-75 d-flex justify-content-center'>
                                            <Paper square classes={{root:'w-100 bg-light d-flex justify-content-around align-items-center text-center mt-3 mb-3'}} elevation={5} >
                                            <div className="w-100 bg-light d-flex justify-content-around align-items-center text-center pt-4 mb-3" key={product.id}>
                                                <div className='d-flex flex-column justify-content-center align-items-around'>
                                                        <Link to={`/product/${product.id}`} className="text-dark d-flex flex-column align-items-center" >
                                                            <img src={product.image} alt="Produs"/>
                                                            <p>{ product.name }</p>
                                                        </Link>
                                                        
                                                    </div>
                                                                                        
                                                    <div className="d-flex justify-content-center">
                                                        <p className="mr-2">{ product.price} { product.currency }</p>
                                                    </div>
                                                </div>
                                            </Paper>
                                            <div className='d-flex align-items-center pl-4 mb-3'>
                                            <DeleteIcon onClick={() => props.removeFromFavorites({
                                                product: {
                                                    id: product.id
                                                }
                                                })}
                                            />
                                        </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        : <div className="d-flex flex-column align-items-center">
                            <p className="h3">You don't have favorite products yet!</p>
                            <Link to="/discover"><button className="btn btn-outline-dark">Back to shopping</button></Link>
                        </div>
                    }
                </div>
            </Layout>
        );
}

function mapStateToProps(state) {
    return {
        products: state.favorites.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
        removeFromFavorites: (payload) => dispatch(removeFromFavorites(payload)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);