import React from 'react';
import Layout from '../../components/layout/Layout';
// Avem nevoie de vectorul de produse.
import products from '../../utils/products.json';
import './Product.css';
// Trebuie sa ne conectam la store, pentru a dispatch-ui actiunea de addToCart.
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import { addToFavorites, removeFromFavorites } from '../../redux/actions/favoritesActions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }
   
    componentDidMount() {
        // Id-ul produsului este luat din ruta.
        const { match } = this.props;
        const productId = match.params.productId;
        // In JSON-ul products avem un obiecte care are drept chei categoriile. Vrem sa preluam informatiile
        // despre categorii si sa le punem intr-un array.
        const categoryValues = Object.values(products);

        // Ne cream o variabila in care vom stoca datele despre produsul curent
        let currentProduct;

        // Trebuie sa parcurgem fiecare categorie
        categoryValues.forEach((category) => {
            // Si sa cautam in itemii categoriei produsul cu id-ul similar celui din ruta
            // Cum functioneaza find:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
            const findResult = category.items.find((product) => {
                // Cu typeof puteti verifica tipul si SURPRIZA: unul e string, altul e number... => CONVERTIM
                // NU PUNETI ==, CONVERTITI!
                return product.id === Number(productId);
            });
            // Daca am gasit produsul, il salvam in variabila currentProduct
            if (findResult) {
                currentProduct = findResult;
            }
        });
        
        this.setState({ product: currentProduct });
    }

    render() {
        const { product } = this.state;
        let productFromProps = this.props.products.find((prod) => {
            return prod.id === product.id;
        })
        return (
            <Layout>
                <div className="product-page content-min-height container-fluid container-min-max-width">
                    {/* Adaugam markup-ul pentru pagina de produs */}
                    <h1 className="d-flex w-50 flex-row justify-content-start ml-3 my-5 h2"><strong>{product.name}</strong></h1>

                    {/* Am aduagat clase pentru stilizarea pe mobile */}
                    <div className="product-info d-flex">
                        <div className="image-wrapper d-flex ml-2 mr-4">
                            <img src={product.image} alt="Product presentation"/>
                        </div>
                        <div className="w-50 product-details d-flex flex-column pr-4">
                            
                            <p className="h3 text-danger">{product.price} {product.currency}</p>
                            <div className='w-50 d-flex flex-row align-items-center'>
                            <button
                                className="btn btn-dark font-weight-bold"
                                // La click pe buton, adaugam in cart-ul din store.
                                onClick={() => 
                                    this.props.addToCart({
                                        product: {
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            currency: product.currency,
                                            image: product.image
                                        }
                                    })
                                }
                            >
                                Add to cart
                            </button>
                            <IconButton onClick={() => {
                                productFromProps !== undefined
                                ? this.props.removeFromFavorites({
                                    product: {id: product.id}
                                })
                                : this.props.addToFavorites({
                                    product: {
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        currency: product.currency,
                                        image: product.image
                                    }
                                })
                            }
                            }>
                                {
                                    (productFromProps !== undefined)
                                    ? <FavoriteIcon/>
                                    : <FavoriteBorderIcon/> 
                                }
                                
                            </IconButton>
                            </div>                            
                            <p><span className="font-weight-bold">Author</span>: {product.author}</p>
                            <p><span className="font-weight-bold">ISBN</span>: {product.isbn}</p>
                            <p><span className="font-weight-bold">Publication date</span>: {product.date}</p>
                            <p className="font-weight-bold  mb-1">Description:</p>
                            <p style={{textAlign: 'justify'}} className='desc'>{product.description}</p>
                        </div>
                        <div className='authorDetails container-fluid w-50 h-50 '>
                            <Paper elevation={3} square className='px-2'>
                                <p className='pl-3 pr-3 pt-3' ><strong>About {product.author}</strong></p>
                                <Divider  className='w-75 ml-3'/>
                                <div className='d-flex flex-row justify-content-around align-items-center'>
                                    <div className=''>
                                        <Avatar style={{width: 100, height: 100, marginLeft:20, marginTop: 10}} alt={product.author} src={product.authorPicture} />
                                    </div>
                                    <h3 className='w-50 mt-50'><strong>{product.author}</strong></h3>
                                </div>
                                <p style={{textAlign: 'justify'}} className='p-3'>{product.authorDescription}</p>
                            </Paper>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

// Avem nevoie sa ne conectam la store si sa aducem in props dispatch-ul metodei addToCart.
function mapDispatchToProps(dispatch) {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
        addToFavorites: (payload) => dispatch(addToFavorites(payload)),
        removeFromFavorites: (payload) => dispatch(removeFromFavorites(payload))

    }
}
function mapStateToProps(state) {
    return {
        products: state.favorites.products
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Product);