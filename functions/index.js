const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


// Initialize Cloud Firestore through Firebase
var db = admin.firestore();


exports.getStudents = functions.https.onRequest((request, response) => {
    // var dataOfKey = request[0].text;
    // var dataOfValue = request[1].text;


    // Checks if request data is valid
    // if (!(typeof dataOfKey === "string" && typeof dataOfValue === "string") || dataOfKey.length === 0 || dataOfValue.length === 0) {
    //     throw new functions.https.HttpsError("invalid-argument", "The function must be called with " +
    //         "two arguments 'key' and 'value' which must both be Strings and non-empty.");
    // }

    // Queries Cloud Firestore for requested student(s)
    var students = [];
    var unsub = db.collection("students").where("id", "==", "123456789")
        .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
                students.push(doc.data());
            });
            console.log("Students Found in Query: ", students);
            response.send(students);
        }); // [unsub declared]

    // Unsubscribe after 3 seconds
    setTimeout(() => {
        unsub();
    }, 3000);

    
    return;
});




// TO TEST:
// firebase serve --only functions
