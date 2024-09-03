document.addEventListener("DOMContentLoaded", function () {
  // Handle form submission
  const nameForm = document.getElementById("name-form");
  if (nameForm) {
    nameForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission behavior

      let playerName = document.getElementById("player-name").value;
      localStorage.setItem("player-name", playerName);
      let playerImage = `https://source.boringavatars.com/beam/120/${playerName}`;
      localStorage.setItem("player-image", playerImage);

      // Retrieve player score from local storage
      let playerScore = localStorage.getItem("player-score");

      if (!playerScore) {
        playerScore = 0; // Set default score to 0 if it's not defined
      }

      // Retrieve existing player data or initialize an empty array
      let allPlayers = JSON.parse(localStorage.getItem("all-players")) || [];

      // Add the current player to the array
      allPlayers.push({ name: playerName, score: playerScore });

      // Store the updated array back to local storage
      localStorage.setItem("all-players", JSON.stringify(allPlayers));

      // Redirect to game page
      let gameURL = `game.html?player=${encodeURIComponent(playerName)}`;
      window.location.href = gameURL;
    });
  }

  // Add event listener to Score Board button
  const scoreboardButton = document.getElementById("scoreboard-button");
  if (scoreboardButton) {
    scoreboardButton.addEventListener("click", function () {
      window.location.href = "final-page.html"; // Redirect to final page
    });
  }

  // Fetch random image from Unsplash
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
});
