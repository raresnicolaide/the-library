# the-library
 It is an E-commerce website made with React. In the process I used Redux for state management, React Router... well, for routing. I've also used Firebase API for authentication with Google and Facebook. Regarding aesthetics, I employed Material-UI as well as Bootstrap. 

## Demo

The result can be observed here:

https://rares-the-library.herokuapp.com/ 

## Functionalities

* Click on discover button - opens the page listing all categories

* Click on any category - it will list the corresponding products

* Click on the "Add to cart" button of each product (either from the category page or from the product page) - the product will be added to the cart. The corresponding icon is updated if both the quantity of products and the number of products increase

* Click on the empty heart icon - the product is added to Favorites

* Click on the full heart icon - the product is deleted from Favorites

* Click on the product - it will take you to the product page

* Click on "Login" - it will redirect you to the Login page, where you can click on the "Log in with Google / Facebook" button which opens a popup page for logging in

* Click on cart (icon) - it will display the products added to the cart. By clicking on the "X" icon you can remove a product from the cart

* Click on the heart (icon) - it will display the products added to the favorites. By clicking on the "trash" icon you can remove a product from favorites

* Click on the searchbar - you will be able to search for existing products, and when you click on the title you will be redirected to the product page. Depending on the input entered the object containing all products will be filtered resulting in autocompletion.


## To run locally

1. `git clone https://github.com/raresnicolaide/the-library.git`

2. `npm install` 

3. `npm start`

