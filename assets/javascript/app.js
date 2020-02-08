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
var frequency = 0;
var nextArrival = 0; //time
var minsAway = 0;

//======================================================================
//FUNCTIONS
//======================================================================
//click listener for submit
$("#submitButton").on("click", function(event) {
  //prevent page from refresh
  event.preventDefault();

  //Get inputs
  nameoftrain = $("#trainName-input")
    .val()
    .trim();
  destinationoftrain = $("#destination-input")
    .val()
    .trim();
  firsttraintime = $("#1stTrainTime-input")
    .val()
    .trim();
  frequencyoftrain = $("#frequency-input")
    .val()
    .trim();

  //change what is saved to firebase
  database.ref().set({
    nameoftrain: nameoftrain,
    destinationoftrain: destinationoftrain,
    firsttraintime: firsttraintime,
    frequencyoftrain: frequencyoftrain
  });
});

//======================================================================
//MAIN PROCESS + INITIAL CODE
//======================================================================
//tell database to listen for events
database.ref().on("value", function(snapshot) {
  console.log(snapshot.val());
});
