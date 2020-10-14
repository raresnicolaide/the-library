const initialState = {
    products: []
}

export function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_FAVORITES': 
        let ceva = false;
        state.products.forEach(product => {
            if (product.id === action.payload.product.id) {
                   ceva = true;
            }
        })
        if(!ceva) {
            return Object.assign({}, state, {
                products: [
                    ...state.products,
                    {
                        ...action.payload.product
                    }
                ], 
            })
        } else {
            return Object.assign({}, state, {
                products: [
                    ...state.products
                ], 
            })
        } 
        case 'REMOVE_FROM_FAVORITES':
            let newUpdatedProducts;
            newUpdatedProducts = state.products.filter(product => product.id !== action.payload.product.id )
            return Object.assign({}, state, {
                products: newUpdatedProducts
            })
        default: 
            return state;
    }
}