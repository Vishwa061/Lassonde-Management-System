var studentData = [["Safi", "2"],["Eric", "3"],["Vishwa", "4"],["Alejandro", "5"]];
var create = true;
// var searchInput = document.getElementById("mainSearchBar").value;
var searchInput;
function remButton() {
  var searchDIV = document.getElementById("remSearch");
  var buttonDIV = document.getElementById("remButton");
  if (searchDIV.hidden) {
    searchDIV.hidden = false;
    buttonDIV.style.backgroundColor="pink";
  } else {
    searchDIV.hidden = true;
    buttonDIV.style.backgroundColor="#e6aec1";
  }
}

function updButton() {
  var searchDIV = document.getElementById("updSearch");
  var buttonDIV = document.getElementById("updButton");
  if (searchDIV.hidden) {
    searchDIV.hidden = false;
    buttonDIV.style.backgroundColor="pink";
  } else {
    searchDIV.hidden = true;
    buttonDIV.style.backgroundColor="#e6aec1";
  }
}

function onSearch() {
  var selectOpt = document.getElementById("selectOption").value;
  searchInput = document.getElementById("mainSearchBar").value;
  createTable();
}

function createTable() {
  // var table = document.getElementById("data");
  // document.getElementById("firstRow").innerHTML=searchInput;
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
      addData();
  }
}
function addData(){

  for (var i = 0; i < studentData.length; i++) {
    var rows = document.createElement("TR");
    var cell1 = document.createElement("TD");
    var cell2 = document.createElement("TD");
    var cell3 = document.createElement("TD");
    cell1.innerHTML = studentData[i][0];
    cell2.innerHTML = studentData[i][1];
    cell3.innerHTML = "Update";
    rows.appendChild(cell1);
    rows.appendChild(cell2);
    rows.appendChild(cell3);
    var main = document.getElementById("table");
    main.appendChild(rows);
  }

}

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

function addbutonclk() {
    var stuname = document.getElementById("stuname").value;
    var stunum = document.getElementById("stunum").value;
    alert(stunum);
}
