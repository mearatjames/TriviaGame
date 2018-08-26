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
    q11 = {
        q: "Who was President during the Great Depression and World War II?",
        answers: [
            "Franklin Roosevelt",
            "Calvin Coolidge",
            "Harry Truman",
            "Herbert Hoover"           
        ],
        correctAnswer: "Franklin Roosevelt"
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

//Shuffle questionaire
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

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
    qNumber++;
    $('#nextContainer').show();
}

//Next Question
function nextQuestion() {
    if (qNumber < 11) {
        selectLock = false;
        $('#gameDiv').replaceWith(_gameDiv.clone());
        display();
        timer = 30;
        runTimer();
        $('#nextContainer').hide();
        $('.list-group-item').on('click', checkAns)
        $('#next').on('click', nextQuestion)
    } else {
        results ();
    }
}

//Results Function
function results() {

let message = (correctCount > 6) ? "Congratulations! You passed the test!" : "You failed. Study some more!"
    $('#timer').hide();
    $('#next').text("Restart")
    $('#card').html(`
    <h1 class="results" >${message}</h1>
    <div class="list-group text-white">
    <h3 class="results">Correct Answer: ${correctCount}</h3>
    <h3 class="results">Incorrect Answer: ${incorrectCount}</h3>
    <h3 class="results">Unanswered: ${unanswered}</h3>
    </div>
    `)
    $('#next').on('click', function() {
        location.reload()
    })
}

//Show Answer when time is up
function showAnswer() {
    selectLock = true;
    $('#question').text("The correct answer is: ")
    $('#answers').replaceWith(correctAns)
    $('#nextContainer').show();
    if (qNumber == 10) {
        $('#next').text("See Result")
    }
}

//Document Ready function
$(function() {
   $('#gameDiv').hide();
   shuffle(questionnaire);
});

//Start Game Click
$('#start').on('click', function() {
    $('#firstPage').remove();
    $('#gameDiv').show();
    $('#nextContainer').hide();
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