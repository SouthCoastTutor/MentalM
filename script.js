let timerInterval;
let problemTimeout;
let testStarted = false; // Keeps track of whether the test has started
let score = 0; // Variable to keep track of the score

function startTimer() {
    let timeLeft = 120; // 2 minutes
    let timerElement = document.getElementById('timer');

    timerInterval = setInterval(function() {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            document.getElementById('answer').disabled = true;
            document.getElementById('checkButton').disabled = true;
            calculateScore(); // Calculate the score at the end of the test
        } else {
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            // Pad single-digit seconds with a leading zero
            seconds = seconds < 10 ? '0' + seconds : seconds;
            timerElement.textContent = `Time left: ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timerInterval); // Clear any existing timer intervals
    clearTimeout(problemTimeout); // Clear any existing problem timeouts
    score = 0; // Reset the score to 0
    testStarted = false; // Reset the testStarted flag
    startTest(); // Start the game again
}

function startTest() {
    if (!testStarted) {
        testStarted = true;
        startTimer();
        generateProblem();
        document.getElementById('answer').focus(); // Automatically set focus to the answer input box
    }
}

function generateProblem() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operation = Math.floor(Math.random() * 3); // 0 for addition, 1 for subtraction, 2 for multiplication

    let operator, expectedAnswer;

    switch(operation) {
        case 0:
            operator = '+';
            expectedAnswer = num1 + num2;
            break;
        case 1:
            operator = '-';
            expectedAnswer = num1 - num2;
            break;
        case 2:
            operator = '*';
            expectedAnswer = num1 * num2;
            break;
    }

    document.getElementById('problem').textContent = `${num1} ${operator} ${num2} =`;
    document.getElementById('answer').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('expectedAnswer').value = expectedAnswer;

    problemTimeout = setTimeout(function() {
        generateProblem();
    }, 6000); // Reduced from 5000 to 4000 milliseconds (4 seconds)
}

function checkAnswer() {
    let answer = document.getElementById('answer').value;
    let expectedAnswer = document.getElementById('expectedAnswer').value;

    if (parseInt(answer) === parseInt(expectedAnswer)) {
        document.getElementById('result').textContent = 'Correct!';
        score++;
    } else {
        document.getElementById('result').textContent = 'Incorrect. Try again!';
    }

    clearTimeout(problemTimeout);

    // Check if the timer has reached zero
    if (document.getElementById('timer').textContent !== 'Time left: 0m 0s') {
        generateProblem();
    }
}

function calculateScore() {
    document.getElementById('result').textContent = `Test is over. Your score is ${score} correct answers.`;
}

document.getElementById('answer').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});
