// Question Array
    
    let questionArray = [
        {
            question : "Q1. What will this code print? let items = 0; let message = items === 0 ? 'Cart is empty' : 'Cart has items'; console.log(message);" ,
            options : [ "A : undefined",
                        "B : 0",
                        "C : Cart is empty",
                        "D : Cart has items"],
            answer : "C : Cart is empty"
        },
        {
            question : "Q2. What will this code print? const password = '1234'; if (password.length < 6) { console.log('Password too short'); } else { console.log('Valid password'); }" ,
            options : ["A : 4",
                       "B : Password required",
                       "C : Password too short",
                       "D : Valid password"],
            answer : "C : Password too short"
        },
        {
            question : "Q3. What is the value of result after this code runs? let count = 5; let result = count++;" ,
            options : ["A : undefined",
                       "B : 5",
                       "C : 6",
                       "D : 4"],
            answer : "B : 5"
        },
        {
            question : "Q4. Which condition checks that username is an empty string using strict equality?" ,
            options : [ "A : username === ''",
                        "B : username = ''",
                        "C : username == 0",
                        "D : username !== ''"],
            answer : "A : username === ''"
        },
        {
            question : "Q5. What does a JavaScript function return when it reaches a return statement with the value 25?" ,
            options : ["A : The value 25",
                        "B : The function name",
                        "C : The console output",
                        "D : Always undefined"],
            answer : "A : The value 25"
        },
        {
            question : "Q6. What is the main difference between == and === in JavaScript?" ,
            options : ["A : === checks value and type",
                         "B : == checks value and type",
                        "C : === is assignment",
                         "D : == only works with numbers"],
            answer : "A : === checks value and type"
        },
        {
            question : "Q7. Which keyword is used to declare a variable that cannot be reassigned?" ,
            options : ["A : let",
                         "B : var",
                        "C : const",
                         "D : static"],
            answer : "C : const"
        },
          {
            question : "Q8. Which operator is used to check whether two values are strictly equal?" ,
            options : ["A : =",
                     "B : ==",
                     "C : ===",
                     "D : !="],
            answer : "C : ==="
        },
    ];


    let index=0; 
    let totalScore=0;   

    document.getElementById("optionSection").style.display="none"
    document.getElementById("resultSection").style.display="none"


    let btnContent = document.getElementById("nxtBtn");
    
    btnContent.addEventListener("click",()=>{
       
        if(btnContent.textContent === "START")
        {
            document.getElementById("welcomeSection").style.display="none"

            nextQuestion();

            btnContent.textContent="NEXT"
            btnContent.disabled = true
        }
        else if(btnContent.textContent === "NEXT")
        {
            index++

            if(index<8)
            {
                let optionSection = document.getElementById("optionSection")
                optionSection.innerHTML="";

                nextQuestion();
                btnContent.disabled = true

                if(index==7)
                    btnContent.textContent="SHOW RESULT"
            }
        }
        else if (btnContent.textContent == "SHOW RESULT")
        {

                document.getElementById("optionSection").style.display= "none";

                let resultHeading = document.createElement("p")
                resultHeading.innerHTML="Quiz Complete!.. <br>";
                resultHeading.id="resultHeading";

                let score = document.createElement("p")
                score.innerHTML="You scored "+totalScore+" out of 8 <br>";

                let resultComment = document.createElement("p")             

                if(totalScore===8)
                {
                    resultComment.textContent = "Excellent!"
                }
                else if(totalScore>5)
                {
                    resultComment.textContent = "Very Good! Keep it up."
                }
                else if(totalScore>2)
                {
                    resultComment.textContent = "Good! Continue the good work."
                }
                else{
                    resultComment.textContent = "Poor. Needs improvement."
                }

                let resultSection = document.getElementById("resultSection");
                resultSection.appendChild(resultHeading);
                resultSection.appendChild(score);
                resultSection.appendChild(resultComment);

                document.getElementById("resultSection").style.display="block"
                btnContent.textContent="Restart Quiz"

        }
        else if (btnContent.textContent === "Restart Quiz")
        {
                index=0;
                totalScore=0;

                let resultSec = document.getElementById("resultSection");
                resultSec.innerHTML="";
                resultSec.style.display="none"

                let optionSection = document.getElementById("optionSection")
                optionSection.innerHTML="";

                nextQuestion();
                btnContent.disabled = true
                btnContent.textContent="NEXT"
        }   
    });

    //Renders next question
        function nextQuestion()
        {
            //Question

            let question = document.createElement("p")
            question.innerHTML = "<b>"+questionArray[index].question + "</b><br>";
            question.id="question"

            //Options Section

            let optionSection = document.getElementById("optionSection")

            optionSection.appendChild(question)

            //Options 
            let options = questionArray[index].options;
            console.log(options)

            let optionIndex =0;

            options.forEach(op => { 
                let radio = document.createElement("input")
                radio.type="radio"
                radio.name="answerOptions"
                radio.value = op;
                radio.id= "option"+optionIndex;

                let label = document.createElement("label")
                label.innerHTML = "&nbsp;"+op;
                label.htmlFor = radio.id;

                radio.addEventListener("change",function(){

                    if(this.value === questionArray[index].answer)
                    {
                        this.style.accentColor = "green"
                        label.style.color="green"
                        btnContent.disabled = false;
                       
                        const selectedRadioBtn = this.value;
                        disableRadioButtons(selectedRadioBtn);
                        
                        totalScore ++
                        console.log(totalScore);
                    }
                    else
                    {
                        this.style.accentColor = "red"
                        label.style.color="red"

                        let answer = document.createElement("p")
                        answer.innerHTML = "<br><b> Answer " + questionArray[index].answer +"</b>";

                        btnContent.disabled = false;

                        const selectedRadioBtn = this.value;
                        disableRadioButtons(selectedRadioBtn);

                        optionSection.appendChild(answer)
                    }


                })

                let br = document.createElement("br")
                optionSection.appendChild(radio)
                optionSection.appendChild(label)
                optionSection.appendChild(br)
                optionIndex++;
            })

            document.getElementById("optionSection").style.display="block"
                
         }
    
         // Disable all the other radio button otherthan the one selected - inorder to retain the right or wrong answer colour code - red & green
         function disableRadioButtons(selectedRadioBtn)
         {
            document.querySelectorAll('input[name=answerOptions]').forEach(r=> {
                if(r.value !== selectedRadioBtn)
                {
                    r.disabled =true;
                }
            });
         }