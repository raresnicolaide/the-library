// In acest folder vom scrie toti reducerii pentru a actualiza state-ul referitor la cart.

// Un reducer trebuie sa aiba o stare initiala. Similar cu o componenta de React!
const initialState = {
    products: []
}
// Reducerul este o functie care primeste de la redux ca parametru state-ul de la acel moment,
// precum si o actiune. Reducerul verifica tipul(numele) actiunii, iar daca acesta coincide tipului
// returnat de actiunea invocata din componenta, atunci va RETURNA state-ul modificat corespunzator.
// initialState este un default parameter, adica daca state-ul pentru reducer nu a fost inca initializat,
// atunci va fi initializat cu initialState.

export function cartReducer(state = initialState, action) {
    // Afisam state-ul din reducer INAINTE sa il actualizam.
    // Vom vedea data viitoare cum putem face debugging mai eficicent.
    // Evaluam tipul actiunii
    switch(action.type) {
        case 'ADD_TO_CART':
            let productInCart = false;
            // ATENTIE! NU dorim sa modificam state-ul primit ca parametru! Reducerul este o functie pura,
            // fara side effect-uri. Asadar, o metoda precum push nu are ce cauta aici.
            // Cand adaugam un produs in cart, trebuie mai intai sa verificam daca el deja exista. Daca nu exista,
            // il adaugam ca fiind un element nou, cu cantitate 1. Daca deja exista, ii marim cantitatea cu 1.
            const updatedProducts = state.products.map(product => {
                if (product.id === action.payload.product.id) {
                    productInCart = true;
                    return {
                        ...product,
                        quantity: product.quantity + 1
                    }
                } else {
                    return product;
                }
            })
            if (!productInCart) {
                 // ATENTIE! NU MODIFICATI PARTIAL STATE-UL! Cand vreti sa modificati un camp al state-ului,
                // folositi Object.assign sau operatorul ... . Practic, campul products al state-ului va fi
                // inlocuit de noua valoare a lui products
                return Object.assign({}, state, {
                    products: [
                        // Din nou, ATENTIE, nu modificati PARTIAL vectorul products. Operatorul ... sau
                        // Object.assign creaza o SHALLOW copy. VA ROG INSISTENT, CONSULTATI SECTIUNEA
                        // DE IMUTABILITATE DE LA TEORIE!!!
                        ...state.products,
                        {
                            ...action.payload.product,
                            quantity: 1
                        }
                    ]
                })
            } else {
                return Object.assign({}, state, {
                    products: updatedProducts
                });
            }
        case 'REMOVE_FROM_CART':
            let numberOfProducts;
            let newUpdatedProducts;

            state.products.forEach(product => {
                if (product.id === action.payload.product.id) {
                    numberOfProducts = product.quantity
                }
            })
            if (numberOfProducts > 1 ) {
                newUpdatedProducts = state.products.map(product => {
                    if (product.id === action.payload.product.id) {
                        return {
                            ...product,
                            quantity: product.quantity - 1
                        }
                    }
                    return {
                        ...product
                    }
                })
            } else {
                newUpdatedProducts = state.products.filter(product => product.id !== action.payload.product.id )
            }

            return Object.assign({}, state, {
                products: newUpdatedProducts
            })
        
        case 'CHANGE_QUANTITY': 
            let newProducts;
            newProducts = state.products.map(product => {
                if (product.id === action.payload.product.id) {
                    if (action.payload.product.newQuantity > 0) {
                        return {
                            ...product,
                            quantity: action.payload.product.newQuantity
                        }
                    } 
                }
                return {
                    ...product
                }
            })
            return Object.assign({}, state, {
                products: newProducts
            })

        default: 
            return state;

    }
}