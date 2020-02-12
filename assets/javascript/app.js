//Questions:
//do I need to sort by DateAdded to account for multi users?

//Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCNYhZY7DWHF7pxQQJlAuEKOfOCbv55EuU",
  authDomain: "emily-s-class-project.firebaseapp.com",
  databaseURL: "https://emily-s-class-project.firebaseio.com",
  projectId: "emily-s-class-project",
  storageBucket: "emily-s-class-project.appspot.com",
  messagingSenderId: "127915851584",
  appId: "1:127915851584:web:32358ea6802aa9446104a5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a variable to reference the database.
var database = firebase.database();

//======================================================================
//GLOBAL VARIABLES
//======================================================================

//initial values
var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minsAway = "";
var firstTrainTime = "";

//======================================================================
//FUNCTIONS
//======================================================================
//click listener for submit
$("#submitButton").on("click", function(event) {
  console.log("submitButton working");

  //prevent page from refresh
  event.preventDefault();

  //Get inputs
  trainName = $("#trainName-input")
    .val()
    .trim();
  destination = $("#destination-input")
    .val()
    .trim();
  firstTrainTime = $("#1stTrainTime-input")
    .val()
    .trim();
  frequency = $("#frequency-input")
    .val()
    .trim();

  //change what is saved to firebase using push
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  //logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(firstTrainTime);

  //clears the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#1stTrainTime-input").val("");
  $("#frequency-input").val("");
});

//======================================================================
//MAIN PROCESS + INITIAL CODE
//======================================================================
//Firebase watcher + initial loader/ adding train info to database and a row to html when user adds entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  //store everything into a variable
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;
  // var dateAdded = childSnapshot.val().dateAdded;

  // console.logging the last user's data
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);
  // console.log(dateAdded);

  //Do some math to figure out Next arrival from frequency and first train time inputs

  //First Train Time (push back 1 year to make sure it comes before current time)
  var firstTrainTimeConverted = moment(firstTrainTime, "HH:mm").subtract(
    1,
    "years"
  );

  console.log(firstTrainTimeConverted);

  //Current Time
  var currentTime = moment();
  console.log("current time:" + moment(currentTime).format("hh:mm"));

  //Difference between the times
  var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
  console.log("difference in time: " + diffTime);

  //Time apart (remainder)
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  //Minutes Until Train
  var minsAway = frequency - tRemainder;
  console.log("minutes until train:" + minsAway);

  //Next Train

  var nextArrivalRaw = moment().add(minsAway, "minutes");
  var nextArrival = moment(nextArrivalRaw).format("hh:mm a");
  console.log("arrival time:" + moment(nextArrival).format("hh:mm"));

  //create new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minsAway)
  );
  //Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
