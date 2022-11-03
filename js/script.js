// Global Variables
let contadorScroll = 1;

//Funções comportamento de respostas - Início

    //Adicionar not-selected class as opções não selecionadas
    //bloquear pointer events após o clique
    //scrollar para a proxima questão 2 segundos depois
const respostas = document.querySelectorAll(".option");
respostas.forEach((resposta) => {
    resposta.addEventListener("click", function() {
        const userSelection = document.querySelectorAll(".option");
        console.log("clique registrado");
        userSelection.forEach(element=> {
            if(element !== resposta) {
                element.classList.add("not-selected");                          
            }
        });
        certoErrado()
        setTimeout(scrollarProxima, 2000)
    });
});

function certoErrado() {
    const respostas = document.querySelectorAll(".option");
    
    respostas.forEach((resposta) => {
        for(let i = 0; i < respostas.length; i++) {
            if(resposta.classList.contains("wrong") && !resposta.classList.contains("incorrect")) {
                resposta.classList.add("incorrect");
            }
            else {
                resposta.classList.add("correct");
            }
        }  
    })
};

function scrollarProxima() {
    const autoScroll = document.querySelectorAll(".question-container");
    autoScroll[contadorScroll].scrollIntoView({block: "center"})
    contadorScroll++
}
//Funções comportamento de respostas - Fim

    //Adicionar not-selected class as opções não selecionadas
    //bloquear pointer events após o clique
    //scrollar para a proxima questão 2 segundos depois