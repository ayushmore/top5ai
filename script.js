let currentBoard = 1;

document.getElementById("goButton").addEventListener("click", function() {
  const topic = document.getElementById("draftTopicInput").value;
  document.getElementById("draftTitle").textContent = topic ? topic : "Draft Topic";
  document.getElementById("homepage").style.display = "none";
  document.getElementById("draftPage").style.display = "block";
});

document.getElementById("submitItem").addEventListener("click", function() {
  const board = document.getElementById(`board${currentBoard}`);
  if (board.getElementsByClassName("draftEntry").length < 5) {
    const itemValue = document.getElementById("playerInput").value;
    if (itemValue.trim() !== "") {
      const item = document.createElement("div");
      item.textContent = itemValue;
      item.className = "draftEntry";
      board.appendChild(item);
      currentBoard = currentBoard === 1 ? 2 : 1;
      document.getElementById("playerInput").value = "";
    }
  }
  checkForVoting();
});

function checkForVoting() {
  const board1Entries = document.getElementById("board1").getElementsByClassName("draftEntry").length;
  const board2Entries = document.getElementById("board2").getElementsByClassName("draftEntry").length;
  if (board1Entries >= 5 && board2Entries >= 5) {
    document.getElementById("playerInput").style.display = "none";
    document.getElementById("submitItem").style.display = "none";
    document.getElementById("votingSection").style.display = "block";
  }
}

document.getElementById("votePlayer1").addEventListener("click", function() {
  showWinner(1);
});

document.getElementById("votePlayer2").addEventListener("click", function() {
  showWinner(2);
});

function showWinner(playerNumber) {
  document.getElementById("votingSection").style.display = "none";
  document.getElementById("winnerSection").style.display = "block";
  document.getElementById("winnerAnnouncement").textContent = `Player ${playerNumber} Wins!`;

  const confettiSettings = { target: 'confettiCanvas' };
  const confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}

document.getElementById("playAgain").addEventListener("click", function() {
  location.reload();
});
