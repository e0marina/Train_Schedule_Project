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

firebase.initializeApp(firebaseConfig);

//======================================================================
//GLOBAL VARIABLES
//======================================================================
var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = ""; //time
var minsAway = "";
var firstTrainTime = "";
var dateAdded = "";

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
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

//======================================================================
//MAIN PROCESS + INITIAL CODE
//======================================================================
//tell database to listen for events
database.ref().on("value", function(snapshot) {
  console.log(snapshot.val());
  //if Firebase has anything stored, update our client-side variables
  if (
    snapshot.child("trainName").exists() &&
    snapshot.child("destination").exists() &&
    snapshot.child("frequency").exists() &&
    snapshot.child("nextArrival").exists() &&
    snapshot.child("minsAway").exists()
  ) {
    //Set the variables to stored values
    trainName = snapshot.val().trainName;
    destination = snapshot.val().destination;

    // console.log(trainName);
    // console.log(destination);
    // console.log(frequency);
    // console.log(nextArrival);
    // console.log(minsAway);
  }
});
