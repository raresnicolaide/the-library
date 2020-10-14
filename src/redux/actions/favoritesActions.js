export function addToFavorites(payload) {
    return {
        // Actiunile au un tip, practic o denumire.
        type: 'ADD_TO_FAVORITES',
        // Payload-ul trebuie mai departe trimis catre reducer.
        payload
    }
}

export function removeFromFavorites(payload) {
    return {
        // Actiunile au un tip, practic o denumire.
        type: 'REMOVE_FROM_FAVORITES',
        // Payload-ul trebuie mai departe trimis catre reducer.
        payload
    }
}