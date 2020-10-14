import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css'
import Logo from '../../assets/images/logo.png';
// In header dorim sa afisam numarul de produse din cart. Asadar, trebuie sa ne conectam
// la store-ul global pentru a-l extrage
import { connect } from 'react-redux';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
// Importam metoda signOut din folderul apis/firebase.
import { logoutUser } from '../../redux/actions/userActions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import products from '../../utils/products.json';

const createHistory = require("history").createBrowserHistory;

function Header(props) {
    // Am eliminat din Header props-urile ce veneau din Layout!
    // Acum signOut-ul este injectat in props prin metoda mapDispatchToProps si va lansa actiunea
    // logoutUser(importata si ea). 

    const categoryValues = Object.values(products);
    const everyItem = categoryValues.map((category) => category.items).flat();
    const handleSearch = (event, values) => {
        const cct = Number(values.id);
        let history = createHistory();
        history.push(`/product/${cct}`);
        let pathUrl = window.location.href;
        window.location.href = pathUrl;   
    }

    return(
        <header >
            <div className='login'>
                {/* ATENTIE! Daca avem informatii despre user, atunci ii vom afisa un mesaj.
                Daca userul nu este logat, se va primi null ca valoare, deci nu com afisa nimic.*/}
                 {/* Atentie! Userul este preluat din store, deci il vom referi ca props.user. */}
                { props.user
                ? //<p className='pr-4 mt-3'>Hello, {props.user.displayName}!</p>
                <div className='d-flex flex-row mt-3 mr-3 align-self-center'>
                    <p className='mr-3'>Hello, {props.user.displayName}!</p>
                    <Avatar style={{width: 26, height: 26 }} alt={props.user.displayName} src={props.user.photoURL} />
                </div>
            
                : null
                }
                
                { props.user
                ? <p className='logout mt-3' onClick={() => props.signOut()}>Log out</p >
                : <Link to='/login'>Log in</Link> 
                }
            </div>
            <Paper square elevation={5}>
            <div className='bar d-flex align-items-center'>
                <Link to='/'>
                    <img src = { Logo } alt='Rares Travel' className='logo'/>
                </Link>
                <div className='rica w-50 d-flex flex-row justify-content-start mt-3'>
                    <Link to='/discover'>
                        <p className='h5 d-flex text-dark mt-3 mr-4 ml-4'>Shop</p>
                    </Link>
                    <Link to='/contact'>
                        <p className='h5 text-dark mt-3 mr-4 ml-4'>Contact</p>
                    </Link>
                    <Link to='/about'>
                        <p className='h5 text-dark mt-3 mr-4 ml-4'>About us</p>
                    </Link>
                    <Link to='/cart'>
                        <p className='h5 text-dark mt-3 mr-4 ml-4'>Cart</p>
                    </Link>
                    
                </div>
                <div className='mt-3 w-50 d-flex felx-row justify-content-end align-items-end'>
                    {/* <TextField
                        size='small'
                        placeholder='search products'
                        style={{marginRight:20, width:150}}
                        id="input-with-icon-textfield"
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                        }}
                    /> */}
                    <Autocomplete
                        id="combo-box"
                        options={everyItem}
                        getOptionLabel={(option) => option.name}
                        style={{ width: 180, marginRight: 20 }}
                        onChange={handleSearch}
                        renderInput={(params) => <TextField {...params} size='small' label="Search products" />}
                    />
                    <Link to='/favorites'>
                        <FavoriteIcon style={{color:'black', marginRight:0}}/>
                    </Link>
                    <Link to='/cart'>
                        <Badge 
                                style={{marginLeft:20,  marginRight:25}}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }} 
                                badgeContent={props.numberOfProducts} color="secondary">
                                <ShoppingCartIcon style={{color:'black'}}/>
                        </Badge>
                    </Link>
                </div>
            </div>
            </Paper>
        </header>
    );
}
// Functia mapStateToProps ia parti din state-ul store-ului si le aduce ca PROPS-uri in componenta curenta.
// Cand este apelata de connect functia primeste automat state-ul store-ului. Pentru a primi in props campuri din
// state, functia trebuie sa returneze un obiect, ale carui chei vor reprezenta NUMELE noilolor props-uri ce vor fi
// injectate in componenta curenta(Header), care vor avea ca valori diverse campuri din state-ul din store.
// Am adaugat la mapStateToProps un nou camp: user. Aici se gasesc datele necesare despre user.
function mapStateToProps(state) {
    let incremented = 0; 
    state.cart.products.forEach(product => {
        incremented = Number(incremented) + Number(product.quantity)
    } )
    return {
        numberOfProducts: incremented,
        user: state.user.data
    }
}
// Avem nevoie de actiunea logoutUser, importata din redux/actions, care va face logarea efectiva a userului.
function mapDispatchToProps(dispatch) {
    return {
        signOut: () => dispatch(logoutUser())
    }
}
// Cart-ul trebuie sa fie conectat la store, deci vom folosi HOC-ul connect, care primeste automat
// ca parametri mapStateToProps si mapDispatchToProps, pe care NOI trebuie sa le implementam.
// In cazul de fata, nu avem nevoie sa trimitem actiuni catre store, deci nu avem nevoie de metoda mapDispatchToProps,
// asadar putem sa pasam null in loc de vreo implementare.
// ATENTIE! Trebuie ca cele doua metode sa fie pasate lui connect IN ORDINEA CORESPUNZATOARE(1. state; 2. dispatch),
// dar pot fi denumire diferit, cu conditia ca si numele metodei de mai sus(cand ii e scrisa implementarea) sa fie acelasi.
export default connect(mapStateToProps, mapDispatchToProps)(Header);
