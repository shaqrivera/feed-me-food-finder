var initialChoiceEl = $("#initialChoice");
var diningInEl = $("#diningIn");
var eatingOutEl = $("#eatingOut");
var diningInChoiceEl = $("#diningInChoice");
var eatingOutChoiceEl = $("#eatingOutChoice");
var recipeRatingEl = $("#recipeRating");
var restaurantRatingEl = $("#restaurantRating");
var APIKey = '94a7e955bd8b4bbdbd0a552e1666b62b';
var diningInInputEl = $('#diningInInput');
var diningInInputVal = diningInInputEl.val().replace(' ',',');
var spoonacularLink = 'https://api.spoonacular.com/recipes/random?number=1&apiKey='+APIKey+'&titleMatch='+diningInInputVal;
var diningInSearchEl = $('#diningInSearch');

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
    fetch(spoonacularLink)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}

//Add event listeners to buttons
diningInChoiceEl.on("click", displayDiningInEl);
eatingOutChoiceEl.on("click", displayEatingOutEl);
diningInSearchEl.on('click', searchRecipes)