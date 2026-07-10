// ----------------------------
// Default Flashcards
// ----------------------------

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [

{
    question:"What is HTML?",
    answer:"HTML stands for HyperText Markup Language."
},

{
    question:"What is CSS?",
    answer:"CSS stands for Cascading Style Sheets."
},

{
    question:"What is JavaScript?",
    answer:"JavaScript is a programming language that makes web pages interactive."
},

{
    question:"What does CPU stand for?",
    answer:"Central Processing Unit."
},

{
    question:"What is RAM?",
    answer:"Random Access Memory."
}

];

// ----------------------------
// Variables
// ----------------------------

let currentCard = 0;

const flashcard = document.getElementById("flashcard");

const question = document.getElementById("question");
const answer = document.getElementById("answer");

const flipBtn = document.getElementById("flipBtn");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");

// ----------------------------
// Save to Local Storage
// ----------------------------

function saveCards(){

    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );

}

// ----------------------------
// Display Current Card
// ----------------------------

function showCard(){

    if(flashcards.length===0){

        question.innerHTML="No Flashcards Available";

        answer.innerHTML="";

        flipBtn.disabled=true;

        return;

    }

    flipBtn.disabled=false;

    question.innerHTML=flashcards[currentCard].question;

    answer.innerHTML=flashcards[currentCard].answer;

    flashcard.classList.remove("flip");

    flipBtn.innerHTML="Show Answer";

}

showCard();

// ----------------------------
// Flip Card
// ----------------------------

flipBtn.addEventListener("click",function(){

    flashcard.classList.toggle("flip");

    if(flashcard.classList.contains("flip")){

        flipBtn.innerHTML="Hide Answer";

    }

    else{

        flipBtn.innerHTML="Show Answer";

    }

});

// ----------------------------
// Next Card
// ----------------------------

nextBtn.addEventListener("click",function(){

    if(flashcards.length===0) return;

    currentCard++;

    if(currentCard>=flashcards.length){

        currentCard=0;

    }

    showCard();

});

// ----------------------------
// Previous Card
// ----------------------------

prevBtn.addEventListener("click",function(){

    if(flashcards.length===0) return;

    currentCard--;

    if(currentCard<0){

        currentCard=flashcards.length-1;

    }

    showCard();

});

// ----------------------------
// Add Flashcard
// ----------------------------

addBtn.addEventListener("click",function(){

    let q = questionInput.value.trim();

    let a = answerInput.value.trim();

    if(q==="" || a===""){

        alert("Please enter both Question and Answer.");

        return;

    }

    flashcards.push({

        question:q,

        answer:a

    });

    saveCards();

    currentCard=flashcards.length-1;

    showCard();

    questionInput.value="";
    answerInput.value="";

    alert("Flashcard Added Successfully!");

});

// ----------------------------
// Click Question to Edit
// ----------------------------

question.addEventListener("click",function(){

    if(flashcards.length===0) return;

    questionInput.value=flashcards[currentCard].question;

    answerInput.value=flashcards[currentCard].answer;

    addBtn.style.display="none";

    updateBtn.style.display="inline-block";

});

// ----------------------------
// Update Flashcard
// ----------------------------

updateBtn.addEventListener("click",function(){

    let q = questionInput.value.trim();

    let a = answerInput.value.trim();

    if(q==="" || a===""){

        alert("Please enter both fields.");

        return;

    }

    flashcards[currentCard].question=q;

    flashcards[currentCard].answer=a;

    saveCards();

    showCard();

    questionInput.value="";
    answerInput.value="";

    updateBtn.style.display="none";

    addBtn.style.display="inline-block";

    alert("Flashcard Updated!");

});

// ----------------------------
// Delete Flashcard
// ----------------------------

deleteBtn.addEventListener("click",function(){

    if(flashcards.length===0){

        alert("No Flashcards Available.");

        return;

    }

    let confirmDelete = confirm("Delete this flashcard?");

    if(!confirmDelete){

        return;

    }

    flashcards.splice(currentCard,1);

    if(currentCard>=flashcards.length){

        currentCard=flashcards.length-1;

    }

    if(currentCard<0){

        currentCard=0;

    }

    saveCards();

    showCard();

    questionInput.value="";
    answerInput.value="";

    addBtn.style.display="inline-block";

    updateBtn.style.display="none";

});