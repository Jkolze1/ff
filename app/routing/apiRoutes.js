var userData = require("../data/friends");


module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(userData);
  });

  var comparisonUserTotalScore = 0;

  var friendScores = [];


  // API POST Requests
  app.post("/api/friends", function(req, res) {

    // Stores scores
    var currentUserScores = req.body.scores;

    console.log("Current user scores: " + currentUserScores);

    // Determine the user's most compatible friend.
    for (var i = 0; i < userData.length; i++) {

      // Convert each user's results in to an array of numbers.
      var comparisonUserScores = userData[i].scores;

      // Find total difference between current user and each user.
      comparisonUserTotalScore = calculateUserCompatibilityScore(currentUserScores, comparisonUserScores);

      // Build up array of user compatibility scores.
      friendScores.push(comparisonUserTotalScore);

    }

    console.log("Array of friend scores: " + friendScores);

    var index = 0;
    var value = friendScores[0];
    for (var i = 0; i < friendScores.length; i++) {
      console.log("Value of item in array: " + friendScores[i]);
      if (friendScores[i] < value) {
        value = friendScores[i];
        index = i;
      }
    }
// Console log
    console.log("Best friend name: " + userData[index].name);


    res.send(userData[index]);

    // Push new user to user array.
    userData.push(req.body);

  });
};

var totalDifference = 0;

// Total diffrence
function calculateUserCompatibilityScore(currentUserScores, comparisonUserScores) {

  // Reset the total difference counter each time function called.
  totalDifference = 0;

  for (var i = 0; i < currentUserScores.length; i++) {

    totalDifference+=Math.abs(currentUserScores[i] - comparisonUserScores[i]);
  }

  console.log("Final total difference for friend: " + totalDifference);

  return totalDifference;
};
