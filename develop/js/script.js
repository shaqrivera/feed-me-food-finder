var initialChoiceEl = $("#initialChoice");
var diningInEl = $("#diningIn");
var eatingOutEl = $("#eatingOut");
var diningInChoiceEl = $("#diningInChoice");
var eatingOutChoiceEl = $("#eatingOutChoice");
var recipeRatingEl = $("#recipeRating");
var restaurantRatingEl = $("#restaurantRating");
var spoonAPIKey = '2a32ed3305214e199c763a474e6dd932';
var yelpAPIKey = 'QK9VRlMeHsRVRkocggvEgEpTj0UlSioqD2c69TNDAE6LotIPGH46MU5hfG1vlQ_m-xJA25EEhJfkp1-hsnKjNtniB-ROWHnR_HpY3h1T-poiQKhq21pAcGKaJJyyYXYx'
var diningInInputEl = $('#diningInInput');
var diningInSearchEl = $('#diningInSearch');
var recipeResultsEl = $('#recipeResults');
var declineRecipeEl = $('#declineRecipe');
var acceptRecipeEl = $('#acceptRecipe');
var diningInMoodEl = $('#diningInMood');
var eatingOutInputEl = $('#eatingOutInput');
var eatingOutZipCodeEl = $('#zipCode');
var eatingOutSearchEl = $('#eatingOutSearch');
var declineRestaurantEl = $('#declineRestaurant');
var acceptRestaurantEl= $('#acceptRestaurant');
var restaurantResultsEl = $('#restaurantResults');
var eatingOutMoodEl = $('#eatingOutMood')

//Remove elements from view
diningInEl.remove();
eatingOutEl.remove();
restaurantRatingEl.remove();
recipeRatingEl.remove();

function displayDiningInEl () {
    $("body").append(diningInEl);
    initialChoiceEl.remove();
};


function displayEatingOutEl () {
    $("body").append(eatingOutEl);
    initialChoiceEl.remove();
};

function searchRecipes (){
    // Prepares the users input to be used as a parameter for spoonacular API
    var diningInInputVal = diningInInputEl.val().replace(' ',',');
    var spoonacularLink = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='+spoonAPIKey+'&query='+diningInInputVal;
    fetch(spoonacularLink)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        recipeResultsEl.empty();
        // Returns a random recipe based off users input "mood"
        var recipeInformationLink = 'https://api.spoonacular.com/recipes/'+data.results[[Math.floor(Math.random()*data.results.length)]].id+'/information?apiKey='+spoonAPIKey;
        fetch(recipeInformationLink)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // Returns ingredients and instructions  for random recipe 
            recipeResultsEl.append('<h1>'+data.title+'</h1>' +data.instructions)
            for (let index = 0; index < data.extendedIngredients.length; index++) {
                recipeResultsEl.append('<li>'+data.extendedIngredients[index].original+'</li>');   
            }
            var recipeTitle = data.title;

            // Saving recipe rating to local storage 
            recipeRatingEl.on("click", checkStars)
                function checkStars(event) {
                    var starValue = event.target.id.split("-")[1];
                    localStorage.setItem('Recipe: '+recipeTitle,starValue); 

                    console.log(starValue);
            }
            
        })
        
    })
}

function showRecipeRating() {
    acceptRecipeEl.remove();
    declineRecipeEl.remove();
    diningInMoodEl.remove();
    diningInEl.append(recipeRatingEl);
    
};

function searchRestaurants() {
    restaurantResultsEl.empty();
    var zipCodeVal = eatingOutZipCodeEl.val();
    var eatingOutInputVal = eatingOutInputEl.val().replace(' ',',');

    var yelpLink = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location='+zipCodeVal+'&term='+eatingOutInputVal;

    fetch(yelpLink, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${yelpAPIKey}`,
            'Content-Type': 'application/json'
        },
        })

        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data);
            var randomRestaurant = data.businesses[[Math.floor(Math.random()*data.businesses.length)]]
            console.log(randomRestaurant);
            restaurantResultsEl.append(randomRestaurant.name);
            
            for (let index = 0; index < randomRestaurant.location.display_address.length; index++) {
                restaurantResultsEl.append(randomRestaurant.location.display_address[index])  
            }
            var restaurantTitle = randomRestaurant.name;
            restaurantRatingEl.on("click", checkStars)
                function checkStars(event) {
                    var starValue = event.target.id.split("-")[1];
                    localStorage.setItem('Restaurant: '+restaurantTitle,starValue); 

                    console.log(starValue);
            };
        })
}

function showRestaurantRating() {
    eatingOutEl.append(restaurantRatingEl);
    acceptRestaurantEl.remove();
    declineRestaurantEl.remove();
    eatingOutMoodEl.remove();
}

//Add event listeners to buttons
eatingOutChoiceEl.on('click', displayEatingOutEl);
diningInSearchEl.on('click', searchRecipes);
diningInChoiceEl.on('click', displayDiningInEl);
declineRecipeEl.on('click',searchRecipes);
acceptRecipeEl.on('click', showRecipeRating);
eatingOutSearchEl.on('click', searchRestaurants);
declineRestaurantEl.on('click', searchRestaurants);
acceptRestaurantEl.on('click', showRestaurantRating);