const btnStart = document.querySelector('.btn-start')
const rules = document.querySelector('.rules')
const rulesBtns = rules.querySelectorAll('button')
const questionContainer = document.querySelector('.question-answer--container')
const score = document.querySelector('.score')
let timerNum = score.querySelector('.timer-num')
let pagination = score.querySelector('.pagination')
let heading = score.querySelector('.content-heading')
let btnExit = score.querySelector('.btn-exit')
let btnContinue = score.querySelector('.btn-continue')

let currentQuestion = 1;
const questionTimer = 10;
const totalNumOfQuestion = question.length;
let totalMark = 0;
let questionAnswered = false;
let numOfQuestionAnswered = 0;
rulesBtns.forEach(ruleBtn => {
    ruleBtn.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-exit')) {
            hideElement([rules])
            showElement([btnStart])
        } else if (e.target.classList.contains('btn-continue')) {
            hideElement([rules])
            reset()
            startTimer()
        }
    })
})

function getQuestionAnswered() {
    return questionAnswered;
}

function setQuestionAnswered(answer) {
    questionAnswered = answer;
}
btnStart.addEventListener('click', (e) => {
    hideElement([btnStart])
    showElement([rules])
})
btnExit.addEventListener('click', (e) => {
    hideElement([score])
    showElement([btnStart])
})
btnContinue.addEventListener('click', (e) => {
    restart()
})

function restart() {
    hideElement([score])
    reset()
    startTimer()
}

function reset() {
    currentQuestion = 1;
    totalMark = 0;
    questionAnswered = false;
    numOfQuestionAnswered = 0;
}

function startTimer() {
    let count = 0;
    let interval = setInterval(() => {
        showElement([questionContainer])
        displayQuestion(currentQuestion - 1, count, interval)
        count++;
        if (count == questionTimer) {
            stopInterval(interval);
            nextQuestion();
        }
    }, 1000)
}

function nextQuestion() {
    if (!lastQuestion()) {
        currentQuestion++;
        setQuestionAnswered(false);
        startTimer()
    } else {
        hideElement([questionContainer])
        showElement([score])
        timerNum.innerHTML = getTotalMark();
        pagination.innerHTML = `you have answered ${getNumOfQuestionAnswered()} out of ${totalNumOfQuestion} question`
        if (getTotalMark() > (totalNumOfQuestion / 2)) {
            heading.innerHTML = `Congratulations!!! you have made it. This is your final score`
            heading.style.color = "green"
        } else if (getTotalMark() == (totalNumOfQuestion / 2)) {
            heading.innerHTML = `Tried but needs improvement. This is your final score`
            heading.style.color = "yellow"
        } else {
            heading.innerHTML = `Mark very poor. This is your final score`
            heading.style.color = "red"
        }
    }
}

function stopInterval(interval) {
    clearInterval(interval)
}

function displayQuestion(currentQuestion, count, interval) {
    let html = `
        <div class="question-top">
            <h3 class="content-heading rules-heading">This are some rules about the quiz</h3>
            <div class="timer">
                <p class="timer-txt">Time left</p>
                <span class="timer-num">${count}</span>
            </div>
        </div>
        <h3 class="content-heading question">${currentQuestion + 1}. ${question[currentQuestion].q}</h3>
        <ul class="list option">
            <li data-index="0" class="list-item option-item">${question[currentQuestion].options[0]}</li>
            <li data-index="1" class="list-item option-item">${question[currentQuestion].options[1]}</li>
            <li data-index="2" class="list-item option-item">${question[currentQuestion].options[2]}</li>
            <li data-index="3" class="list-item option-item">${question[currentQuestion].options[3]}</li>
        </ul>
        <div class="btn-exit-continue--container">
            <span class="pagination">${currentQuestion + 1} of 5</span>
            <button class="btn btn-next hidden">Next</button>
        </div>
    `
    questionContainer.innerHTML = html;
    let options = questionContainer.querySelectorAll('.option-item')
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            stopInterval(interval)
            answered(e.target)
        })
    })
}

function answered(el) {
    if (getQuestionAnswered()) {
        alert("question already answered please proceed to the next question")
    } else {
        numOfQuestionAnswered++;
        setQuestionAnswered(true);
        if (isCorrect(el)) {
            addMark();
        }
        disabledOptions(el);
    }
}

function addMark() {
    totalMark++;
}

function getTotalMark() {
    return totalMark;
}

function getNumOfQuestionAnswered() {
    return numOfQuestionAnswered;
}

function isCorrect(el) {
    return el.dataset.index == question[currentQuestion - 1].correctAnsIndx;
}

function disabledOptions(el) {
    let elParent = el.parentElement;
    children = elParent.querySelectorAll('.option-item')
    children.forEach(child => {
        child.style.cursor = "auto";
    })
    if (isCorrect(el)) {
        displayCorrectEl(el)
    } else {
        displayWrongEl(el)
        displayCorrectEl(children[question[currentQuestion - 1].correctAnsIndx])
    }
    let btnNext = elParent.parentElement.lastElementChild.querySelector('.btn-next')
    btnNext.addEventListener('click', () => {
        nextQuestion();
    })
    showElement([btnNext])
}

function removeCorrectOrWrongEl(el) {
    if (isCorrect(el)) {
        removeCorrectEl(el);
    } else {
        removWrongEl(el);
        removeCorrectEl(el)
    }
}

function removeCorrectEl(el) {

}

function removWrongEl() {

}

function displayCorrectEl(el) {
    el.innerHTML += `<span class="correct-opt--icon"><<</span>`
    el.classList.add('correct-opt')
}

function displayWrongEl(el) {
    el.innerHTML += `<span class="wrong-opt--icon">X</span>`
    el.classList.add('wrong-opt')
}

function lastQuestion() {
    return currentQuestion == totalNumOfQuestion;
}

function hideElement(elements) {
    elements.forEach(el => {
        el.classList.add('hidden')
    })
}

function showElement(elements) {
    elements.forEach(el => {
        el.classList.remove('hidden')
    })
}