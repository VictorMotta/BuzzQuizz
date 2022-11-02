



//Funções comportamento de respostas
const respostas = document.querySelectorAll(".option");
respostas.forEach((resposta) => {
    resposta.addEventListener("click", function() {
        const userSelection = document.querySelectorAll(".option");
        console.log("clique registrado");
        userSelection.forEach(element=> {
            if(element !== resposta) {
                element.classList.add("not-selected");
                if(resposta.classList.contains("wrong")) {
                    resposta.classList.add("incorrect");
                }
                else {
                    resposta.classList.add("correct")
                }
            }
        })
    });
});

    //Adicionar not-selected class as opções não selecionadas
    //bloquear pointer events após o clique
    //scrollar para a proxima questão 2 segundos depois