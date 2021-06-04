// formatowanie zaznaczonego kodu : ctrl+k+f
// formatowanie doku w całym pliku : ctrl+k+d

const question = document.querySelector('#question');
// const answer1 = document.querySelector('#answer1');
// const answer2 = document.querySelector('#answer2');
// const answer3 = document.querySelector('#answer3');
// const answer4 = document.querySelector('#answer4');

// tworzymy funkcje, która ma za zadanie do zmiennych pobranych z html przypisać zmienne które otrzymaliśmy z backend w postaci odpowiedzi pod zmienna data!
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2');
function fillQuestionElements(data) {
    if (data.winner === true) {
        gameBoard.getElementsByClassName.display = 'none';
        h2.innerText = "wygrałeś"
        return;
    }
    if (data.looser === true) {
        gameBoard.getElementsByClassName.display = 'none';
        h2.innerText = "nie poszło Ci"
        return;
    }
    question.innerText = data.question;
    // answer1.innerText = data.answers[0];
    // answer2.innerText = data.answers[1];
    // answer3.innerText = data.answers[2];
    // answer4.innerText = data.answers[3];


    // i w pętli for in jest zmienna typu string dlatego jeśli chcemy jej użyć jakos int to musimy ją przekonwertować na tym number
    // pętla for in i - lement iterujący, szukamy in nasza tablica
    for (const i in data.answers) {
        const answerEl = document.querySelector(`#answer${Number(i) + 1}`);

        console.log("kncfe", answerEl)
        console.log("data-answ", data.answers)
        answerEl.innerText = data.answers[i];
    }

}

function showNextQuestion() {
    // metoda fetch - pobieranie danych(url, domyślna metoda get ale możemy wpisać inną )
    fetch('/question', {
        method: 'GET'
    }).then(r => r.json())
        .then(data => {
            console.log("dane z show next ques", data)
            fillQuestionElements(data);
        })
}

//  żeby uzyskać odpowiedz jeżeli używam fetch to muszę sobie tą odpowiedż rozkodować :  .then r => r.json(),   zmieniam json w obiekt js
showNextQuestion();

const goodAnswersSpan = document.querySelector('#good-answers')

function handleAnswerFeedback(data) {

    goodAnswersSpan.innerText = data.goodAnswers;
    showNextQuestion();
}

const buttons = document.querySelectorAll('button');
// pętla for of wykonuje się tyle razy ile jest elementów tablicy, ktora jest użyta 
for (const button of buttons) {
    button.addEventListener('click', (event) => {

        const answerIndex = event.target.dataset.answer;
        console.log('answer index to w pętli', answerIndex)
        sendAnswer(answerIndex);
    })
}

// odczytywanie danych wysłanych przez użytkownika 
function sendAnswer(answerIndex) {
    console.log("answer index to", answerIndex)
    fetch(`/answer/${answerIndex}`, {
        method: 'POST'
    }).then(r => r.json())
        .then(data => {
            console.log(data);
            handleAnswerFeedback(data);
        })
}


function callToAFriendUsed() {
    fetch('/help/friend', {
        method: 'GET'
    }).then(r => r.json())
        .then(data => {
            console.log('dane w callto friend', data);
            //jest błąd metotda do poprawy + zrobienie kolejnych 2 metod
        })
}
document.querySelector('#callToAFriend').addEventListener('click', callToAFriendUsed)