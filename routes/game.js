function gameRoutes(app) {
    let goodAnswers = 0;
    let isGameOver = false;
    let callToAFriendUsed = false;
    let questionToTheCrowdUsed = false;
    let halfOnHalfUsed = false;
    const questions = [
        {
            question: 'jaki jest najlepszy jezyk programowania?',
            answers: ['c++', 'fortran', 'javaScript', 'java'],
            correctAnswer: 2,
        },
        {
            question: 'czy kurs jest ok?',
            answers: ['nie wiem', 'foczywiscie ze tak', 'nie', 'jest najlepszy'],
            correctAnswer: 3,
        },
        {
            question: 'czy chcesz zjesc pizze?',
            answers: ['nawet 2 ', 'jestem na diecie', 'nie, dziekuje', 'wolę frytki'],
            correctAnswer: 0,
        },
    ];


    //pobieram pytanie z backend
    app.get('/question', (req, res) => {
        if (goodAnswers === questions.length) {
            res.json({
                winner: true,
            })
        } else if (isGameOver) {
            res.json({
                looser: true,
            })
        } else {
            // nextquestion to zmienna która przechowuje obiekty z tablicy questions, przechowuje pojedyńczy obiekt a dokładnie ten który jest po koleji, czyli najpierw jest obiekt od index 0 bo nie ma jeszce odpoeiwedzi, a jak jest już 1 poprawna odpowiedziedz to mamy obiekt od indexu 1 itd.
            const nextQuestion = questions[goodAnswers];
            // filtrowanie obiektu = destrukturyzacja obiektu oryginalnego , wyłowienie tylko tych informacji, które chcemy przekazać użytkownikowi gry
            const { question, answers } = nextQuestion;

            res.json({
                question, answers,
            });
        }
    });

    // w bekendzie opragromywujemy to co ma się zdarzyć po kliknięciu w odpowiedz przez użytkownika 
    app.post('/answer/:index', (req, res) => {
        if (isGameOver) res.json({
            looser: true
        })
        // w req.params znajdują się informacje , które backend otrzymuje od użytkownika
        const { index } = req.params;
        // pobieranie aktualnego pytania 
        const question = questions[goodAnswers];
        // index jest stringiem, dlatego aby móc porównać go z question.correctAnswer to musimy go wczesniej skonwertowac
        console.log(question.correctAnswer === Number(index));

        // res.json({
        //     correct: question.correctAnswer === Number(index) ? true : false
        // })
        const isGoodAnswer = question.correctAnswer === Number(index);
        if (isGoodAnswer) {
            goodAnswers++;
        } else {
            isGameOver = true;
        }

        res.json({
            correct: isGoodAnswer,
            goodAnswer,
        })

    });


    app.get('/help/friend', (req, res) => {
        if (callToAFriendUsed) {
            return res.json({
                text: 'to koło ratunkowe było już wykorzystane'
            })
        }
        callToAFriendUsed = true;
        const doesFriendKnowAnswer = math.random() < 0.5;
        const question = questions[goodAnswers];
        res.json({
            text: doesFriendKnowAnswer ? `hymm, wydaje mi się, że odpowiedź to ${question.answers[question.correctAnswer]}` : `hym, no nie wiem `
        })
    })

}

module.exports = gameRoutes;