//TO Do:
//fix html and js to reflect using a table

//figure out formulas for moment to convert time + console log those
//make sure all items are being added to the table data (use timesheet activity)

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
var nextArrival = ""; //time
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
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
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
  var dateAdded = childSnapshot.val().dateAdded;

  // console.logging the last user's data
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);
  console.log(dateAdded);

  //create new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(firstTrainTime),
    $("<td>").text(frequency)
  );
  //Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
