**Feature**: As a player, I want to be able to put my symbol, so that i can play the game

**Scenario 1**
Given a player clicks on a box on the board, when the box is empty, then the player symbol appears on the board and the game checks if the player won the game

**Scenario 2**
Given a player clicks on a box on the board, when the box is full, then nothing happens

---

Store the moves of the player and check if the player won

Need factory to create player with symbol and turn:

- play turn
- pass turn

Need display controller module to:

- display plays on the board

Need board module to:

- check if a player won after the turn has ended and provide message for result to the players
- reset the board after game

---

Problem: how to check when player has won? Populate an array of the players moves (x and o). define the win condition array
win condition = [0,1,2], [3,4,5], [6,7,8], [0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
