// In acest folder vom scrie toate actiunile referitoare la manipularea produselor din cart.

// Actiunile sunt simple functii care RETURNEAZA un OBIECT.
// Actiunea primeste un "payload". Acest payload va contine datele pasate din componenta,
// necesare pentru a actualiza store-ul. De exemplu, pentru a adauga un item in cart, trebuie
// sa trimitem catre actiune datele item-ului (name, price etc.).

export function addToCart(payload) {
    return {
        // Actiunile au un tip, practic o denumire.
        type: 'ADD_TO_CART',
        // Payload-ul trebuie mai departe trimis catre reducer.
        payload
    }
}

export function removeFromCart(payload) {
    return {
        type: 'REMOVE_FROM_CART',
        payload
    }
}

export function changeQuantity(payload) {
    return {
        type: 'CHANGE_QUANTITY',
        payload
    }
}