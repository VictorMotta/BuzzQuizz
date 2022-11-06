//requisação dos quizzes na api
let listLocalStorage = [];

function DisplayQuizzes() {
    let quizzes = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/");
    quizzes.then(deucerto);
}
DisplayQuizzes();

//exibição de todos quizze na pag
function deucerto(answer) {
    console.log(answer.data);
    let listaquizzes = document.querySelector(".quizz-list-api");
    let quizz = answer.data;
    let meusquizzes = document.querySelector(".quizz-list");

    let objetoStorage = JSON.parse(localStorage.getItem("listaUsuario"));
    let listaIdStorage = [];

    if (objetoStorage != null) {
        for (let i = 0; i < objetoStorage.length; i++) {
            listaIdStorage.push(objetoStorage[i].id);

            meusquizzes.innerHTML += `<li id="${objetoStorage[i].id}" class="img-quizz" onclick="callQuiz(this.id); getQuizId(this.id)" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%),
            url(${objetoStorage[i].image});
            background-size: 100%;">
            <h2 class="title-quizz">${objetoStorage[i].title}</h2>
        </li>`;
        }
    }

    for (let i = 0; i < quizz.length; i++) {
        if (!RegExp(quizz[i].id).test(listaIdStorage)) {
            listaquizzes.innerHTML += `<li id="${quizz[i].id}" class="img-quizz" onclick="callQuiz(this.id); getQuizId(this.id)" style="background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 65.1%, #000000 100%),
                url(${quizz[i].image});
                background-size: 100%;">
                <h2 class="title-quizz">${quizz[i].title}</h2>
            </li>`;
        }
    }

    temQuizzes();
}

function getQuizId(e) {
    endID = e;
}

//DOM dos quizzes do usuario
function temQuizzes() {
    if (document.querySelector(".quizz-list").children[0] === undefined) {
        document.querySelector(".your-quizzes").classList.add("none");
    } else {
        document.querySelector(".your-quizz").classList.add("none");
    }
}

// Global Variables
let contadorScroll = 1;
let quizData;
let endID;

//Funções comportamento de respostas - Início
function chooseAnswer() {
    const respostas = document.querySelectorAll(".option");
    respostas.forEach((resposta) => {
        resposta.addEventListener("click", function () {
            const parent = resposta.closest(".question-container");
            const userSelection = parent.querySelectorAll(".option");
            console.log("clique registrado");
            userSelection.forEach((element) => {
                if (element !== resposta) {
                    element.classList.add("not-selected");
                } else {
                    element.classList.add("selected");
                }
            });
            setTimeout(scrollarProxima, 2000);
        });
    });
}

function scrollarProxima() {
    const autoScroll = document.querySelectorAll(".question-container");
    const endScreen = document.querySelector(".final-screen-container");

    if (contadorScroll < autoScroll.length) {
        autoScroll[contadorScroll].scrollIntoView({ block: "center", behavior: "smooth" });
        contadorScroll++;
    } else {
        endQuiz();
        endScreen.classList.remove("hidden");
        endScreen.scrollIntoView({ block: "center", behavior: "smooth" });
        contadorScroll = 1;
    }
}
//Funções comportamento de respostas - Fim

//Funções para gerar o quiz e terminar Quiz - Início
function callQuiz(thisID) {
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${thisID}`);
    promessa.then(function (target) {
        const home = document.querySelector(".containerPg1");
        const quizOverlay = document.querySelector(".quiz-overlay");
        const selectedQuiz = document.querySelector(".selected-quiz");
        const mainContainer = document.querySelector(".main-container");
        quizData = target.data;

        home.classList.add("hidden");
        quizOverlay.classList.remove("hidden");
        selectedQuiz.scrollIntoView();

        selectedQuiz.innerHTML = `<section style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${quizData.image}) center" class="selected-quiz">
        <span>${quizData.title}</span>
        </section>`;

        for (let i = 0; i < quizData.questions.length; i++) {
            const questionTitle = `<section class="question-container">
                <h2 style="background-color:${quizData.questions[i].color}">${quizData.questions[i].title}</h2>
                <ul></ul>
                </section>`;
            mainContainer.innerHTML += questionTitle;
            let answersArray = quizData.questions[i].answers;
            const shuffledAnswers = answersArray.sort(() => Math.random() - 0.5);

            for (let x = 0; x < quizData.questions[i].answers.length; x++) {
                const uList = document.querySelector(".question-container:last-child ul");

                if (shuffledAnswers[x].isCorrectAnswer === true) {
                    const answerOption = `<li class="option right">
                            <img src="${shuffledAnswers[x].image}" alt="">
                            <span>${shuffledAnswers[x].text}</span>
                            </li>`;
                    uList.innerHTML += answerOption;
                } else {
                    const answerOption = `<li class="option wrong">
                            <img src="${shuffledAnswers[x].image}" alt="">
                            <span>${shuffledAnswers[x].text}</span>
                            </li>`;
                    uList.innerHTML += answerOption;
                }
            }
        }
        chooseAnswer();
    });
}

function endQuiz() {
    const promessa = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${endID}`);
    promessa.then(function (target) {
        let arrayData = target.data;
        const endScreen = document.querySelector(".final-screen-container");
        const rightSelected = document.querySelectorAll(".right.selected");
        const rightOption = document.querySelectorAll(".right");

        let rightPerc = ((rightSelected.length / rightOption.length) * 100).toFixed(0);

        for (let z = 0; z < arrayData.levels.length; z++) {
            if (arrayData.levels[z].minValue > rightPerc) {
                console.log(rightPerc);
            } else {
                const endMessage = `<h2>${rightPerc}% de acerto: ${arrayData.levels[z].title}</h2>
                    <div>
                        <img src="${arrayData.levels[z].image}" alt="">
                        <p>${arrayData.levels[z].text}</p>
                    </div>`;

                endScreen.innerHTML = endMessage;
            }
        }
    });
}
//Funções para gerar e terminar Quiz - Fim

//Funções para reiniciar Quiz e voltar para HomePage - Início
function returnHome() {
    const quizOverlay = document.querySelector(".quiz-overlay");
    const home = document.querySelector(".containerPg1");
    const resetQuiz = `
        <section class="selected-quiz">

        </section>

        <section class="main-container">
    
        </section>

        <section class="final-screen-container hidden">
        
        </section>

        <footer class="btn-container">
            <button class="redo-quiz">Reiniciar Quizz</button>
            <button onclick="returnHome()" class="return-btn">Voltar para Home</button>
        </footer>
        `;
    quizOverlay.innerHTML = resetQuiz;
    quizOverlay.classList.add("hidden");
    home.classList.remove("hidden");
    home.scrollIntoView({ block: "start" });
}
//Funções para reiniciar Quiz e voltar para HomePage - Fim

// Função para iniciar o quizz assim que acabar o cadastro.
function acessarQuizzCadastro() {
    console.log(localStorage.getItem(`quizzAcessar`));
    localStorage.getItem(`quizzAcessar`);
    if (
        localStorage.getItem(`quizzAcessar`) === null ||
        localStorage.getItem(`quizzAcessar`) === "undefined"
    ) {
        console.log("entrou!");
        localStorage.removeItem("quizzAcessar");
        return;
    } else {
        let idAcessarQuizz = JSON.parse(localStorage.getItem(`quizzAcessar`));
        endID = idAcessarQuizz;
        callQuiz(idAcessarQuizz);
        localStorage.removeItem("quizzAcessar");
    }
}

acessarQuizzCadastro();
