//Global Variables
let questionnaire = [
    q1 = {
        q: "What ocean is on the West Coast of the United States?",
        answers: [
        "Pacific Ocean", 
        "Arctic Ocean", 
        "Southern Ocean", 
        "Atlantic Ocean"
        ],
        correctAnswer: "Pacific Ocean"
    },
    q2 = {
        q: "Who vetoes bills?",
        answers: [
            "the Vice President",
            "the President",
            "the Speaker of the House",
            "the President Pro Tempore"           
        ],
        correctAnswer: "the President"
    },
    q3 = {
        q: "Who is in charge of the executive branch?",
        answers: [
            "the Speaker of the House",
            "the President",
            "the Priminister",
            "the Chief Justice"           
        ],
        correctAnswer: "the President"
    },
    q4 = {
        q: "What are two Cabinet-level positions?",
        answers: [
            "Secretary of Health and Human Services and Secretary of the Navy",
            "Secretary of the Interior and Secretary of History",
            "Secretary of State and Secretary of Labor",
            "Secretary of Weather and Secretary of Energy"           
        ],
        correctAnswer: "Secretary of State and Secretary of Labor"
    },
    q5 = {
        q: "How many justices are on the Supreme Court?",
        answers: [
            "eleven (11)",
            "ten (10)",
            "nine (9)",
            "twelve (12)"           
        ],
        correctAnswer: "nine (9)"
    },
    q6 = {
        q: "What did the Emancipation Proclamation do?",
        answers: [
            "freed slaves in most Southern states",
            "ended World War I",
            "gave the United States independent from Great Britain",
            "gave women the right to vote"           
        ],
        correctAnswer: "freed slaves in most Southern states"
    },
    q7 = {
        q: "What are two rights in the Declaration of Independence?",
        answers: [
            "life and pursuit of happiness",
            "life and right to own a home",
            "liberty and justice",
            "life and death"           
        ],
        correctAnswer: "life and pursuit of happiness"
    },
    q8 = {
        q: "Why do some states have more Representatives than other states?",
        answers: [
            "because of the geographic size of the state",
            "because of the state’s location",
            "because of the state’s population",
            "because the state’s Representatives have seniority"           
        ],
        correctAnswer: "because of the state’s population"
    },
    q9 = {
        q: "Who lived in America before the Europeans arrived?",
        answers: [
            "no one",
            "Canadians",
            "Floridians",
            "American Indians"           
        ],
        correctAnswer: "American Indians"
    },
    q10 = {
        q: "What did Martin Luther King, Jr. do?",
        answers: [
            "ran for President of the United States",
            "fought for women’s suffrage",
            "became a U.S Senator",
            "fought for civil rights"           
        ],
        correctAnswer: "fought for civil rights"
    },

]

let qNumber = 1;
let ansId;
let correctCount = 0;
let incorrectCount = 0;
let unanswered = 0;
let correctAns;
let selectLock = false;
let _gameDiv = $('#gameDiv').clone()


//Push Question and Answers to the page
function display() {
    $('#qNumber').text(qNumber);
    $('#question').text(questionnaire[qNumber-1].q)
    for (let i = 0; i < questionnaire[qNumber-1].answers.length; i++) {
        $('#'+(i+1)).append("  " + questionnaire[qNumber-1].answers[i])
        if (questionnaire[qNumber - 1].answers[i] === (questionnaire[qNumber -1].correctAnswer)) {
           ansId = (i+1)
           console.log(ansId)
           correctAns = $('#' + ansId)
        }
    }
}

//Check answer
function checkAns() {
    if (!selectLock) {
        if(this.id == ansId) {
            selectLock = false;
            stop()
            correctCount++;
            $('#timer').text("Correct!")
            console.log("Correct!")
            showAnswer();
        } else {
            selectLock = false;
            stop();
            incorrectCount++;
            console.log('Incorrect!')
            $('#timer').text("Incorrect!");
            showAnswer();
        }
    }
    $('#next').show();
    qNumber++;
}

//Next Question
function nextQuestion() {
    if (qNumber < 11) {
        selectLock = false;
        $('#gameDiv').replaceWith(_gameDiv.clone());
        display();
        timer = 30;
        runTimer();
        $('#next').hide();
        $('.list-group-item').on('click', checkAns)
        $('#next').on('click', nextQuestion)
    }
}
//Show Answer when time is up

function showAnswer() {
    selectLock = true;
    $('#question').text("The correct answer is: ")
    $('#answers').replaceWith(correctAns)
    $('#next').show();
}

$(function() {
   $('#gameDiv').hide();
});

//Start Game Click

$('#start').on('click', function() {
    $('#firstPage').remove();
    $('#gameDiv').show();
    $('#next').hide();
    display();
    runTimer();
})

//Timer function
let timer = 30;
let intervalId;

function runTimer() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000)
}

function decrement() {
    timer--;
    $('#timer').text("00:" + converter(timer));
        if (timer === 0) {
            stop();
            $('#timer').text("Time's Up")
            unanswered++;
            showAnswer();
            qNumber++;
        }
}

function converter(timer) {
    if (timer < 10) {
        timer = '0' + timer
      }
    return timer
}

function stop() {
    clearInterval(intervalId);
}

//Eventlistener

$('.list-group-item').on('click', checkAns)
$('#next').on('click', nextQuestion)