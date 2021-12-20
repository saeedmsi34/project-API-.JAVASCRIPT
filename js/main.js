//nav------------------
var currentIndex = 0;
var links = document.getElementsByClassName('nav-link')
for (i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        currentIndex = e.target.text
        getRecipts(currentIndex);
    })
}

//api------------------
var details = [];
getRecipts("pizza")
async function getRecipts(meal) {
    var response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`)
    var recipesData = await response.json();
    details = recipesData.recipes
    // console.log(details)
    displayRecipes()

}

function displayRecipes() {
    cols = ''
    for (i = 0; i < details.length; i++) {
        cols +=
            `
        <div class="col-md-3">
             <div class="recipe ">
             <img src="${details[i].image_url}"class="imgs w-100 pt-4" alt="">
             <h6>${details[i].title}</h6>
             <a target=";'_blank" href="${details[i].source_url}" class="btn btn-info ">source</a>
             <a onclick="getSingleData(${details[i].recipe_id})" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-warning">details</a>
              </div>
        </div>
        `
    }
    document.getElementById("reciptsRow").innerHTML = cols;
}



// button details---------

var recipes;
async function getSingleData(recipeId) {
    var response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`)
        recipes = await response.json()
    displaySingleRecipe()
}

 function displaySingleRecipe() {
    var recipeDetails = recipes.recipe;

    var recipeDetailsData =
    `
     <img src="${recipeDetails.image_url}" class="imgs w-100">
          <h2>${recipeDetails.title}</h2>
         <p>${recipeDetails.ingredients}</p>
    `;
 document.getElementById("data").innerHTML=recipeDetailsData;
}









