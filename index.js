showNotes();
let addBtn=document.getElementById('addBtn');
//If user adds a list,add it to the local storage
addBtn.addEventListener("click", function(e){
    let addTitle=document.getElementById("title");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    notesObj=[];
    if(notes != null){
        notesObj = JSON.parse(notes);
    }
    let myobj={
        title:addTitle.value,
        text:addTxt.value
    }
    notesObj.push(myobj);
    // newnotes = JSON.stringify(notesObj);
    // localStorage.setItem("notes" , "newnotes" );
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    addTitle.value="";
    addTxt.value ="";
    console.log(notesObj);
    showNotes();
})
//function to show list from local storage
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index) {
        html+=`
            <div class=" notecard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">${index+1} <b>${element.title}</b> </h5>
                  <p class="card-text"> ${element.text} </p>
                  <button class="btn btn-primary" id="${index}" onclick="deleteList(this.id)">Delete List</button>
                </div>
              </div>`;
    });
    let notesEle=document.getElementById('notes');
    if(notesObj.length!=0){
        notesEle.innerHTML=html;
    }
    else{
        notesEle.innerHTML='<b>Nothing to show ! Use Add list button to add new List</b>'
    }
}

//function to delete list
function deleteList(index){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes" , JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById("searchTxt");
search.addEventListener("input",function() {
    let text=search.value.toLowerCase();
    //console.log("Input event fired",text);
    let notecard=document.getElementsByClassName('notecard');
    Array.from(notecard).forEach(function(element) {
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(text)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})