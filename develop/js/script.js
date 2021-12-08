var initialChoiceEl = $("#initialChoice");
var diningInEl = $("#diningIn");
var eatingOutEl = $("#eatingOut");
var diningInChoiceEl = $("#diningInChoice");
var eatingOutChoiceEl = $("#eatingOutChoice");
var recipeRatingEl = $("#recipeRating");
var restaurantRatingEl = $("#restaurantRating");

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

//Add event listeners to buttons
diningInChoiceEl.on("click", displayDiningInEl);
eatingOutChoiceEl.on("click", displayEatingOutEl);