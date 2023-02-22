// variables to store the button elements
var startButton = document.getElementById("start-button")
var submitButton = document.getElementById("submit-button")
var resetButton = document.getElementById("reset-button")
var highScores = document.getElementById("high-scores")
var timer = document.querySelector(".timeDisplay")

// array of questions, options and correct answer
var quizQuestions = [
    {
        question: "Commonly used data types do not include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with _____.",
        options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "parenthesis"

    },
    {
        question: "Arrays in javaScript can be used to store _____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within ______when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"

    }
]

var timeleft = 75;
var scores = 0;
var questionIndex = 0;
var timeInterval;

// Only add listener if the button exists
if (startButton) {
    startButton.addEventListener("click", startQuiz)
}

//Starts the quiz
function startQuiz() {
    // hide the start button and main page, and show the quiz container
    startButton.style.display = "none"
    document.getElementById("main-page").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    // run the timer
    timeInterval = setInterval(function () {
        timeleft--;
        timer.textContent = timeleft;
        if (timeleft <= 0) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);

    //show next question
    showQuestion()
}

// Define the function to end the quiz
function endQuiz() {
    clearInterval(timeInterval);
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("scorecontainer").style.display = "block";
    document.getElementById("final-score").textContent = scores;
}


// Shows the question on the quiz container
function showQuestion() {
    // display the question on the index
    document.getElementById("question").textContent = quizQuestions[questionIndex].question;
    var optionList = quizQuestions[questionIndex].options;

    // for loop to display answer options of the question
    for (var i = 0; i < optionList.length; i++) {
        var buttonOptions = document.createElement("button");
        buttonOptions.className = "button-style";
        buttonOptions.value = optionList[i];
        buttonOptions.textContent = i + 1 + ". " + optionList[i];
        // Add listener to the button to check the amswer
        buttonOptions.addEventListener("click", event => {
            var button = event.target;
            //check if the answer is correct
            if (button.value === quizQuestions[questionIndex].correctAnswer) {
                scores = scores + 10;
                document.getElementById("response").textContent = "Correct!";
            }
            else {
                timeleft = timeleft - 10;
                document.getElementById("response").textContent = "Wrong!";
            }

            questionIndex++;
            document.getElementById("question").innerHTML = ""
            document.getElementById("options").innerHTML = ""

            // If there are quesitons remaining, then show the question
            if (questionIndex < quizQuestions.length) {
                showQuestion();
            }
            //else end the quiz
            else {
                endQuiz();
            }
        })

        document.getElementById("options").appendChild(buttonOptions)
    }
}

// Shows the high scores
function showHighScores() {
    var scoreList = document.getElementById("scoreList");
    scoreList.innerHTML = "";
    var scores = JSON.parse(localStorage.getItem("highScores")) ?? [];
    // Sort the high scores in descending order
    scores.sort(function (a, b) {
        return b.scores - a.scores;
    });

    for (let i = 0; i < scores.length; i++) {
        var row = document.createElement('li');
        row.textContent = scores[i].userInitials + " - " + scores[i].scores;
        scoreList.appendChild(row)
    }

}

// Only add listener if the button exists
if (submitButton) {
    // Adds listener to save the score to local storage 
    submitButton.addEventListener("click", function () {
        var userInitials = document.getElementById("userInitials").value.trim().toUpperCase();
        if (userInitials === "") {
            return;
        }
        var highScores = JSON.parse(localStorage.getItem("highScores")) ?? [];
        var newScore = { userInitials, scores };
        highScores.push(newScore);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        window.location.href = "highscores.html";
    })
}


// If the highscores page open, show the high score
if (window.location.pathname === "/highscores.html") {
    showHighScores();
}

// Only add listener if the button exists
if (resetButton) {
    resetButton.addEventListener("click", function () {
        localStorage.removeItem("highScores");
        showHighScores();
    })
}













