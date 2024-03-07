// Function to add a restaurant to the list
function addRestaurant() {
    var input = document.getElementById("restaurantInput").value;
    if (input.trim() === "") {
        alert("Please enter a restaurant name.");
        return;
    }
    var list = document.getElementById("restaurantList");
    var listItem = document.createElement("li");
    listItem.innerHTML = input + '<button onclick="removeRestaurant(this)">Remove</button>';
    list.appendChild(listItem);
    saveRestaurants();
    document.getElementById("restaurantInput").value = "";
}

// Function to remove a restaurant from the list
function removeRestaurant(item) {
    item.parentElement.remove();
    saveRestaurants();
}

// Function to save the list of restaurants to local storage
function saveRestaurants() {
    var restaurants = [];
    var listItems = document.querySelectorAll("#restaurantList li");
    listItems.forEach(function(item) {
        restaurants.push(item.textContent.trim());
    });
    localStorage.setItem("favoriteRestaurants", JSON.stringify(restaurants));
}

// Function to load the list of restaurants from local storage
function loadRestaurants() {
    var restaurants = JSON.parse(localStorage.getItem("favoriteRestaurants"));
    if (restaurants) {
        var list = document.getElementById("restaurantList");
        restaurants.forEach(function(restaurant) {
            var listItem = document.createElement("li");
            listItem.innerHTML = restaurant + '<button onclick="removeRestaurant(this)">Remove</button>';
            list.appendChild(listItem);
        });
    }
}
window.onload = loadRestaurants;