var initialChoiceEl = $("#initialChoice");
var diningInEl = $("#diningIn");
var eatingOutEl = $("#eatingOut");
var diningInChoiceEl = $("#diningInChoice");
var eatingOutChoiceEl = $("#eatingOutChoice");
var recipeRatingEl = $("#recipeRating");
var restaurantRatingEl = $("#restaurantRating");
var spoonAPIKey = '94a7e955bd8b4bbdbd0a552e1666b62b';
var yelpAPIKey = 'QK9VRlMeHsRVRkocggvEgEpTj0UlSioqD2c69TNDAE6LotIPGH46MU5hfG1vlQ_m-xJA25EEhJfkp1-hsnKjNtniB-ROWHnR_HpY3h1T-poiQKhq21pAcGKaJJyyYXYx'
var diningInInputEl = $('#diningInInput');
var diningInSearchEl = $('#diningInSearch');
var recipeResultsEl = $('#recipeResults');
var declineRecipeEl = $('#declineRecipe');
var acceptRecipeEl = $('#acceptRecipe');
var diningInMoodEl = $('#diningInMood');
var recipeRatingSubmitEl = $('#recipeRatingSubmit');


//Remove elements from view
diningInEl.remove();
eatingOutEl.remove();
restaurantRatingEl.remove();
recipeRatingEl.remove();
recipeRatingSubmitEl.remove();

function displayDiningInEl () {
    $("body").append(diningInEl);
    initialChoiceEl.remove();
};


function displayEatingOutEl () {
    $("body").append(eatingOutEl);
    initialChoiceEl.remove();
};

function searchRecipes (){
    var diningInInputVal = diningInInputEl.val().replace(' ',',');
    var spoonacularLink = 'https://api.spoonacular.com/recipes/complexSearch?apiKey='+spoonAPIKey+'&query='+diningInInputVal;
    fetch(spoonacularLink)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        recipeResultsEl.empty();
        var recipeInformationLink = 'https://api.spoonacular.com/recipes/'+data.results[[Math.floor(Math.random()*data.results.length)]].id+'/information?apiKey='+spoonAPIKey;
        fetch(recipeInformationLink)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            recipeResultsEl.append('<h1>'+data.title+'</h1>' +data.instructions)
            for (let index = 0; index < data.extendedIngredients.length; index++) {
                recipeResultsEl.append('<li>'+data.extendedIngredients[index].original+'</li>');   
            }
            var recipeTitle = data.title;
            var activeStars = $('.fas');
            console.log(activeStars);

            function submitRecipeRating(){
                // NEED TO FIX LOCAL STORAGE 
                console.log(activeStars)
                localStorage.setItem(recipeTitle,activeStars); 
            }
            recipeRatingSubmitEl.on('click', submitRecipeRating);
            
        })
        
    })
}

function showRecipeRating() {
    acceptRecipeEl.remove();
    declineRecipeEl.remove();
    diningInMoodEl.remove();
    diningInEl.append(recipeRatingEl);
    diningInEl.append(recipeRatingSubmitEl);
    
};

//Add event listeners to buttons
eatingOutChoiceEl.on("click", displayEatingOutEl);
diningInSearchEl.on('click', searchRecipes);
diningInChoiceEl.on("click", displayDiningInEl);
declineRecipeEl.on('click',searchRecipes);
acceptRecipeEl.on('click', showRecipeRating);