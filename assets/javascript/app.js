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

var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = 0;
var minutesAway = 0;
var firstTrain = "";


$("#submit-btn").on("click", function() {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val().trim();

    console.log(trainName, destination, firstTrain, frequency);
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

})

database.ref().on("child_added", function(childSnapshot) {

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;
    
    
    var timeFormat = "HH:mm";
    var trainFormat = moment(firstTrain, timeFormat);
    timeDif = moment().diff(trainFormat, "minutes");
    timeRemain = timeDif % frequency;
    minutesAway = frequency - timeRemain;
    nextArrival = moment().add(minutesAway, "minutes").format("HH:mm")
   
    

    var newRow = $("<tr>");
    newRow.append("<td>" + trainName + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>" + "<td>" + nextArrival + "</td>" + "<td>" + minutesAway + "</td>");
    $(".table").append(newRow);

   
});
