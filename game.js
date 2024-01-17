var level = 0;
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var keyboardPress = false;

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //1. In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound should be played.
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var userClickedPatternNo = userClickedPattern.length;
  if (level === userClickedPatternNo) {
    setTimeout(function(){
      gameLogic()
    }, 500);
    
  }else if (level < userClickedPatternNo) {
    level = 0;
    $("#level-title").text("Game over, Press A Key to Start");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    keyboardPress = false;
    userClickedPattern = [];
    gamePattern = [];
    $(document).keydown(function(event) {
      if (!keyboardPress) {
        setTimeout(function(){
          nextSequence()
        }, 500);
          keyboardPress = true;
        }
    });
  }else if (arraysItemsAreEqual(userClickedPattern, gamePattern) === false) {
    level = 0;
    $("#level-title").text("Game over, Press A Key to Start");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    keyboardPress = false;
    userClickedPattern = [];
    gamePattern = [];
    $(document).keydown(function(event) {
      if (!keyboardPress) {
        setTimeout(function(){
          nextSequence()
        }, 500);
          keyboardPress = true;
        }
    });
  }
});

function nextSequence() {
  level = level + 1;
  
  $("#level-title").text("Level " + level);
  
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //4. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
  
}

//2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  // Use setTimeout to remove the class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
$(document).keydown(function(event) {
  if (!keyboardPress) {
      nextSequence()
      keyboardPress = true;
    }
});

function gameLogic() {
  if (arraysAreEqual(userClickedPattern, gamePattern) === true) {
    setTimeout(function(){
      nextSequence()
    }, 500);
  userClickedPattern = []
  }else {
    level = 0;
    $("#level-title").text("Game over, Press A Key to Start");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    keyboardPress = false;
    userClickedPattern = [];
    gamePattern = [];
    $(document).keydown(function(event) {
      if (!keyboardPress) {
        setTimeout(function(){
          nextSequence()
        }, 500);
          keyboardPress = true;
        }
    });
  }
}

function arraysAreEqual(array1, array2) {
  // Check if the arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Compare each element in the arrays
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // If all elements are equal, the arrays are considered equal
  return true;
}

function arraysItemsAreEqual(array1, array2) {

  // Compare each element in the arrays
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // If all elements are equal, the arrays are considered equal
  return true;
}
  
