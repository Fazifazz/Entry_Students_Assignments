/*------------ASSIGNMENT3:Build a multiple-choice quiz application using JavaScript,
 DOM manipulation, and event handling.------------*/


 //creating array of questions
 const questions=[
    {
        question:"What does HTML stand for?",
        choices:[
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Markup Language",
            "Home Text Markup Language"
        ],
        correctAnswer:"Hyper Text Markup Language"
    },
    {
      question:"Which HTML tag is used to create a paragraph?",
       choices:[
            "<para>",
            "<p>",
            "<paragraph>",
            "<text>"
        ],
        correctAnswer:"<p>"  
    },
    {
      question:"Which HTML tag is used for the largest heading?",
        choices:[
            "<heading>",
            "<h6>",
            "<h1>",
            "<head>"
        ],
        correctAnswer:"<h1>"  
    },
    {
      question:"Which HTML tag is used to create a hyperlink?",
       choices:[
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correctAnswer:"<a>"   
    },
    {
     question:"Which attribute specifies the URL of a link?",
        choices:[
            "src",
            "link",
            "href",
            "url"
        ],
        correctAnswer:"href"   
    },
    {
      question:"Which HTML tag is used to display an image?",
        choices:[
            "<image>",
            "<img>",
            "<picture>",
            "<src>"
        ],
        correctAnswer:"<img>"    
    },
    {
      question:"Which attribute is used to provide alternative text for an image?",
        choices:[
            "title",
            "src",
            "alt",
            "text"
        ],
        correctAnswer:"alt"   
    },
    {
     question:"What does CSS stand for?",
        choices:[
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer:"Cascading Style Sheets"   
    }
 ]

// declaring variables

let currentquestion=0;
let score=0;
let answered = false;

let quizcontainer=document.getElementById("question-container");
let answercontainer=document.getElementById("option-container");
let nextbutton=document.getElementById("nextbtn");
let scoretext=document.getElementById("score");
let mainheading=document.getElementById("main-heading");


//function to display question
function displayQuestion(){
    quizcontainer.innerHTML="";
    answercontainer.innerHTML="";
    answered = false;
    nextbutton.disabled = true;

    let currentQn=questions[currentquestion];
    const questionpart=document.createElement("h3");
    questionpart.textContent=`Q ${currentquestion+1}:${currentQn.question}`;
    quizcontainer.appendChild(questionpart);
    
    
    for(let i=0;i<4;i++){
       const option=document.createElement("button"); 
       option.classList.add("option-button")
       option.textContent=`${currentQn.choices[i]}` 
       answercontainer.appendChild(option)
       option.addEventListener("click", function () {
        answered = true;
        nextbutton.disabled = false;

    let selectedoption=option.textContent;
    const allOptions = document.querySelectorAll(".option-button");

allOptions.forEach((button) => {
    button.disabled = true;
});
    checkAnswer(selectedoption,option);
});
    }
    
}
nextbutton.addEventListener("click", () => {
    if (!answered) {
        popup.style.display = "flex";
        return;
    }
    currentquestion++;

    if(currentquestion < questions.length){
        displayQuestion();
    } else {
        quizcontainer.innerHTML = "<h2>Quiz Completed!</h2>";
        answercontainer.innerHTML = "";
        nextbutton.style.display = "none";
        let feedback;

if (score === 8) {
    feedback = "Excellent! Perfect score!";
} else if (score >= 6) {
    feedback = "Great job!";
} else if (score >= 4) {
    feedback = "Good effort! Keep practicing.";
} else {
    feedback = "Keep practicing and try again!";
}

quizcontainer.innerHTML = `
    <h2>You scored ${score} out of 8</h2>
    <p>${feedback}</p>
`;
        mainheading.style.display="none";
        const restartbtn=document.getElementById("restartbtn");
        restartbtn.style.display="block";
        restartbtn.addEventListener("click",()=>{
            currentquestion=0;
            score=0;
            mainheading.style.display = "block";
            scoretext.innerHTML="Score:0";
            restartbtn.style.display = "none";
            nextbutton.style.display ="block";
            displayQuestion();
        })
    }
});


// function to check answer
function checkAnswer(selectedoption,option){
    let currentQn=questions[currentquestion];
    const message=document.getElementById("answer");
        if(selectedoption===currentQn.correctAnswer){
            option.classList.add("right-answer");
             score++;
            
            scoretext.textContent=`Score:${score}`;
        }else if(selectedoption!==currentQn.correctAnswer){
            option.classList.add("wrong-answer");
            
            message.textContent=` Correct answer : ${currentQn.correctAnswer}`
           
        }
       nextbutton.addEventListener("click",()=>{
        message.textContent="";
       })
}

// pop up 
const popup = document.getElementById("popup");
const closePopup = document.getElementById("close-popup");

closePopup.addEventListener("click", () => {
    popup.style.display = "none";
});

displayQuestion();