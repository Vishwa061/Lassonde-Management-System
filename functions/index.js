const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


// Initialize Cloud Firestore through Firebase
var db = admin.firestore();


exports.getStudents = functions.https.onRequest((request, response) => {
    const url = require('url');
    const querystring = require('querystring');

    // Parsing the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracting query request 
    var key = parsedQs.key;
    var value = parsedQs.value;

    // console.log(key);
    // console.log(value);

    // Checks if request data is valid
    if (!(typeof key === "string" && typeof value === "string") || key.length === 0 || value.length === 0) {
        throw new functions.https.HttpsError("invalid-argument", "The function must be called with " +
            "two arguments 'key' and 'value' which must both be Strings and non-empty.");
    }

    // Queries Cloud Firestore for requested student(s)
    var students = [];
    db.collection("students").where(key, "==", value).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                students.push(doc.data());
            })
            console.log("Students Found in Query: ", students);
            response.send(students);
        })
        .catch(error => {
            console.error(error);
        });

    return;
});

exports.getAllStudents = functions.https.onRequest((request, response) => {
    var students = [];
    db.collection("students").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                students.push(doc.data());
            });
            console.log("Students Found in Database: ", students);
            response.send(students);
        })
        .catch(error => {
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
        })
        .catch(error => {
            console.log(error);
        });

    return;
});

exports.getAllCourses = functions.https.onRequest((request, response) => {
    var courses = [];
    db.collection("courses").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                courses.push(doc.data());
            });
            console.log("Courses Found in Database: ", courses);
            response.send(courses);
        })
        .catch(error => {
            console.log(error);
        });

    return;
});

// Returns:
// true if the student id is unique
// false otherwise
exports.addStudent = functions.https.onRequest((request, response) => {
    var sCourses = [];
    var sEmail = "";
    var sId = "1234567";
    var sName = "";

    // // Somehow read the request
    // sCourses = request.courses;
    // sEmail = request.email;
    // sId = request.id;
    // sName = request.name;

    // Queries Cloud Firestore for requested student
    db.collection("students").where("id", "==", sId).get()
        .then(querySnapshot => {
            let studentExists = false;
            if (querySnapshot.size > 0) {
                studentExists = true;
            }
            return studentExists;
        })
        .then(studentExists => {
            if (studentExists == false) {
                addStudent();
                response.send(true);
            }
            else {
                response.send(false);
            }
        })
        .catch(error => {
            console.error(error);
        });

    // Adds a new student to the database
    function addStudent() {
        db.collection("students").add({
            courses: sCourses,
            email: sEmail,
            id: sId,
            name: sName
        })
            .then(docRef => {
                console.log("Student added with DOCUMENT ID: ", docRef.id);
            })
            .catch(error => {
                console.error("Error adding student: ", error);
            });
    };

    return;
});

// TO TEST:
// firebase serve --only functions