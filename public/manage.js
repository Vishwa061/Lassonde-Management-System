var studentData = [["Safi", "2"],["Eric", "3"],["Vishwa", "4"],["Alejandro", "5"]];

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
  var table = document.getElementById("data");
  document.getElementById("firstRow").innerHTML=searchInput;
}
