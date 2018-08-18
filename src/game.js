module.exports = function Game() {
  // change var to let or const
  // instead of new Array, use [];
  const players = [];
  const places = [6];
  const purses = [6];
  const inPenaltyBox = [6];

  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  let currentPlayer = 0;
  // instead of array of values, there's only one value here. mismatch.
  // code busuk... mentally record smth is wrong
  let isGettingOutOfPenaltyBox = false;

  let didPlayerWin = function() {
    return !(purses[currentPlayer] == 6);
  };

  var currentCategory = function() {
    switch (places[currentPlayer]) {
      case 0:
      case 4:
      case 8:
        return "Pop";
      case 1:
      case 5:
      case 9:
        return "Science";
      case 2:
      case 6:
      case 10:
        return "Sports";
      default:
        return "Rock";
    }
  };

  //removed this.createRockQuestions func

  for (var i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    // inconsistency - four qns; three created the same way, one created differently
    rockQuestions.push("Rock Question " + i);
  }

  // removed this.isPlayable func as it is not being used

  // removed this.HowManyPlayers since u can use players.length instead
  this.add = function(playerName) {
    players.push(playerName);
    places[players.length - 1] = 0;
    purses[players.length - 1] = 0;
    inPenaltyBox[players.length - 1] = false;

    // one possible refactoring is to convert all log to be able to change the destination in one shot
    log(playerName + " was added");
    log("They are player number " + players.length);

    return true;
  };

  var askQuestion = function() {
    /* there are 50 qns, what if .shift() happen 51 times
      refactoring does not bother with changing the behaviour, after refactoring u can remove the bug
    */
    switch (currentCategory()) {
      case "Pop":
        log(popQuestions.shift());
        break;
      case "Science":
        log(scienceQuestions.shift());
        break;
      case "Sports":
        log(sportsQuestions.shift());
        break;
      case "Rock":
        log(rockQuestions.shift());
        break;
    }
  };

  this.roll = function(roll) {
    log(players[currentPlayer] + " is the current player");
    log("They have rolled a " + roll);

    // there are some duplicate codes....
    if (inPenaltyBox[currentPlayer]) {
      if (roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        log(
          players[currentPlayer] + " is getting out of the penalty box"
        );
        places[currentPlayer] = places[currentPlayer] + roll;
        if (places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        log(
          players[currentPlayer] + "'s new location is " + places[currentPlayer]
        );
        log("The category is " + currentCategory());
        askQuestion();
      } else {
        log(
          players[currentPlayer] + " is not getting out of the penalty box"
        );
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      places[currentPlayer] = places[currentPlayer] + roll;
      if (places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      log(
        players[currentPlayer] + "'s new location is " + places[currentPlayer]
      );
      log("The category is " + currentCategory());
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function() {
    if (inPenaltyBox[currentPlayer]) {
      if (isGettingOutOfPenaltyBox) {
        log("Answer was correct!!!!");
        purses[currentPlayer] += 1;
        log(
          players[currentPlayer] +
            " now has " +
            purses[currentPlayer] +
            " Gold Coins."
        );

        var winner = didPlayerWin();
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;

        return winner;
      } else {
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;
        return true;
      }
    } else {
      log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      log(
        players[currentPlayer] +
          " now has " +
          purses[currentPlayer] +
          " Gold Coins."
      );

      var winner = didPlayerWin();

      currentPlayer += 1;
      if (currentPlayer == players.length) currentPlayer = 0;

      return winner;
    }
  };

  this.wrongAnswer = function() {
    log("Question was incorrectly answered");
    log(players[currentPlayer] + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;

    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;
    return true;
  };
};

function log(message) {
  // eslint-disable-next-line no-console
  console.log(message);
}
