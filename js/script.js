
//requisação dos quizzes na api 
function DisplayQuizzes() {

    let quizzes = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/');
    quizzes.then(deucerto);
}
DisplayQuizzes();

//exibição de todos quizze na pag
function deucerto(answer) {

    let listaquizzes = document.querySelector(".quizz-list-api");
    let quizz = "";

    for (let i = 0; i < answer.data.length; i++) {
        quizz = answer.data[i];

        listaquizzes.innerHTML +=
            `<li class="img-quizz" onclick="saveId(${quizz.id})" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%),
                url(${quizz.image});
                background-size: 100%;">
                 <h2 class="title-quizz">${quizz.title}</h2>
            </li>`
    }
}

function saveId(salv) {

}


// Global Variables
let contadorScroll = 1;
let quizData;

//Funções comportamento de respostas - Início
function chooseAnswer() {
    const respostas = document.querySelectorAll(".option");
    respostas.forEach((resposta) => {
        resposta.addEventListener("click", function () {
            const parent = resposta.closest(".question-container")
            const userSelection = parent.querySelectorAll(".option");
            console.log("clique registrado");
            userSelection.forEach(element => {
                if (element !== resposta) {
                    element.classList.add("not-selected");
                }
                else {
                    element.classList.add("selected")
                }
            });
            setTimeout(scrollarProxima, 2000)
        });
    });
}

function scrollarProxima() {
    const autoScroll = document.querySelectorAll(".question-container");
    const endScreen = document.querySelector(".final-screen-container");

    if (contadorScroll < autoScroll.length) {
        autoScroll[contadorScroll].scrollIntoView({ block: "center", behavior: "smooth" });
        contadorScroll++
    }
    else {
        endQuiz()
        endScreen.classList.remove("hidden");
        endScreen.scrollIntoView({ block: "center", behavior: "smooth" });
        contadorScroll = 1;
    }
}
//Funções comportamento de respostas - Fim

function endQuiz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/2");
    promessa.then(function (target) {

        let arrayData = target.data;
        const endScreen = document.querySelector(".final-screen-container")
        const rightSelected = document.querySelectorAll(".right.selected");
        const rightOption = document.querySelectorAll(".right");

        let rightPerc = ((rightSelected.length / rightOption.length) * 100).toFixed(0);

        for (let z = 0; z < arrayData.levels.length; z++) {
            if (arrayData.levels[z].minValue > rightPerc) {
                console.log(rightPerc);
            }
            else {
                const endMessage = `<h2>${rightPerc}% de acerto: ${arrayData.levels[z].title}</h2>
                    <div>
                        <img src="${arrayData.levels[z].image}" alt="">
                        <p>${arrayData.levels[z].text}</p>
                    </div>`

                endScreen.innerHTML = endMessage;
            }
        }
    })
}
//Funções comportamento de respostas - Fim

//Funções para gerar o quiz e terminar Quiz - Início
function callQuiz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/2");
    promessa.then(function (target) {
        const selectedQuiz = document.querySelector(".selected-quiz");
        const mainContainer = document.querySelector(".main-container")
        const finalScreen = document.querySelector(".final-screen-container");
        quizData = target.data;
        selectedQuiz.innerHTML = `<section style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${quizData.image}) center" class="selected-quiz">
        <span>${quizData.title}</span>
        </section>`


        for (let i = 0; i < quizData.questions.length; i++) {

            const questionTitle = `<section class="question-container">
                <h2 style="background-color:${quizData.questions[i].color}">${quizData.questions[i].title}</h2>
                <ul></ul>
                </section>`
            mainContainer.innerHTML += questionTitle;
            let answersArray = quizData.questions[i].answers;
            const shuffledAnswers = answersArray.sort(() => Math.random() - 0.5)

            for (let x = 0; x < quizData.questions[i].answers.length; x++) {
                const uList = document.querySelector(".question-container:last-child ul");

                if (shuffledAnswers[x].isCorrectAnswer === true) {

                    const answerOption = `<li class="option right">
                            <img src="${shuffledAnswers[x].image}" alt="">
                            <span>${shuffledAnswers[x].text}</span>
                            </li>`
                    uList.innerHTML += answerOption;
                }
                else {

                    const answerOption = `<li class="option wrong">
                            <img src="${shuffledAnswers[x].image}" alt="">
                            <span>${shuffledAnswers[x].text}</span>
                            </li>`
                    uList.innerHTML += answerOption;
                }
            }
        }
        chooseAnswer()
    })
}

function endQuiz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/2");
    promessa.then(function (target) {

        let arrayData = target.data;
        const endScreen = document.querySelector(".final-screen-container")
        const rightSelected = document.querySelectorAll(".right.selected");
        const rightOption = document.querySelectorAll(".right");

        let rightPerc = ((rightSelected.length / rightOption.length) * 100).toFixed(0);

        for (let z = 0; z < arrayData.levels.length; z++) {
            if (arrayData.levels[z].minValue > rightPerc) {
                console.log(rightPerc);
            }
            else {
                const endMessage = `<h2>${rightPerc}% de acerto: ${arrayData.levels[z].title}</h2>
                    <div>
                        <img src="${arrayData.levels[z].image}" alt="">
                        <p>${arrayData.levels[z].text}</p>
                    </div>`

                endScreen.innerHTML = endMessage;
            }
        }
    })
}
//Funções para gerar e terminar Quiz - Fim


//Funções para reiniciar Quiz e voltar para HomePage - Início
function returnHome() {
    const quizOverlay = document.querySelector(".quiz-overlay");
    const resetQuiz = `
        <section class="selected-quiz">

        </section>

        <section class="main-container">
    
        </section>

        <section class="final-screen-container hidden">
        
        </section>

        <footer class="btn-container">
            <button class="redo-quiz">Reiniciar Quizz</button>
            <button class="return-btn">Voltar para Home</button>
        </footer>
        `
    quizOverlay.innerHTML = resetQuiz;
    quizOverlay.classList.add("hidden")
}
//Funções para reiniciar Quiz e voltar para HomePage - Fim

