"use strict";

showNotes();
var addBtn = document.getElementById('addBtn'); //If user adds a list,add it to the local storage

addBtn.addEventListener("click", function (e) {
  var addTitle = document.getElementById("title");
  var addTxt = document.getElementById("addTxt");
  var notes = localStorage.getItem("notes");
  notesObj = [];

  if (notes != null) {
    notesObj = JSON.parse(notes);
  }

  var myobj = {
    title: addTitle.value,
    text: addTxt.value
  };
  notesObj.push(myobj); // newnotes = JSON.stringify(notesObj);
  // localStorage.setItem("notes" , "newnotes" );

  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addTxt.value = "";
  console.log(notesObj);
  showNotes();
}); //function to show list from local storage

function showNotes() {
  var notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  var html = "";
  notesObj.forEach(function (element, index) {
    html += "\n            <div class=\" notecard my-2 mx-2 card\" style=\"width: 18rem;\">\n                <div class=\"card-body\">\n                  <h5 class=\"card-title\">".concat(index + 1, " <b>").concat(element.title, "</b> </h5>\n                  <p class=\"card-text\"> ").concat(element.text, " </p>\n                  <button class=\"btn btn-primary\" id=\"").concat(index, "\" onclick=\"deleteList(this.id)\">Delete List</button>\n                </div>\n              </div>");
  });
  var notesEle = document.getElementById('notes');

  if (notesObj.length != 0) {
    notesEle.innerHTML = html;
  } else {
    notesEle.innerHTML = '<b>Nothing to show ! Use Add list button to add new List</b>';
  }
} //function to delete list


function deleteList(index) {
  var notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

var search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
  var text = search.value.toLowerCase(); //console.log("Input event fired",text);

  var notecard = document.getElementsByClassName('notecard');
  Array.from(notecard).forEach(function (element) {
    var cardTxt = element.getElementsByTagName("p")[0].innerText;

    if (cardTxt.includes(text)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});