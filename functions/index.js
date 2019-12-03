const functions = require("firebase-functions");
// const sanitizer = require("./sanitizer");
const admin = require("firebase-admin");
admin.initializeApp();


// Initialize Cloud Firestore through Firebase
var db = admin.firestore();


exports.getStudents = functions.https.onRequest((request, response) => {
    var key = "id";        //request[0].text;
    var value = "157151182";      //request[1].text;


    // // Checks if request data is valid
    // if (!(typeof key === "string" && typeof value === "string") || key.length === 0 || value.length === 0) {
    //     throw new functions.https.HttpsError("invalid-argument", "The function must be called with " +
    //         "two arguments 'key' and 'value' which must both be Strings and non-empty.");
    // }

    // Queries Cloud Firestore for requested student(s)
    var students = [];
    var unsub = db.collection("students").where(key, "==", value)
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

exports.getAllStudents = functions.https.onRequest((request, response) => {
    var students = [];
    var test = db.collection("students").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            students.push(doc.data());
        });
        console.log("Students Found in Database: ", students);
        response.send(students);
        return;
    });
    test.catch(error => {
        console.log(error);
    });
    return;
});

exports.getAllProfessors = functions.https.onRequest((request, response) => {
    var professors = [];
    db.collection("professors").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            professors.push(doc.data());
        });
        console.log("Professors Found in Database: ", professors);
        response.send(professors);
        return;
    })
    .catch(error => {
        console.log(error);
    });
    return;
});

exports.getAllStaff = functions.https.onRequest((request, response) => {
    var staff = [];
    db.collection("staff").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            staff.push(doc.data());
        });
        console.log("Staff Found in Database: ", staff);
        response.send(staff);
        return;
    })
    .catch(error => {
        console.log(error);
    });
    return;
});

exports.getAllCourses = functions.https.onRequest((request, response) => {
    var courses = [];
    var test = db.collection("courses").get()
    .then(querySnapshot => {
        querySnapshot.forEach(doc => {
            courses.push(doc.data());
        });
        console.log("Courses Found in Database: ", courses);
        response.send(courses);
        return;
    });
    test.catch(error => {
        console.log(error);
    });
    return;
});

// TO TEST:
// firebase serve --only functions