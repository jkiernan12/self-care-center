// Query selectors
var messageButton = document.querySelector(".message-selection--button");
var affirmationInput = document.querySelector("#affirmation-radio");
var mantraInput = document.querySelector("#mantra-radio");
var messageBox = document.querySelector(".quote");
var messageIcon = document.querySelector(".quote--icon");
var messageQuote = document.querySelector(".quote-text");
var favoriteContainer = document.querySelector(".quote-button-list");
var favoriteButton = document.querySelector("#favorite-button");
var backButton = document.querySelector("#view-main")
var viewFavoritesButton = document.querySelector("#view-favorites");
var inputSection = document.querySelector(".message-selection");
var favoritesSection = document.querySelector(".favorites");
var favoritesContainer = document.querySelector(".favorites-container");

//Event listeners
window.addEventListener("load", checkLocalStorage);
messageButton.addEventListener("click", displayQuote);
backButton.addEventListener("click", returnToMain);
viewFavoritesButton.addEventListener("click", showFavorites);
favoriteButton.addEventListener("click", addFavorites);
favoritesContainer.addEventListener("click", deleteFavorites)

var currentQuote = "";

var favoriteQuotes = [];

var mantras = [
  "Breathing in, I send myself love. Breathing out, I send love to someone else who needs it.",
  "Don’t let yesterday take up too much of today.",
  "Every day is a second chance.",
  "Tell the truth and love everyone.",
  "I am free from sadness.",
  "I am enough.",
  "In the beginning it is you, in the middle it is you and in the end it is you.",
  "I love myself.",
  "I am present now.",
  "Inhale the future, exhale the past.",
  "This too shall pass.",
  "Yesterday is not today.",
  "The only constant is change.",
  "Onward and upward.",
  "I am the sky, the rest is weather."
]

var affirmations = [
"I forgive myself and set myself free.",
"I believe I can be all that I want to be.",
"I am in the process of becoming the best version of myself.",
"I have the freedom & power to create the life I desire.",
"I choose to be kind to myself and love myself unconditionally.",
"My possibilities are endless.",
"I am worthy of my dreams.",
"I am enough.",
"I deserve to be healthy and feel good.",
"I am full of energy and vitality and my mind is calm and peaceful.",
"Every day I am getting healthier and stronger.",
"I honor my body by trusting the signals that it sends me.",
"I manifest perfect health by making smart choices."
]

function checkLocalStorage() {
  if (!localStorage.getItem("localFavoriteQuotes")) {
  } else {
    favoriteQuotes = JSON.parse(window.localStorage.getItem("localFavoriteQuotes"));
  }
}

function randomArray(array) {
  var currentIndex = Math.floor(Math.random() * array.length);
  return randArray = array[currentIndex];
}

function displayQuote() {
  var currentInput = checkInput();
  currentQuote = randomArray(currentInput);
  if (!messageIcon.classList.contains("hidden")) {
    messageIcon.classList.add("hidden");
    favoriteContainer.classList.remove("hidden");
    messageQuote.classList.remove("hidden");
  }

  messageQuote.innerText = currentQuote;

}

function checkInput() {
  if (affirmationInput.checked) {
    return affirmations
  } else if (mantraInput.checked) {
    return mantras
  }
}

function toggleVisibility(section) {
  section.classList.toggle("hidden");
}

function showFavorites() {
  toggleVisibility(messageBox);
  toggleVisibility(inputSection);
  toggleVisibility(favoritesSection);
  populateFavorites();
}

function populateFavorites() {
  for (var i = 0; i < favoriteQuotes.length; i++) {
    var savedQuoteHTML = `<article class="favorites-item">
    <p>${favoriteQuotes[i]}</p>
    <button type="button" data-index="${i}" class="favorite-delete">x</button>
    </article>`;
    favoritesContainer.innerHTML += savedQuoteHTML;
  }
}

function deleteFavorites(event) {
  var selectedItemIndex = parseInt(event.target.dataset.index, 10)
  console.log(selectedItemIndex);
  if (!isNaN(selectedItemIndex)) {
    favoriteQuotes.splice(selectedItemIndex, 1);
    refreshLocalStorage();
    favoritesContainer.innerHTML = "";
    populateFavorites();
  }
}

function returnToMain() {
  toggleVisibility(messageBox);
  toggleVisibility(inputSection);
  toggleVisibility(favoritesSection);
  favoritesContainer.innerHTML = "";
}

function addFavorites() {
  if (!favoriteQuotes.includes(currentQuote)) {
    favoriteQuotes.push(currentQuote);
    refreshLocalStorage();
  }
}

function refreshLocalStorage() {
  window.localStorage.setItem("localFavoriteQuotes", JSON.stringify(favoriteQuotes));
}
