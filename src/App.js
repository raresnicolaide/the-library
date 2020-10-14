import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Home from './pages/home/Home';
import About from './pages/about/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Page404 from './pages/Page404';
import Contact from './pages/Contact';
import Shipping from './pages/Shipping';
import Terms from './pages/Terms';
import Category from './pages/category/Category';
import Discover from './pages/Discover';
import Cart from './pages/cart/Cart';
import Favorites from './pages/Favorites';
import Product from './pages/product/Product';

// ATENTIE! Am eliminat importurile si initializarea firebase si App.js! Tot ce avem nevoie se fla in folderul
// apis/firebase

// WOW! App a devenit o functie! Cum? Am mutat toata informatia legata de user in store!


function App() {
    return(
      <div>
        <Switch>
          <Route
            path='/login'
            component={Login}
            />
          <Route path='/register' component={Register}/>
          <Route path='/contact' component={Contact}/>
          <Route path='/terms' component={Terms}/>
          <Route path='/shipping' component={Shipping}/>
          <Route path='/category/:categoryName' component={Category}/>
          <Route path='/product/:productId' component={Product}/>
          <Route 
            exact path='/'
            component={Home}
            />  
          <Route path='/about' component={About}/>
          <Route path='/discover' component={Discover}/>
          <Route path='/cart' component={Cart}/>
          <Route path='/favorites' component={Favorites}/>

          <Route path='*' component={Page404}/>
        </Switch>
      </div>
    );
  }


export default App;
