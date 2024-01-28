// let initialChoiceEl = document.querySelector("#initialChoice");
// let diningInEl = document.querySelector("#diningIn");
// let eatingOutEl = document.querySelector("#eatingOut");
// let diningInChoiceEl = document.querySelector("#diningInChoice");
// let eatingOutChoiceEl = document.querySelector("#eatingOutChoice");
// let recipeRatingEl = document.querySelector("#recipeRating");
// let restaurantRatingEl = document.querySelector("#restaurantRating");
// let diningInInputEl = document.querySelector('#diningInInput');
// let diningInSearchEl = document.querySelector('#diningInSearch');
// let recipeResultsEl = document.querySelector('#recipeResults');
// let declineRecipeEl = document.querySelector('#declineRecipe');
// let acceptRecipeEl = document.querySelector('#acceptRecipe');
// let diningInMoodEl = document.querySelector('#diningInMood');
// let eatingOutInputEl = document.querySelector('#eatingOutInput');
// let eatingOutZipCodeEl = document.querySelector('#zipCode');
// let eatingOutSearchEl = document.querySelector('#eatingOutSearch');
// let declineRestaurantEl = document.querySelector('#declineRestaurant');
// let acceptRestaurantEl= document.querySelector('#acceptRestaurant');
// let restaurantResultsEl = document.querySelector('#restaurantResults');
// let eatingOutMoodEl = document.querySelector('#eatingOutMood');
// let acceptDeclineRecipeEl = document.querySelector('#acceptDeclineRecipe');
// let acceptDeclineRestaurantEl= document.querySelector('#acceptDeclineRestaurant');
// let recipeStarsEl = document.querySelector('#recipeStars');
// let restaurantStarsEl = document.querySelector('#restaurantStars');
require('dotenv').config()
const spoonAPIKey = process.env.SPOON_API_KEY
const yelpAPIKey = process.env.YELP_API_KEY
const axios = require('axios')
// //Remove elements from view
// diningInEl.remove();
// eatingOutEl.remove();
// restaurantRatingEl.remove();
// recipeRatingEl.remove();

// function displayDiningInEl () {
//     document.body.append(diningInEl);
//     acceptDeclineRecipeEl.remove();
//     initialChoiceEl.remove();
// };


// function displayEatingOutEl () {
//     document.body.append(eatingOutEl);
//     acceptDeclineRestaurantEl.remove();
//     initialChoiceEl.remove();
// };

async function searchRecipes (){
    // Prepares the users input to be used as a parameter for spoonacular API
   // let diningInInputVal = diningInInputEl.val().replace(' ',',');
    const diningInInputVal = 'vietnamese'
    let spoonacularLink = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='+spoonAPIKey+'&query='+diningInInputVal;
    try {
        const {status: recipeListStatus, data: recipeListData} = await axios.get(spoonacularLink)
        if(recipeListStatus !== 200) {
            throw new Error({status: recipeListStatus, message: 'Error: Non 200 response code from the recipe list API call'})
        }
        let recipeInformationLink = 'https://api.spoonacular.com/recipes/'+recipeListData.results[[Math.floor(Math.random()*recipeListData.results.length)]].id+'/information?apiKey='+spoonAPIKey;
        const { status: recipeInformationStatus, data: recipeInformationData } = await axios.get(recipeInformationLink)
        if(recipeInformationStatus !== 200) {
            throw new Error({status: recipeListStatus, message: 'Error: Non 200 response code from the recipe list API call'})
        }
        console.log(recipeInformationData)
    } catch (error) {
        console.log(error)
    }
    

    // fetch(spoonacularLink)
    // .then(function(response){
    //     return response.json();
    // })
    // .then(function(data){
    //     recipeResultsEl.empty();
    //     // Returns a random recipe based off users input "mood"
    //     let recipeInformationLink = 'https://api.spoonacular.com/recipes/'+data.results[[Math.floor(Math.random()*data.results.length)]].id+'/information?apiKey='+spoonAPIKey;
    //     fetch(recipeInformationLink)
    //     .then(function(response){
    //         return response.json();
    //     })
    //     .then(function(data){
    //         console.log(data);
    //         // Returns ingredients and instructions  for random recipe 
    //         recipeResultsEl.append('<h1>'+data.title+'</h1>')
    //         for (let index = 0; index < data.extendedIngredients.length; index++) {
    //             recipeResultsEl.append('<li>'+data.extendedIngredients[index].original+'</li>');   
    //         }
    //         recipeResultsEl.append('<p>'+data.instructions+'</p>')
    //         let recipeTitle = data.title;

    //         // Saving recipe rating to local storage 
    //         recipeStarsEl.children().on("click", checkStars)
    //             function checkStars(event) {
    //                 let starValue = event.target.id.split("-")[1];
    //                 localStorage.setItem('<b>Recipe: </b>'+recipeTitle,starValue); 

    //                 console.log(starValue);
    //         }
            
    //     })
    //     .then( function(){
    //     recipeResultsEl.append(acceptDeclineRecipeEl); 
    //     declineRecipeEl.on('click',searchRecipes);
    //     acceptRecipeEl.on('click', showRecipeRating);   
    //     })
        
        
    // })
    
}

