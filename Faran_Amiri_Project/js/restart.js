document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the current player's name and score from local storage
  const currentPlayerName = localStorage.getItem("player-name") || "Guest";
  const currentPlayerScore =
    parseInt(localStorage.getItem("player-score")) || 0;
  const currentPlayerAvatar = localStorage.getItem("player-image");

  // Display the current player's name and score in the "Player Info" section
  document.getElementById(
    "player-name"
  ).textContent = `Player Name: ${currentPlayerName}`;
  document.getElementById(
    "player-score"
  ).textContent = `Player Score: ${currentPlayerScore}`;

  if (currentPlayerAvatar) {
    const playerAvatarImg = document.createElement("img");
    playerAvatarImg.src = currentPlayerAvatar;
    playerAvatarImg.alt = `${currentPlayerName}'s Avatar`;
    playerAvatarImg.style.width = "50px"; // Adjust the width of the avatar image
    playerAvatarImg.style.height = "50px"; // Adjust the height of the avatar image
    playerAvatarImg.style.display = "block"; // Set display to block to center the image
    playerAvatarImg.style.margin = "0 auto"; // Center the image horizontally

    document.getElementById("player-name").appendChild(playerAvatarImg);
  }

  // Retrieve all player data from local storage
  let allPlayers = JSON.parse(localStorage.getItem("all-players")) || [];

  // Create a map to store the highest score of each player
  let highestScoresMap =
    JSON.parse(localStorage.getItem("highest-scores")) || {};

  // Update the current player's score if it is higher than the previous highest score
  if (currentPlayerScore > (highestScoresMap[currentPlayerName] || 0)) {
    highestScoresMap[currentPlayerName] = currentPlayerScore;
  }

  // Update the local storage with the updated highest scores map
  localStorage.setItem("highest-scores", JSON.stringify(highestScoresMap));

  // Select the list element for last scores
  const lastScoresList = document.getElementById("all-scores-list");

  // Clear the existing list items to avoid duplicates
  lastScoresList.innerHTML = "";

  // Iterate through each player in the highest scores map and create list items to display their highest scores
  for (const playerName in highestScoresMap) {
    if (Object.hasOwnProperty.call(highestScoresMap, playerName)) {
      const playerScore = highestScoresMap[playerName];
      const listItem = document.createElement("li");
      listItem.textContent = `${playerName}: ${playerScore}`;
      lastScoresList.appendChild(listItem);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const newGameButton = document.getElementById("restart");
  if (newGameButton) {
    newGameButton.addEventListener("click", function () {
      window.location.href = "first-page.html";
    });
  }
});

const unsplashAccessKey = "DHVt8ERWljKkqKx1nMsjaAJ_pwzvvgAkOIs0B97WuL0";

fetch(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`)
  .then((response) => response.json())
  .then((data) => {
    const imageUrl = data.urls.regular;

    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundPosition = "center";
  })
  .catch((error) => console.error("Error fetching random image:", error));
