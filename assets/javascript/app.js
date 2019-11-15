// Calling to the firebase database
var firebaseConfig = {
    apiKey: "AIzaSyCX_zw7DR_sY8c_aubbdzOcJu5xrqpv03Y",
    authDomain: "week7-day2-60bed.firebaseapp.com",
    databaseURL: "https://week7-day2-60bed.firebaseio.com",
    projectId: "week7-day2-60bed",
    storageBucket: "week7-day2-60bed.appspot.com",
    messagingSenderId: "515688817368",
    appId: "1:515688817368:web:d97f0a79d69b64155c2dad"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var database = firebase.database();

// Variable Declaration
var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = 0;
var minutesAway = 0;
var firstTrain = "";

// Event for collecting info
$("#submit-btn").on("click", function() {
    event.preventDefault();

    // Info from from is stored in variables
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(trainName, destination, firstTrain, frequency);
    
    // Info from form is sent to firebase database
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
    //Clears form
    document.getElementById("trainForm").reset();
})

database.ref().on("child_added", function(childSnapshot) {
    // Stored into a variable for firebase
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    
    // Moment.js used for time formatting
    var timeFormat = "HH:mm";
    var trainFormat = moment(firstTrain, timeFormat).subtract(1, "years");
    
    // Using moment.js to calculate time differences for our output
    timeDif = moment().diff(trainFormat, "minutes");
    timeRemain = timeDif % frequency;
    minutesAway = frequency - timeRemain;
    nextArrival = moment().add(minutesAway, "minutes").format("hh:mm A")
   
    //Creating rows dynamically and appending them to the table 
    var newRow = $("<tr>");
    newRow.append("<td>" + trainName + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>" + "<td>" + nextArrival + "</td>" + "<td>" + minutesAway + "</td>");
    $(".table").append(newRow);

   
});