// function showRecipeRating() {
//     acceptRecipeEl.remove();
//     declineRecipeEl.remove();
//     diningInMoodEl.remove();
//     diningInEl.append(recipeRatingEl);
    
// };

// function searchRestaurants() {
//     restaurantResultsEl.empty();
//     let zipCodeVal = eatingOutZipCodeEl.val();
//     let eatingOutInputVal = eatingOutInputEl.val().replace(' ',',');

//     let yelpLink = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location='+zipCodeVal+'&term='+eatingOutInputVal;

//     fetch(yelpLink, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${yelpAPIKey}`,
//             'Content-Type': 'application/json'
//         },
//         })

//         .then(function(response) {
//             return response.json()
//         })
//         .then(function(data) {
//             console.log(data);
//             let randomRestaurant = data.businesses[[Math.floor(Math.random()*data.businesses.length)]]
//             console.log(randomRestaurant);
//             restaurantResultsEl.append(randomRestaurant.name+"<br>");
            
//             for (let index = 0; index < randomRestaurant.location.display_address.length; index++) {
//                 restaurantResultsEl.append(randomRestaurant.location.display_address[index]+"<br>")  
//             }
//             let restaurantTitle = randomRestaurant.name;
//             restaurantStarsEl.children().on("click", checkStars)
//                 function checkStars(event) {
//                     let starValue = event.target.id.split("-")[1];
//                     localStorage.setItem('<b>Restaurant: </b>'+restaurantTitle,starValue); 

//                     console.log(starValue);
//             };
//         })
//         .then(function(){
//             eatingOutSearchEl.remove();
//             restaurantResultsEl.append(acceptDeclineRestaurantEl); 
//             declineRestaurantEl.on('click',searchRestaurants);
//             acceptRestaurantEl.on('click', showRestaurantRating);
//         })
// }

// function showRestaurantRating() {
//     eatingOutEl.append(restaurantRatingEl);
//     acceptRestaurantEl.remove();
//     declineRestaurantEl.remove();
//     eatingOutMoodEl.remove();
// }

// //Add event listeners to buttons
// eatingOutChoiceEl.on('click', displayEatingOutEl);
// diningInSearchEl.on('click', searchRecipes);
// diningInChoiceEl.on('click', displayDiningInEl);
// //declineRecipeEl.on('click',searchRecipes);
// //acceptRecipeEl.on('click', showRecipeRating);
// eatingOutSearchEl.on('click', searchRestaurants);
//declineRestaurantEl.on('click', searchRestaurants);
//acceptRestaurantEl.on('click', showRestaurantRating);
searchRecipes()