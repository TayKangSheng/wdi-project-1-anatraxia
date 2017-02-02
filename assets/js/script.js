function connectFour () {
  var gameboard = [0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0]
  var player = 1
  var gameStatus = 0
  var winCombo = [
  [0, 7, 14, 21, 28, 35],
  [1, 8, 15, 22, 29, 36],
  [2, 9, 16, 23, 30, 37],
  [3, 10, 17, 24, 31, 38],
  [4, 11, 18, 25, 32, 39],
  [5, 12, 19, 26, 33, 40],
  [6, 13, 20, 27, 34, 41],
  [0, 1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12, 13],
  [14, 15, 16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25, 26, 27],
  [28, 29, 30, 31, 32, 33, 34],
  [35, 36, 37, 38, 39, 40, 41],
  [5, 11, 17, 23, 29, 35],
  [4, 10, 16, 22, 28],
  [3, 9, 15, 21],
  [14, 22, 30, 38],
  [7, 15, 23, 31, 39],
  [0, 8, 16, 24, 32, 40],
  [20, 26, 32, 38],
  [1, 9, 17, 25, 33, 41],
  [2, 10, 18, 26, 34],
  [3, 11, 19, 27],
  [13, 19, 25, 31, 37],
  [6, 12, 18, 24, 30, 36]
  ]
  var gameColumn = [6, 6, 6, 6, 6, 6, 6]
  var gameBoardIndex = [[0, 7, 14, 21, 28, 35],
[1, 8, 15, 22, 29, 36],
[2, 9, 16, 23, 30, 37],
[3, 10, 17, 24, 31, 38],
[4, 11, 18, 25, 32, 39],
[5, 12, 19, 26, 33, 40],
[6, 13, 20, 27, 34, 41]]
  var tokenDropEffect = document.getElementById('tokenDropSnd')
  var gameOverEffect = document.getElementById('gameOverSnd')
  var clearBoardEffect = document.getElementById('clearBoardSnd')
// DOM objects
  var columnTop = document.querySelectorAll('.containerColumn > div')
  var gameCircle = document.querySelectorAll('.containerBoard > div')
  var jumbotronH1 = document.querySelectorAll('.jumbotronH1')[0]
  var resetButt = document.getElementsByClassName('btn btn-primary')[0]
// resetGame() -  to reset the variables in game.
  function resetGame () {
    gameboard = [0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0 ]
    player = 1
    gameStatus = 0
    gameColumn = [6, 6, 6, 6, 6, 6, 6]
    gameCircle.forEach(function (x) {
      x.className = 'item'
    })
  }
// anyWinMove
  function anyWinMove () {
  // check for gameboard if any win move
    if (gameboard.indexOf(0) === -1) {
      return 2
    }
    for (var i = 0; i < winCombo.length; i++) {
      var winCount = 0
      for (var j = 0; j < winCombo[i].length; j++) {
        var boardvalue = winCombo[i][j]
        if (gameboard[boardvalue] === player) {
          winCount += 1
          console.log(winCount)
        } else {
          winCount = 0
        }
        if (winCount === 4) {
          console.log(winCount)
          return 1
        }
      }
    }
    return 0
  }
// check player move is valid and update gameboard
  function moveValid (columnIndex) {
    if (gameColumn[columnIndex] > 0) {
    // reduce count in column index
      gameColumn[columnIndex] -= 1
    // add player to boardgame
      gameboard[gameBoardIndex[columnIndex][gameColumn[columnIndex]]] = player
      return true
    } else {
      return false
    }
  }
// gameOver
  function gameOver () {
    gameStatus = anyWinMove()
    if (gameStatus === 1 || gameStatus === 2) {
      return true
    } else {
      return false
    }
  }
// change player turn
  function playerTurn () {
    if (player === 1) {
      player = 2
      for (var i = 0; i < gameColumn.length; i++) {
        if (gameColumn[i] > 0) {
          columnTop[i].className = 'topColumn2'
        }
      }
    } else {
      player = 1
      for (var j = 0; j < gameColumn.length; j++) {
        if (gameColumn[j] > 0) {
          columnTop[j].className = 'topColumn'
        }
      }
    }
  }
  function updateGameBoardMove (movetoken) {
    if (player === 1) { gameCircle[movetoken].className = 'player1' } else { gameCircle[movetoken].className = 'player2' }
  }
  function checkColumnFull () {
    for (var i = 0; i < gameColumn.length; i++) {
      if (gameColumn[i] === 0) {
        columnTop[i].className = 'topColumnInvisible'
      }
    }
  }
  function playGameSound (soundFile) {
    soundFile.play()
  }

  function startGame () {
    resetButt.addEventListener('click', function () {
      playGameSound(clearBoardEffect)
      resetGame()
      jumbotronH1.textContent = 'Player ' + player + ' turn'
    })

    columnTop.forEach(function (box) {
      box.addEventListener('click', function (elm) {
    // get the column no. and check if column move is not full
        var columnSelected = $(this).data('num')
        if (gameColumn[columnSelected] > 0 && gameStatus === 0) {
          if (moveValid(columnSelected)) {
            var movetoken = gameBoardIndex[columnSelected][gameColumn[columnSelected]]
            playGameSound(tokenDropEffect)
            updateGameBoardMove(movetoken)
            if (gameOver()) {
              playGameSound(gameOverEffect)
              if (gameStatus === 1) {
                jumbotronH1.textContent = 'Player ' + player + ' win!'
              } else if (gameStatus === 2) {
                jumbotronH1.textContent = 'Game Draw'
              }
            } else {
              playerTurn()
              jumbotronH1.textContent = 'Player ' + player + ' turn'
              checkColumnFull()
            }
          }
        }
      })
    })
  }
  return {
    startGame: startGame
  }
}
document.addEventListener('DOMContentLoaded', function () {
  var connectGame = connectFour()
  connectGame.startGame()
})
