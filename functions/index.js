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

exports.getExams = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var key = parsedQs.key;
    var value = parsedQs.value;

    // console.log(key);
    // console.log(value);

    // Checks if the parameters are valid
    if (!(typeof key === "string") || key.length === 0) {
        throw new functions.https.HttpsError("invalid-argument", "The function must be called with " +
            "two arguments 'key' and 'value' where key must be of type String and non-empty.");
    }

    // Queries Cloud Firestore for requested exam(s)
    var exams = [];
    db.collection("exams").where(key, "==", value).get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                exams.push(doc.data());
            })
            console.log("Exams Found in Query: ", exams);
            response.send(exams);
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

exports.getAllExams = functions.https.onRequest((request, response) => {
    var exams = [];
    db.collection("exams").get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                exams.push(doc.data());
            });
            console.log("Exams Found in Database: ", exams);
            response.send(exams);
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

    // Extracts the parameters 
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

exports.addProfessor = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the parameters 
    var sCourses = parsedQs.courses;
    var sEmail = parsedQs.email;
    var sId = parsedQs.id;
    var sName = parsedQs.name;

    // Queries Cloud Firestore for requested professor
    db.collection("professors").where("id", "==", sId).get()
        .then(querySnapshot => {
            let professorExists = false;
            if (querySnapshot.size === 1) {
                professorExists = true;
            }
            return professorExists;
        })
        .then(professorExists => {
            if (professorExists === false) {
                addProfessor();
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

    // Adds a new professor
    function addProfessor() {
        db.collection("professors").add({
            courses: sCourses,
            email: sEmail,
            id: sId,
            name: sName
        })
            .then(docRef => {
                console.log("Professor added with DOCUMENT ID: ", docRef.id);
                return;
            })
            .catch(error => {
                console.error("Error adding professor: ", error);
            });
    }

    return;
});

exports.addStaff = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the parameters 
    var sRole = parsedQs.role;
    var sEmail = parsedQs.email;
    var sId = parsedQs.id;
    var sName = parsedQs.name;

    // if (sId.length !== 7) {
    //     throw new functions.https.HttpsError("invalid-argument", "Staff IDs must be 7 numbers long.");
    // }

    // Queries Cloud Firestore for requested professor
    db.collection("staff").where("id", "==", sId).get()
        .then(querySnapshot => {
            let staffExists = false;
            if (querySnapshot.size === 1) {
                staffExists = true;
            }
            return staffExists;
        })
        .then(staffExists => {
            if (staffExists === false) {
                addStaff();
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

    // Adds a new staff member
    function addStaff() {
        db.collection("staff").add({
            role: sRole,
            email: sEmail,
            id: sId,
            name: sName
        })
            .then(docRef => {
                console.log("Staff member added with DOCUMENT ID: ", docRef.id);
                return;
            })
            .catch(error => {
                console.error("Error adding staff member: ", error);
            });
    }

    return;
});

exports.addCourse = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the parameters 
    var sCAT = parsedQs.CAT;
    var sName = parsedQs.name;
    var sRoom = parsedQs.room;
    var sSemseter = parsedQs.semseter;
    var sSubject = parsedQs.subject;
    var sYear = parsedQs.year;

    // Queries Cloud Firestore for requested course
    db.collection("courses").where("CAT", "==", sCAT).get()
        .then(querySnapshot => {
            let courseExists = false;
            if (querySnapshot.size === 1) {
                courseExists = true;
            }
            return courseExists;
        })
        .then(courseExists => {
            if (courseExists === false) {
                addCourse();
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

    // Adds a new course
    function addCourse() {
        db.collection("courses").add({
            CAT: sCAT,
            name: sName,
            room: sRoom,
            semseter: sSemseter,
            subject: sSubject,
            year: sYear
        })
            .then(docRef => {
                console.log("Course added with DOCUMENT ID: ", docRef.id);
                return;
            })
            .catch(error => {
                console.error("Error adding course: ", error);
            });
    }

    return;
});

exports.addExam = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the parameters 
    var sCAT = parsedQs.CAT;
    var sDate = parsedQs.date;
    var sDuration = parsedQs.duration;
    var sRoom = parsedQs.room;

    // Queries Cloud Firestore for requested course
    db.collection("courses").where("CAT", "==", sCAT).get()
        .then(querySnapshot => {
            let courseExists = false;
            if (querySnapshot.size === 1) {
                courseExists = true;
            }
            return courseExists;
        })
        .then(courseExists => {
            if (courseExists === true) {
                addExam();
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

    // Adds a new exam
    function addExam() {
        db.collection("exams").add({
            CAT: sCAT,
            date: sDate,
            duration: sDuration,
            room: sRoom
        })
            .then(docRef => {
                console.log("Exam added with DOCUMENT ID: ", docRef.id);
                return;
            })
            .catch(error => {
                console.error("Error adding exam: ", error);
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

exports.updateProfessor = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var sCourses = parsedQs.courses;
    var sEmail = parsedQs.email;
    var sId = parsedQs.id;
    var sName = parsedQs.name;
    var docID;

    // Queries Cloud Firestore for requested professor
    db.collection("professors").where("id", "==", sId).get()
        .then(querySnapshot => {
            let professorExists = false;
            if (querySnapshot.size === 1) {
                professorExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return professorExists;
        })
        .then(professorExists => {
            if (professorExists === true) {
                updateProfessor();
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

    // Updates an existing professor
    function updateProfessor() {
        db.collection("professors").doc(docID).set({
            courses: sCourses,
            email: sEmail,
            id: sId,
            name: sName
        })
            .then(() => {
                console.log("Professor updated with DOCUMENT ID: ", docID);
                return;
            })
            .catch(error => {
                console.error("Error updating professor: ", error);
            });
    }

    return;
});

exports.updateStaff = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var sRole = parsedQs.role;
    var sEmail = parsedQs.email;
    var sId = parsedQs.id;
    var sName = parsedQs.name;
    var docID;

    // if (sId.length !== 7) {
    //     throw new functions.https.HttpsError("invalid-argument", "Staff IDs must be 7 numbers long.");
    // }

    // Queries Cloud Firestore for requested staff member
    db.collection("staff").where("id", "==", sId).get()
        .then(querySnapshot => {
            let staffExists = false;
            if (querySnapshot.size === 1) {
                staffExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return staffExists;
        })
        .then(staffExists => {
            if (staffExists === true) {
                updateStaff();
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

    // Updates an existing staff member
    function updateStaff() {
        db.collection("staff").doc(docID).set({
            role: sRole,
            email: sEmail,
            id: sId,
            name: sName
        })
            .then(() => {
                console.log("Staff member updated with DOCUMENT ID: ", docID);
                return;
            })
            .catch(error => {
                console.error("Error updating staff member: ", error);
            });
    }

    return;
});

exports.updateCourse = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var sCAT = parsedQs.CAT;
    var sName = parsedQs.name;
    var sRoom = parsedQs.room;
    var sSemseter = parsedQs.semseter;
    var sSubject = parsedQs.subject;
    var sYear = parsedQs.year;
    var docID;

    // Queries Cloud Firestore for requested course
    db.collection("courses").where("CAT", "==", sCAT).get()
        .then(querySnapshot => {
            let courseExists = false;
            if (querySnapshot.size === 1) {
                courseExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return courseExists;
        })
        .then(courseExists => {
            if (courseExists === true) {
                updateCourse();
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

    // Updates an existing course
    function updateCourse() {
        db.collection("courses").doc(docID).set({
            CAT: sCAT,
            name: sName,
            room: sRoom,
            semseter: sSemseter,
            subject: sSubject,
            year: sYear
        })
            .then(() => {
                console.log("Course updated with DOCUMENT ID: ", docID);
                return;
            })
            .catch(error => {
                console.error("Error updating course: ", error);
            });
    }

    return;
});

exports.updateExam = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameters 
    var sCAT = parsedQs.CAT;
    var sDate = parsedQs.date;
    var sDuration = parsedQs.duration;
    var sRoom = parsedQs.room;
    var docID;

    // Queries Cloud Firestore for requested exam
    db.collection("exams").where("CAT", "==", sCAT).get()
        .then(querySnapshot => {
            let examExists = false;
            if (querySnapshot.size === 1) {
                examExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return examExists;
        })
        .then(examExists => {
            if (examExists === true) {
                updateExam();
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

    // Updates an existing exam
    function updateExam() {
        db.collection("exams").doc(docID).set({
            CAT: sCAT,
            date: sDate,
            duration: sDuration,
            room: sRoom
        })
            .then(() => {
                console.log("Exam updated with DOCUMENT ID: ", docID);
                return;
            })
            .catch(error => {
                console.error("Error updating exam: ", error);
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

    // Removes an existing student
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

exports.removeProfessor = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameter
    var sId = parsedQs.id;
    var docID;

    // Queries Cloud Firestore for requested professor
    db.collection("professors").where("id", "==", sId).get()
        .then(querySnapshot => {
            let professorExists = false;
            if (querySnapshot.size === 1) {
                professorExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return professorExists;
        })
        .then(professorExists => {
            if (professorExists === true) {
                removeProfessor();
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

    // Removes an existing professor
    function removeProfessor() {
        db.collection("professors").doc(docID).delete()
            .then(() => {
                console.log("Professor removed");
                return;
            })
            .catch(error => {
                console.error("Error removing professor: ", error);
            });
    }
    return;
})

exports.removeStaff = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameter
    var sId = parsedQs.id;
    var docID;

    // Queries Cloud Firestore for requested staff member
    db.collection("staff").where("id", "==", sId).get()
        .then(querySnapshot => {
            let staffExists = false;
            if (querySnapshot.size === 1) {
                staffExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return staffExists;
        })
        .then(staffExists => {
            if (staffExists === true) {
                removeStaff();
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

    // Removes an existing staff member
    function removeStaff() {
        db.collection("staff").doc(docID).delete()
            .then(() => {
                console.log("Staff member removed");
                return;
            })
            .catch(error => {
                console.error("Error removing staff member: ", error);
            });
    }
    return;
})

// Warning: Removing a course will also remove any existing exam associated
exports.removeCourse = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameter
    var sCAT = parsedQs.CAT;
    var docID;

    // Queries Cloud Firestore for requested course
    db.collection("courses").where("CAT", "==", sCAT).get()
        .then(querySnapshot => {
            let courseExists = false;
            if (querySnapshot.size === 1) {
                courseExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return courseExists;
        })
        .then(courseExists => {
            if (courseExists === true) {
                removeCourse();
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

    // Removes an existing course
    function removeCourse() {
        db.collection("courses").doc(docID).delete()
            .then(() => {
                console.log("Course removed");
                removeExam(docID);
                return;
            })
            .catch(error => {
                console.error("Error removing course: ", error);
            });
    }
    return;
})

exports.removeExam = functions.https.onRequest((request, response) => {
    // Parses the request
    let parsedUrl = url.parse(request.url);
    let parsedQs = querystring.parse(parsedUrl.query);

    // Extracts the query parameter
    var sCAT = parsedQs.CAT;
    var docID;

    // Queries Cloud Firestore for requested exam
    db.collection("exams").where("CAT", "==", sCAT).get()
        .then(querySnapshot => {
            let examExists = false;
            if (querySnapshot.size === 1) {
                examExists = true;
                querySnapshot.forEach(doc => {
                    docID = doc.id;
                })
            }
            return examExists;
        })
        .then(examExists => {
            if (examExists === true) {
                removeExam(docID);
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


    return;
})

// Removes an existing exam
function removeExam(docID) {
    db.collection("exams").doc(docID).delete()
        .then(() => {
            console.log("Exam removed");
            return;
        })
        .catch(error => {
            console.error("Error removing exam: ", error);
        });
}

// TESTING:
// firebase serve --only functions

// DEPLOYMENT:
// firebase deploy --only functions