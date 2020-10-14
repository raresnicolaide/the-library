import React from 'react';
import './ProductItem.css';
import { Link } from 'react-router-dom';
// Pentru a conecta componenta la store importam HOC-ul connect
import { connect } from 'react-redux';
// Trebuie sa importam actiunile pe care le vom utiliza(dispatch-ui).
import { addToCart } from '../../redux/actions/cartActions';
import Button from '@material-ui/core/Button';
import { Rating } from '@material-ui/lab';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { addToFavorites, removeFromFavorites } from '../../redux/actions/favoritesActions';

function ProductItem(props) {
    
        // Trebuie sa extragem si id-ul pentru ca in reducerul ce aduaga in cart il folosim.
    const { image, name, price, currency, id, rating } = props;

    let productFromProps = props.products.find((product) => {
            return product.id === Number(id);
    })
        
    return (
        <div className='mb-5 product-item col-4 d-flex flex-column justify-content-center align-items-center'>
            {/* Adaugam un link catre pagina de produs, precum si stilizare. */}
            <Link to={`/product/${id}`} className="text-dark d-flex flex-column align-items-center">
            <Paper className='mb-3' square elevation={2} >
                <img src={image} alt='item'></img>
            </Paper>
            <p>{name}</p>
            <p><strong>{price} {currency}</strong></p>
            </Link>
            <Rating name="read-only" value={rating} readOnly />
            
            <IconButton onClick={() => {
                productFromProps !== undefined
                ? props.removeFromFavorites({
                    product: {id}
                })
                : props.addToFavorites({
                    product: {
                        id,
                        name,
                        price,
                        currency,
                        image
                    }
                })
            }}>
                {
                    (productFromProps !== undefined)
                    ? <FavoriteIcon />
                    : <FavoriteBorderIcon/> 
                }
                
            </IconButton>
            
            <div className='d-flex flex-row justify-content-around align-content-between'>
                <Button
                    className='bg-dark text-white'
                    color='inherit'
                    // ATENTIE! Nu uitati ca in metoda mapDispatchToProps definiti actiuni ce sunt
                    // salvate in props-uri! Deci cand le apelati efectiv, trebuie sa folositi props.<numeActiune>
                    // De asemenea, AVETI GRIJA la payload-ul pe care il pasati actiunii!!
                    // El trebuie sa coresponda ca structura cu payload-ul folosit in actiuni si reduceri.
                    onClick={() => props.addToCart({
                        product: {
                            id,
                            name,
                            price,
                            currency,
                            image
                        }
                    })
                    }
                > 
                    Add to cart
                </Button>
            </div>
        </div>
    )
}
// Functia mapDispatchToProps trimite actiuni catre store. Cum? Cand este apelata de connect, primeste automat
// functia dispatch. Cand dispatch este APELATA primeste ca parametru un apel de actiune(din folderul actions,
// creat de noi). Practic, in acest mod, rezultatul executiei actiunii va fi pasat catre store, iar store-ul
// va stii astfel sa APELEZE reduce-erul corespunzator.
// TOTUSI, noi trebuie actiunii sa ii pasam un payload, iar acesta se va pasa din interiorul componentei(fie
// el un id sau un produs intreg). Astfel trebuie sa ne definim o metoda, care va fi disponibila IN PROPS-urile
// componentei (mapDispatchToProps va returna un obiect, ale caror chei vor fi props-uri noi pentru componenta
// (ProductItem)). DECI ne definim o metoda numita addToCart, care va primi un payload si va APELA metoda dispatch,
// careia ii trimitem ca parametru actiunea IMPORTATA din folderul actions, care la randul ei trebuie sa primeasca
// mai departe payload-ul.

function mapDispatchToProps(dispatch) {
    return {
        addToCart: (payload) => dispatch(addToCart(payload)),
        addToFavorites: (payload) => dispatch(addToFavorites(payload)),
        removeFromFavorites: (payload) => dispatch(removeFromFavorites(payload))
    };
}
function mapStateToProps(state) {
    return {
        products: state.favorites.products
    };
}

// Cart-ul trebuie sa fie conectat la store, deci vom folosi HOC-ul connect, care primeste automat
// ca parametri mapStateToProps si mapDispatchToProps, pe care NOI trebuie sa le implementam.
// In cazul de fata, nu avem nevoie sa luam ceva din store, deci nu avem nevoie de metoda mapStateToProps,
// asadar putem sa pasam null in loc de vreo implementare.
// ATENTIE! Trebuie ca cele doua metode sa fie pasate lui connect IN ORDINEA CORESPUNZATOARE(1. state; 2. dispatch),
// dar pot fi denumire diferit, cu conditia ca si numele metodei de mai sus(cand ii e scrisa implementarea) sa fie acelasi.
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);

