document
  .getElementById("name-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let playerName = document.getElementById("player-name").value;
    localStorage.setItem("playerName", playerName);
    window.location.href = "index.html";
  });
