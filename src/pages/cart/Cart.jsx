
import React from 'react';
import Layout from '../../components/layout/Layout';
// importam HOC-ul connect
import { connect } from 'react-redux';
// importam Link-ul din router
import { Link } from 'react-router-dom';
// importam fisierul css corespunzator
import './Cart.css';
// importam iconita de stergere a produsului
import { ReactComponent as Close} from '../../assets/icons/close.svg';
import { changeQuantity, removeFromCart } from '../../redux/actions/cartActions';
import InputLabel from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

function Cart(props) {
    const totalSum = (products) => {
        return products.reduce((acc, product) => {
            return acc + product.quantity * product.price;
        
        }, 0)
    }
    return(
        // Nu uitam de Layout, pentru a avea Header si Footer
        <Layout>
            <div className="cart-page container-fluid container-min-max-width
                d-flex flex-column justify-content-center align-items-center">
                {
                    // Daca avem produse in cart, le afisam.
                    // PRODUSELE sunt venite din store si salvate in props prin functia mapStateToProps!!
                    props.products.length
                    ? 
                    <div className="w-75 d-flex flex-column">
                            <h2 className='pt-3'>Cart</h2>

                        {/* <div className="d-flex justify-content-around text-center h4 text-bold">
                            <p className="w-25">Produs</p>
                            <p className="w-25">Cantitate</p>
                            <p className="w-25 pr-5">Pret</p>
                        </div> */}
                        {
                            // Afisam produsele din cart.
                        
                            props.products.map(product => {
                                return (
                                    <div key={product.id} className='top d-flex justify-content-center'>
                                        <Paper square classes={{root:'w-100 bg-light d-flex justify-content-around align-content-center text-center mt-3 mb-3'}} elevation={5} >
                                            <div className="w-100 bg-light d-flex justify-content-around align-items-center text-center pt-4 mb-3" key={product.id}>
                                                <div className='d-flex flex-column justify-content-center align-items-center'>
                                                    <Link to={`/product/${product.id}`} className="text-dark d-flex flex-column align-items-center" >
                                                    <img src={product.image} alt="Produs"/>
                                                    <p>{ product.name }</p>
                                                    </Link>
                                                </div>                                    
                                                <InputLabel style={{width:75}} type={'number'} value={product.quantity} onChange={(event) => props.changeQuantity({
                                                    product: {
                                                        id: product.id,
                                                        newQuantity: event.target.value
                                                    }
                                                })}>
                                                </InputLabel>
                                                <div className="d-flex justify-content-center">
                                                    <p className="mr-2">{ product.price * product.quantity } { product.currency }</p>
                                                </div>
                                            </div>
                                        </Paper>
                                        <div className='d-flex align-items-center pl-4 mb-3'>
                                            <Close onClick={() => props.removeFromCart({
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
                        <div className='d-flex flex-row justify-content-end pr-5'>
                            <h2 className='pr-2'>Total:</h2>
                            {
                                <h2>
                                    {
                                    totalSum(props.products)
                                    }
                                    {
                                    props.products[0].currency
                                    }
                                </h2>
                            }
                        </div>
                        
                    </div>
                    : <div className="d-flex flex-column align-items-center">
                        <p className="h3">You don't have products in the cart!</p>
                        <Link to="/discover"><button className="btn btn-outline-dark">Back to shopping</button></Link>
                    </div>
                }
            </div>
        </Layout>
    );
}

// Functia mapStateToProps ia parti din state-ul store-ului si le aduce ca PROPS-uri in componenta curenta.
// Cand este apelata de connect functia primeste automat state-ul store-ului. Pentru a primi in props campuri din
// state, functia trebuie sa returneze un obiect, ale carui chei vor reprezenta NUMELE noilor props-uri ce vor fi
// injectate in componenta curenta (Cart), care vor avea ca valori diverse campuri din state-ul din store.
function mapStateToProps(state) {
    return {
        products: state.cart.products
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeFromCart: (payload) => dispatch(removeFromCart(payload)),
        changeQuantity: (payload) => dispatch(changeQuantity(payload))
    };
}

// Cart-ul trebuie sa fie conectat la store, deci vom folosi HOC-ul connect, care primeste automat
// ca parametri mapStateToProps si mapDispatchToProps, pe care NOI trebuie sa le implementam.
// ATENTIE! Trebuie ca cele doua metode sa fie pasate lui connect IN ORDINEA DE MAI SUS, dar pot fi denumire
// diferit, cu conditia ca si numele metodei de mai sus(cand ii e scrisa implementarea) sa fie acelasi.
export default connect(mapStateToProps, mapDispatchToProps)(Cart);