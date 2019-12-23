var create = true;
var star = [];

// Creates the top row of table "Student Name" "Student Number" etc
function createTable() {

    if(create == true){
        var maintable = document.createElement("TABLE");
        maintable.setAttribute("id","table");
        var row1 = document.createElement("TR");
        var th1 = document.createElement("TH");
        var th2 = document.createElement("TH");
        var th3 = document.createElement("TH");
        var th4 = document.createElement("TH");
        var txt1 = document.createTextNode("Student Name");
        var txt2 = document.createTextNode("Student Number");
        var txt3 = document.createTextNode("Update Info");
        th1.setAttribute("width","50%");
        th2.setAttribute("width","35%");
        th3.setAttribute("width","10%");
        th4.setAttribute("width","5%");
        th1.appendChild(txt1);
        th2.appendChild(txt2);
        th3.appendChild(txt3);
        row1.appendChild(th1);
        row1.appendChild(th2);
        row1.appendChild(th3);
        row1.appendChild(th4);
        maintable.appendChild(row1);
        var tablebody = document.getElementById("test");
        tablebody.appendChild(maintable);
        create = false;
        // showAllStudentData();
    }
}

// Creates table rows and adds data to them

function generateTable(data) {

    for (var i = 0; i < data.length; i++) {
        var rows = document.createElement("TR");
        var cell1 = document.createElement("TD");
        var cell2 = document.createElement("TD");
        var cell3 = document.createElement("TD");
        cell1.innerHTML = data[i].name;
        cell2.innerHTML = data[i].id;
        cell3.innerHTML = "Update";
        rows.appendChild(cell1);
        rows.appendChild(cell2);
        rows.appendChild(cell3);
        var main = document.getElementById("table");
        main.appendChild(rows);
    }
}

// Makes request to API for data of a specific student, calls generateTable()
function showSpecificStudentData() {

    createTable();
    var selectOpt =  document.getElementById("selectOption").value;
    var searchInput = document.getElementById("mainSearchBar").value;
    var params = "?key=" + selectOpt.toLowerCase() + "&value=" + searchInput;
    console.log(searchInput,selectOpt);
    var request = new XMLHttpRequest();
    request.open('GET', 'https://us-central1-management-system-be9f9.cloudfunctions.net/getStudents'+params, true)
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        console.log(data[0].name);
        star = data;
        generateTable(data)
    }

    request.send()
}

// Makes request to API and updates info of a student
function updateStudentData() {


    var selectOpt =  document.getElementById("selectOption2").value;
    var searchInput = document.getElementById("mainSearchBar2").value;
    var params = "?key=" + selectOpt.toLowerCase() + "&value=" + searchInput;
    var request = new XMLHttpRequest();
    request.open('PUT', 'https://us-central1-management-system-be9f9.cloudfunctions.net/updateStudent'+params, true)
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        console.log(data[0].name);
        star = data;
        generateTable(data)
    }

    request.send()
}

// Makes request to API and adds a new student to Firebase
function addNewStudentData() {


    var stuname = document.getElementById("stuname").value;
    var stunum = document.getElementById("stunum").value;
    var params = "?id=" + stunum + "&name=" + stuname + "&courses" + "&email";
    var request = new XMLHttpRequest();
    request.open('POST', 'https://us-central1-management-system-be9f9.cloudfunctions.net/addStudent'+params, true)
    request.onload = function() {
        // Begin accessing JSON data here
        alert(this.response);
    }

    request.send()
}

// Makes request to API and removes a Student
function removeStudentData() {

    var stunum = document.getElementById("stuname2").value;
    var params = "?id=" + stunum;
    var request = new XMLHttpRequest();
    request.open('DELETE', 'https://us-central1-management-system-be9f9.cloudfunctions.net/removeStudent'+params, true)
    request.onload = function() {
        // Begin accessing JSON data here
        alert(this.response);
    }

    request.send()
}

// Makes request to API and returns all students data and calls generateTable()
function showAllStudentData() {
    createTable();
    var request = new XMLHttpRequest()
    request.open('GET', 'https://us-central1-management-system-be9f9.cloudfunctions.net/getAllStudents', true)
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        star = data
        generateTable(data)
    }

    request.send()
}

// Displays the pop up
function addStudent(){
    // Get the modal
    var modal = document.getElementById("myModal");
    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Displays the pop up
function remStudent(){
    // Get the modal
    var modal = document.getElementById("myModal2");
    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close2")[0];
    // When the user clicks the button, open the modal
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Displays the pop up
function upStudent(){
    // Get the modal
    var modal = document.getElementById("myModal3");
    // Get the button that opens the modal
    // var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close3")[0];
    // When the user clicks the button, open the modal
    modal.style.display = "block";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


function addbutonclk() {
    var stuname = document.getElementById("stuname").value;
    var stunum = document.getElementById("stunum").value;
    alert(stunum);
}
function rembutonclk() {
    var stuname = document.getElementById("stuname2").value;
    alert(stuname);
}

function updbutonclk() {
    var selectOpt =  document.getElementById("selectOption2").value;
    var searchInput = document.getElementById("mainSearchBar2").value;
}