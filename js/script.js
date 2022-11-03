// Global Variables
let contadorScroll = 1;

//Funções comportamento de respostas - Início

    //Adicionar not-selected class as opções não selecionadas
    //bloquear pointer events após o clique
    //scrollar para a proxima questão 2 segundos depois
const respostas = document.querySelectorAll(".option");
respostas.forEach((resposta) => {
    resposta.addEventListener("click", function() {
        const parent = resposta.closest(".question-container")
        const userSelection = parent.querySelectorAll(".option");
        console.log("clique registrado");
        userSelection.forEach(element => {
            if(element !== resposta) {
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

    if(contadorScroll < autoScroll.length) {
        autoScroll[contadorScroll].scrollIntoView({block: "center", behavior: "smooth"})
        contadorScroll++ 
    }
    else {
        endScreen.classList.remove("hidden");
        endScreen.scrollIntoView({block: "center", behavior: "smooth"}) 
        contadorScroll = 1;
    }
}
//Funções comportamento de respostas - Fim

    //Adicionar not-selected class as opções não selecionadas
    //bloquear pointer events após o clique
    //scrollar para a proxima questão 2 segundos depois