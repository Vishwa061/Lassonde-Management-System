const functions = require("firebase-functions");
const admin = require("firebase-admin");
const url = require('url');
const querystring = require('querystring');

// Initialize Cloud Firestore through Firebase
admin.initializeApp();
var db = admin.firestore();


/////// GET REQUEST FUNCTIONS ///////


exports.getStudents = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var key = parsedQs.key;
    var value = parsedQs.value;

    // console.log(key);
    // console.log(value);

    // Checks if the parameters are valid
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
            return;
        })
        .catch(error => {
            console.error(error);
        });

    return;
});

exports.getProfessors = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var key = parsedQs.key;
    var value = parsedQs.value;

    // console.log(key);
    // console.log(value);

    // Checks if the parameters are valid
    if (!(typeof key === "string" && typeof value === "string") || key.length === 0 || value.length === 0) {
        throw new functions.https.HttpsError("invalid-argument", "The function must be called with " +
            "two arguments 'key' and 'value' which must both be Strings and non-empty.");
    }

    // Queries Cloud Firestore for requested professor(s)
    var professors = [];
    db.collection("professors").where(key, "==", value).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                professors.push(doc.data());
            })
            console.log("Professors Found in Query: ", professors);
            response.send(professors);
            return;
        })
        .catch(error => {
            console.error(error);
        });

    return;
});

exports.getStaff = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var key = parsedQs.key;
    var value = parsedQs.value;

    // console.log(key);
    // console.log(value);

    // Checks if the parameters are valid
    if (!(typeof key === "string" && typeof value === "string") || key.length === 0 || value.length === 0) {
        throw new functions.https.HttpsError("invalid-argument", "The function must be called with " +
            "two arguments 'key' and 'value' which must both be Strings and non-empty.");
    }

    // Queries Cloud Firestore for requested staff member(s)
    var staff = [];
    db.collection("staff").where(key, "==", value).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                staff.push(doc.data());
            })
            console.log("Staff members Found in Query: ", staff);
            response.send(staff);
            return;
        })
        .catch(error => {
            console.error(error);
        });

    return;
});

exports.getCourses = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var key = parsedQs.key;
    var value = parsedQs.value;

    // console.log(key);
    // console.log(value);

    // Checks if the parameters are valid
    if (!(typeof key === "string" && typeof value === "string") || key.length === 0 || value.length === 0) {
        throw new functions.https.HttpsError("invalid-argument", "The function must be called with " +
            "two arguments 'key' and 'value' which must both be Strings and non-empty.");
    }

    // Queries Cloud Firestore for requested course(s)
    var courses = [];
    db.collection("courses").where(key, "==", value).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                courses.push(doc.data());
            })
            console.log("Courses Found in Query: ", courses);
            response.send(courses);
            return;
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
            return;
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
    db.collection("courses").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                courses.push(doc.data());
            });
            console.log("Courses Found in Database: ", courses);
            response.send(courses);
            return;
        })
        .catch(error => {
            console.log(error);
        });

    return;
});


/////// POST REQUEST FUNCTIONS ///////


// Returns:
// true if the student id is unique
// false otherwise
exports.addStudent = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var sCourses = parsedQs.courses;
    var sEmail = parsedQs.email;
    var sId = parsedQs.id;
    var sName = parsedQs.name;

    if (sId.length !== 9) {
        throw new functions.https.HttpsError("invalid-argument", "Student IDs must be 9 numbers long.");
    }

    // Queries Cloud Firestore for requested student
    db.collection("students").where("id", "==", sId).get()
        .then(querySnapshot => {
            let studentExists = false;
            if (querySnapshot.size === 1) {
                studentExists = true;
            }
            return studentExists;
        })
        .then(studentExists => {
            if (studentExists === false) {
                addStudent();
                response.send(true);
            }
            else {
                response.send(false);
            }
            return;
        })
        .catch(error => {
            console.error(error);
        });

    // Adds a new student
    function addStudent() {
        db.collection("students").add({
            courses: sCourses,
            email: sEmail,
            id: sId,
            name: sName
        })
            .then(docRef => {
                console.log("Student added with DOCUMENT ID: ", docRef.id);
                return;
            })
            .catch(error => {
                console.error("Error adding student: ", error);
            });
    }

    return;
});


/////// PUT REQUEST FUNCTIONS ///////


// Returns:
// true if the student id exists
// false otherwise
exports.updateStudent = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var sCourses = parsedQs.courses;
    var sEmail = parsedQs.email;
    var sId = parsedQs.id;
    var sName = parsedQs.name;
    var docID;

    if (sId.length !== 9) {
        throw new functions.https.HttpsError("invalid-argument", "Student IDs must be 9 numbers long.");
    }

    // Queries Cloud Firestore for requested student
    db.collection("students").where("id", "==", sId).get()
        .then(querySnapshot => {
            let studentExists = false;
            if (querySnapshot.size === 1) {
                studentExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return studentExists;
        })
        .then(studentExists => {
            if (studentExists === true) {
                updateStudent();
                response.send(true);
            }
            else {
                response.send(false);
            }
            return;
        })
        .catch(error => {
            console.error(error);
        });

    // Updates an existing student
    function updateStudent() {
        db.collection("students").doc(docID).set({
            courses: sCourses,
            email: sEmail,
            id: sId,
            name: sName
        })
            .then(() => {
                console.log("Student updated with DOCUMENT ID: ", docID);
                return;
            })
            .catch(error => {
                console.error("Error updating student: ", error);
            });
    }

    return;
});


/////// DELETE REQUEST FUNCTIONS ///////


exports.removeStudent = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameter
    var sId = parsedQs.id;
    var docID;

    if (sId.length !== 9) {
        throw new functions.https.HttpsError("invalid-argument", "Student IDs must be 9 numbers long.");
    }

    // Queries Cloud Firestore for requested student
    db.collection("students").where("id", "==", sId).get()
        .then(querySnapshot => {
            let studentExists = false;
            if (querySnapshot.size === 1) {
                studentExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return studentExists;
        })
        .then(studentExists => {
            if (studentExists === true) {
                removeStudent();
                response.send(true);
            }
            else {
                response.send(false);
            }
            return;
        })
        .catch(error => {
            console.error(error);
        });

    // Updates an existing student
    function removeStudent() {
        db.collection("students").doc(docID).delete()
            .then(() => {
                console.log("Student removed");
                return;
            })
            .catch(error => {
                console.error("Error removing student: ", error);
            });
    }
    return;
})


// TESTING:
// firebase serve --only functions

// DEPLOYMENT:
// firebase deploy --only functions