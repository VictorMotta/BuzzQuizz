// Global Variables
let contadorScroll = 1;
let quizData;

//Funções comportamento de respostas - Início

//Adicionar not-selected class as opções não selecionadas
//bloquear pointer events após o clique
//scrollar para a proxima questão 2 segundos depois
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

function scrollarProxima() {
    const autoScroll = document.querySelectorAll(".question-container");
    const endScreen = document.querySelector(".final-screen-container");

    if (contadorScroll < autoScroll.length) {
        autoScroll[contadorScroll].scrollIntoView({ block: "center", behavior: "smooth" })
        contadorScroll++
    }
    else {
        endScreen.classList.remove("hidden");
        endScreen.scrollIntoView({ block: "center", behavior: "smooth" })
        contadorScroll = 1;
    }
}
//Funções comportamento de respostas - Fim

//Funções para gerar o quiz - Início

function callQuiz() {
    const promessa = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/16587");
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

            for (let x = 0; x < quizData.questions[i].answers.length; x++) {
                const uList = document.querySelector(".question-container:last-child ul");

                if (quizData.questions[i].answers[x].isCorrectAnswer === true) {

                    const answerOption = `<li class="option right">
                            <img src="${quizData.questions[i].answers[x].image}" alt="">
                            <span>${quizData.questions[i].answers[x].text}</span>
                            </li>`
                    uList.innerHTML += answerOption;
                }
                else {

                    const answerOption = `<li class="option wrong">
                            <img src="${quizData.questions[i].answers[x].image}" alt="">
                            <span>${quizData.questions[i].answers[x].text}</span>
                            </li>`
                    uList.innerHTML += answerOption;
                }
            }
        }
    })
}

const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/16587")
promisse.then(function (target) {
    console.log(target.data)
})

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


