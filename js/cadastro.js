let tituloCriadoQuizz, urlCriadoQuizz, qtdPerguntasCriadasTotais, qtdNiveisCriadosTotais;
let questions = [],
    levels = [];

let verificacaoAcertoMinimo = [];

let boleanTituloQuizzInfoBasic = false,
    boleanUrlQuizzInfoBasic = false,
    boleanQtdPerguntasQuizzInfoBasic = false,
    boleanQtdNiveisQuizzInfoBasic = false;

let prosseguir = true;

function prosseguirCriarPergunta() {
    const containerHiddenInfoBasic = document.querySelector(".container-hidden-cria-info-basic");
    const containerHiddenCriaPerguntas = document.querySelector(
        ".container-hidden-cria-perguntas-resposta"
    );

    testaInputsCriaInfoBuzz();

    if (
        boleanTituloQuizzInfoBasic &&
        boleanUrlQuizzInfoBasic &&
        boleanQtdPerguntasQuizzInfoBasic &&
        boleanQtdNiveisQuizzInfoBasic
    ) {
        console.log(qtdPerguntasCriadasTotais);
        adicionaQtdPerguntas();
        containerHiddenInfoBasic.classList.add("hidden");
        containerHiddenCriaPerguntas.classList.remove("hidden");
    }
}
// Inicio Primeira Tela 3.1
// Essa função verifica se o link é de uma imagem mesmo

function testaInputsCriaInfoBuzz() {
    const inputTituloQuizzInfoBasic = document.querySelector("#titulo-info-basic");
    const inputUrlQuizzInfoBasic = document.querySelector("#url-info-basic");
    const qtdPerguntasQuizzInfoBasic = document.querySelector("#qtd-perguntas-info-basic");
    const qtdPerguntasNumber = parseInt(qtdPerguntasQuizzInfoBasic.value);
    const qtdNiveisQuizzInfoBasic = document.querySelector("#qtd-niveis-info-basic");
    const qtdNiveisNumber = parseInt(qtdNiveisQuizzInfoBasic.value);

    // Condição Titulo do Quizz

    if (
        inputTituloQuizzInfoBasic.value.length > inputTituloQuizzInfoBasic.minLength &&
        inputTituloQuizzInfoBasic.value.length < inputTituloQuizzInfoBasic.maxLength
    ) {
        tituloCriadoQuizz = inputTituloQuizzInfoBasic.value;
        boleanTituloQuizzInfoBasic = true;
        inputTituloQuizzInfoBasic.style.border = "1px solid #d1d1d1";
    } else {
        if (inputTituloQuizzInfoBasic.value.length < inputTituloQuizzInfoBasic.minLength) {
            alert("Digite mais de 20 caracteres no Título!");
        }
        inputTituloQuizzInfoBasic.style.border = "1px solid red";
        boleanTituloQuizzInfoBasic = false;
    }

    // Condição Imagem do Quizz

    if (inputUrlQuizzInfoBasic.value === "") {
        inputUrlQuizzInfoBasic.style.border = "1px solid #d1d1d1";
        alert("Digite alguma coisa no url!");
        inputUrlQuizzInfoBasic.style.border = "1px solid red";
    } else {
        try {
            let url = new URL(inputUrlQuizzInfoBasic.value);
            console.log("Valid URL!");
            urlCriadoQuizz = inputUrlQuizzInfoBasic.value;
            boleanUrlQuizzInfoBasic = true;
        } catch (err) {
            console.log("Invalid URL!");
            alert("Tente digite com http:// no início");
            inputUrlQuizzInfoBasic.style.border = "1px solid red";
            boleanUrlQuizzInfoBasic = false;
        }
    }

    // Condição de qtdPerguntas

    if (!Number.isInteger(qtdPerguntasNumber)) {
        alert("Apenas digite números no campo de quantidades das perguntas!");
        qtdPerguntasQuizzInfoBasic.style.border = "1px solid red";
        boleanQtdPerguntasQuizzInfoBasic = false;
    } else {
        if (qtdPerguntasNumber >= 3) {
            qtdPerguntasCriadasTotais = qtdPerguntasNumber;

            boleanQtdPerguntasQuizzInfoBasic = true;
            qtdPerguntasQuizzInfoBasic.style.border = "1px solid #d1d1d1";
        } else {
            qtdPerguntasQuizzInfoBasic.style.border = "1px solid red";
            alert("Pode apenas mais de 3 perguntas!");
            boleanQtdPerguntasQuizzInfoBasic = false;
        }
    }

    // Condição de qtd Niveis

    if (!Number.isInteger(qtdNiveisNumber)) {
        alert("Apenas digite números no campo de quantidades dos níveis!");
        qtdNiveisQuizzInfoBasic.style.border = "1px solid red";
        boleanQtdNiveisQuizzInfoBasic = false;
    } else {
        if (qtdNiveisNumber >= 2) {
            qtdNiveisCriadosTotais = qtdNiveisNumber;
            boleanQtdNiveisQuizzInfoBasic = true;
            qtdNiveisQuizzInfoBasic.style.border = "1px solid #d1d1d1";
        } else {
            qtdNiveisQuizzInfoBasic.style.border = "1px solid red";
            alert("Pode apenas mais de 2 níveis!");
            boleanQtdNiveisQuizzInfoBasic = false;
        }
    }
}
// Fim Primeira Tela 3.1
// Inicio segunda Tela 3.2

function adicionaQtdPerguntas() {
    const containerQtdPerguntar = document.querySelector(".qtd-perguntas-criar");
    containerQtdPerguntar.innerHTML = `
    <div class="container-cria-pergunta">
        <div class="menu-hidden-pergunta">
            <h2>Pergunta 1</h2>
        </div>
        <div class="container-mostra-cria-perguntas">
            <div class="pergunta">
                <input minlength="20" class="texto-pergunta" type="text" placeholder="Texto da Pegunta" />
                <input
                    class="cor-fundo-pergunta"
                    type="text"
                    maxlength="7"
                    placeholder="Cor de fundo da pergunta"
                />
            </div>
            <div class="resposta-correta">
                <h2>Resposta correta</h2>
                <input class="input-resposta-correta" type="text" placeholder="Resposta Correta" />
                <input class="img-resposta-correta" type="text" placeholder="URL da imagem" />
            </div>
            <div class="respostas-incorretas">
                <h2>Respostas incorretas</h2>
                <div class="respota-incorreta-input">
                    <input class="resposta-incorreta" type="text" placeholder="Resposta incorreta 1" />
                    <input class="img-resposta-incorreta" type="text" placeholder="URL da imagem 1" />
                </div>
                <div class="respota-incorreta-input">
                    <input class="resposta-incorreta" type="text" placeholder="Resposta incorreta 2" />
                    <input class="img-resposta-incorreta" type="text" placeholder="URL da imagem 2" />
                </div>
                <div class="respota-incorreta-input">
                    <input class="resposta-incorreta" type="text" placeholder="Resposta incorreta 3" />
                    <input class="img-resposta-incorreta" type="text" placeholder="URL da imagem 3" />
                </div>
            </div>
        </div>
    </div>
    `;
    for (let i = 1; i < qtdPerguntasCriadasTotais; i++) {
        let qtdPergunta = i + 1;
        containerQtdPerguntar.innerHTML += `
        <div class="container-cria-pergunta">
            <div class="menu-hidden-pergunta">
                <h2>Pergunta ${qtdPergunta}</h2>
                <img onclick="abrirPergunta(this)" src="../img/button-mostra-cria-pergunta.svg" alt="" />
            </div>
            <div class="container-mostra-cria-perguntas">
                <div class="pergunta">
                    <input minlength="20" class="texto-pergunta" type="text" placeholder="Texto da Pegunta" />
                    <input
                        class="cor-fundo-pergunta"
                        type="text"
                        maxlength="7"
                        placeholder="Cor de fundo da pergunta"
                    />
                </div>
                <div class="resposta-correta">
                    <h2>Resposta correta</h2>
                    <input class="input-resposta-correta" type="text" placeholder="Resposta Correta" />
                    <input class="img-resposta-correta" type="text" placeholder="URL da imagem" />
                </div>
                <div class="respostas-incorretas">
                    <h2>Respostas incorretas</h2>
                    <div class="respota-incorreta-input">
                        <input class="resposta-incorreta" type="text" placeholder="Resposta incorreta 1" />
                        <input class="img-resposta-incorreta" type="text" placeholder="URL da imagem 1" />
                    </div>
                    <div class="respota-incorreta-input">
                        <input class="resposta-incorreta" type="text" placeholder="Resposta incorreta 2" />
                        <input class="img-resposta-incorreta" type="text" placeholder="URL da imagem 2" />
                    </div>
                    <div class="respota-incorreta-input">
                        <input class="resposta-incorreta" type="text" placeholder="Resposta incorreta 3" />
                        <input class="img-resposta-incorreta" type="text" placeholder="URL da imagem 3" />
                    </div>
                </div>
            </div>
        </div>
    `;
    }
}

// Algo apenas visual
function abrirPergunta(elemento) {
    const containerCriaPergunta = elemento.parentNode.parentNode;
    const tiraHidden = containerCriaPergunta.querySelector(".container-mostra-cria-perguntas");

    tiraHidden.classList.toggle("hidden");
}

// Função para enviar e prosseguir com as peguntas

function prosseguirCriaNiveis(elemento) {
    prosseguir = true;
    questions = [];
    const allContainerCriaPergunta = document.querySelectorAll(".container-cria-pergunta");
    const containerHiddenCriaPerguntas = elemento.parentNode.parentNode;
    const containerHiddenCriaNiveis = document.querySelector(
        ".container-hidden-escolhe-nivel-quizz"
    );

    for (let i = 0; i < allContainerCriaPergunta.length; i++) {
        let objectProsseguir = testaInputsCriaPerguntasBuzz(allContainerCriaPergunta[i]);
        questions.push(objectProsseguir);
    }
    console.log(questions);

    if (prosseguir) {
        containerHiddenCriaPerguntas.classList.add("hidden");
        containerHiddenCriaNiveis.classList.remove("hidden");
    } else {
        alert("Conserte as áreas em vermelho! ");
    }
}

// função testando perguntas funcionais

function testaInputsCriaPerguntasBuzz(elemento) {
    let verificaTitulo = false,
        verificaCorFundo = false,
        verificaRespostaCorreta = false,
        verificaImgRespostaCorreta = false,
        verificaRespostaIncorreta1 = false,
        verificaImgRespostaIncorreta1 = false,
        verificaRespImgIncorreta2 = true,
        verificaRespImgIncorreta3 = true;

    const hexadecimal = /^#[0-9a-fA-F]{6}$/i;

    const qualPergunta = elemento.querySelector(".menu-hidden-pergunta h2").innerHTML;
    const perguntaInput = elemento.querySelector(".texto-pergunta");
    const corPergunta = elemento.querySelector(".cor-fundo-pergunta");
    const respostaCorretaInput = elemento.querySelector(".input-resposta-correta");
    const imagemRespostaCorretaInput = elemento.querySelector(".img-resposta-correta");
    const respostasIncorretaInputsList = elemento.querySelectorAll(".resposta-incorreta");
    const imagemRespostasIncorretaInputsList = elemento.querySelectorAll(".img-resposta-incorreta");

    // Verificando Título
    if (perguntaInput.value.length > perguntaInput.minLength) {
        perguntaInput.style.border = "1px solid #d1d1d1";
        console.log("Titulo digitado corretamente!");
        verificaTitulo = true;
    } else {
        alert(`A ${qualPergunta} deve ter mais de 20 caracteres! Corrija-a! `);
        perguntaInput.style.border = "1px solid red";
        verificaTitulo = false;
    }

    // Verifica cor de fundo
    if (corPergunta.value.length != 7) {
        corPergunta.style.border = "1px solid red";
        alert(`Coloque apenas um total de 7 caracteres! Corrija a ${qualPergunta}`);
        verificaCorFundo = false;
    } else {
        if (!hexadecimal.test(corPergunta.value)) {
            corPergunta.style.border = "1px solid red";
            alert(
                `Tente colocar apenas cores hexadecimais com total de 7 caracteres e com # no início! Corrija a ${qualPergunta}`
            );

            verificaCorFundo = false;
        } else {
            corPergunta.style.border = "1px solid #d1d1d1";
            console.log("Cor digitada correta!");
            verificaCorFundo = true;
        }
    }

    // Verifica resposta correta

    if (respostaCorretaInput.value === "" || respostaCorretaInput.value === " ") {
        respostaCorretaInput.style.border = "1px solid red";
        alert(
            `Digite alguma coisa! Não pode ser vazio o campo de resposta correta! Corrija na ${qualPergunta}`
        );
        verificaRespostaCorreta = false;
    } else {
        respostaCorretaInput.style.border = "1px solid #d1d1d1";
        console.log("Resposta correta digitada corretamente!");
        verificaRespostaCorreta = true;
    }

    // Verifica imagem da resposta correta

    if (imagemRespostaCorretaInput.value === "") {
        alert(
            `Digite uma URL válida de uma imagem! Não deixe em branco! Corrija o espaço em branco da ${qualPergunta}`
        );
        imagemRespostaCorretaInput.style.border = "1px solid red";
    } else {
        try {
            let url = new URL(imagemRespostaCorretaInput.value);
            imagemRespostaCorretaInput.style.border = "1px solid #d1d1d1";
            console.log("Valid URL!");
            verificaImgRespostaCorreta = true;
        } catch (err) {
            console.log("Invalid URL!");
            alert("Tente digite com http:// no início");
            imagemRespostaCorretaInput.style.border = "1px solid red";
            verificaImgRespostaCorreta = false;
        }
    }

    // Verifica Resposta incorreta 1

    if (
        respostasIncorretaInputsList[0].value === "" ||
        respostasIncorretaInputsList[0].value === " "
    ) {
        respostasIncorretaInputsList[0].style.border = "1px solid red";
        alert(`Obrigatório: Colocar a resposta incorreta 1! Corrija na ${qualPergunta}!`);
        verificaRespostaIncorreta1 = false;
    } else {
        respostasIncorretaInputsList[0].style.border = "1px solid #d1d1d1";
        console.log("Digitou Corretamente a resposta incorreta 1!");
        verificaRespostaIncorreta1 = true;
    }

    // Verifica imagem resposta incorreta 1

    if (
        imagemRespostasIncorretaInputsList[0].value === "" ||
        imagemRespostasIncorretaInputsList[0].value === " "
    ) {
        alert(
            `Digite uma URL válida de uma imagem! Não deixe em branco! Corrija o espaço em branco da ${qualPergunta}`
        );
        imagemRespostasIncorretaInputsList[0].style.border = "1px solid red";
    } else {
        try {
            let url = new URL(imagemRespostasIncorretaInputsList[0].value);
            console.log("Valid URL!");
            imagemRespostasIncorretaInputsList[0].style.border = "1px solid #d1d1d1";
            verificaImgRespostaIncorreta1 = true;
        } catch (err) {
            console.log("Invalid URL!");
            alert("Tente digite com http:// no início");
            imagemRespostasIncorretaInputsList[0].style.border = "1px solid red";
            verificaImgRespostaIncorreta1 = false;
        }
    }

    // Verifica se vai enviar resposta incorreta 2

    if (respostasIncorretaInputsList[1].value != "") {
        if (imagemRespostasIncorretaInputsList[1].value != "") {
            try {
                let url = new URL(imagemRespostasIncorretaInputsList[1].value);
                console.log("Valid URL!");
                imagemRespostasIncorretaInputsList[1].style.border = "1px solid #d1d1d1";
                verificaRespImgIncorreta2 = true;
            } catch (err) {
                console.log("Invalid URL!");
                alert("Tente digite com http:// no início");
                imagemRespostasIncorretaInputsList[1].style.border = "1px solid red";
                verificaRespImgIncorreta2 = false;
                prosseguir = false;
            }
        } else {
            alert("Impossivel enviar sem imagem na resposta incorreta! na " + qualPergunta);
            imagemRespostasIncorretaInputsList[1].style.border = "1px solid red";
            verificaRespImgIncorreta2 = false;
            prosseguir = false;
        }
    } else if (imagemRespostasIncorretaInputsList[1].value != "") {
        if (respostasIncorretaInputsList[1].value != "") {
        } else {
            respostasIncorretaInputsList[1].style.border = "1px solid red";
            alert("Impossível enviar sem Digitar a resposta incorreta 2! na " + qualPergunta);
            verificaRespImgIncorreta2 = false;
            prosseguir = false;
        }
    } else {
        verificaRespImgIncorreta2 = false;
    }

    // Verifica se vai enviar resposta incorreta 3

    if (respostasIncorretaInputsList[2].value != "") {
        if (imagemRespostasIncorretaInputsList[2].value != "") {
            try {
                let url = new URL(imagemRespostasIncorretaInputsList[2].value);
                console.log("Valid URL!");
                imagemRespostasIncorretaInputsList[2].style.border = "1px solid #d1d1d1";
                verificaRespImgIncorreta3 = true;
            } catch (err) {
                console.log("Invalid URL!");
                alert(
                    "Tente digite com http:// no início na reposta incorreta 3! na " + qualPergunta
                );
                imagemRespostasIncorretaInputsList[2].style.border = "1px solid red";
                verificaRespImgIncorreta3 = false;
                prosseguir = false;
            }
        } else {
            imagemRespostasIncorretaInputsList[2].style.border = "1px solid red";
            alert("Impossivel enviar sem a imagem a reposta incorreta 3! na " + qualPergunta);
            verificaRespImgIncorreta3 = false;
            prosseguir = false;
        }
    } else if (imagemRespostasIncorretaInputsList[2].value != "") {
        if (respostasIncorretaInputsList[2].value != "") {
        } else {
            respostasIncorretaInputsList[2].style.border = "1px solid red";
            alert("Impossível enviar sem Digitar a resposta incorreta 3! na " + qualPergunta);
            verificaRespImgIncorreta3 = false;
            prosseguir = false;
        }
    } else {
        verificaRespImgIncorreta3 = false;
    }

    console.log(verificaTitulo);
    console.log(verificaCorFundo);
    console.log(verificaRespostaCorreta);
    console.log(verificaImgRespostaCorreta);
    console.log(verificaRespostaIncorreta1);
    console.log(verificaImgRespostaIncorreta1);
    console.log(verificaRespImgIncorreta2);
    console.log(verificaRespImgIncorreta3);

    if (
        verificaTitulo &&
        verificaCorFundo &&
        verificaRespostaCorreta &&
        verificaImgRespostaCorreta &&
        verificaRespostaIncorreta1 &&
        verificaImgRespostaIncorreta1
    ) {
        if (verificaRespImgIncorreta2 && verificaRespImgIncorreta3) {
            return {
                title: perguntaInput.value,
                color: corPergunta.value,
                answers: [
                    {
                        text: respostaCorretaInput.value,
                        image: imagemRespostaCorretaInput.value,
                        isCorrectAnswer: true,
                    },
                    {
                        text: respostasIncorretaInputsList[0].value,
                        image: imagemRespostasIncorretaInputsList[0].value,
                        isCorrectAnswer: false,
                    },
                    {
                        text: respostasIncorretaInputsList[1].value,
                        image: imagemRespostasIncorretaInputsList[1].value,
                        isCorrectAnswer: false,
                    },
                    {
                        text: respostasIncorretaInputsList[2].value,
                        image: imagemRespostasIncorretaInputsList[2].value,
                        isCorrectAnswer: false,
                    },
                ],
            };
        } else if (verificaRespImgIncorreta2 && !verificaRespImgIncorreta3) {
            return {
                title: perguntaInput.value,
                color: corPergunta.value,
                answers: [
                    {
                        text: respostaCorretaInput.value,
                        image: imagemRespostaCorretaInput.value,
                        isCorrectAnswer: true,
                    },
                    {
                        text: respostasIncorretaInputsList[0].value,
                        image: imagemRespostasIncorretaInputsList[0].value,
                        isCorrectAnswer: false,
                    },
                    {
                        text: respostasIncorretaInputsList[1].value,
                        image: imagemRespostasIncorretaInputsList[1].value,
                        isCorrectAnswer: false,
                    },
                ],
            };
        }
        return {
            title: perguntaInput.value,
            color: corPergunta.value,
            answers: [
                {
                    text: respostaCorretaInput.value,
                    image: imagemRespostaCorretaInput.value,
                    isCorrectAnswer: true,
                },
                {
                    text: respostasIncorretaInputsList[0].value,
                    image: imagemRespostasIncorretaInputsList[0].value,
                    isCorrectAnswer: false,
                },
            ],
        };
    } else {
        prosseguir = false;
    }
}

// Fim segunda Tela 3.2
// Inicio terceira Tela 3.3

function adicionaQtdNiveis() {
    const containerQtdCriaNiveis = document.querySelector(".qtd-niveis-criar");
    containerQtdCriaNiveis.innerHTML = `
                    <div class="container-cria-nivel">
                        <div class="menu-hidden-nivel">
                            <h2>Nível 1</h2>
                            <!-- <img src="../img/button-mostra-cria-pergunta.svg" alt="" /> -->
                        </div>
                        <div class="container-mostra-cria-nivel">
                        <input class="titulo-cria-nivel" minlength="10" type="text" placeholder="Titulo do Nível" />
                        <input class="acerto-minimo-cria-nivel" maxlength="3" type="text" placeholder="% de acerto mínima" />
                        <input class="url-imagem-cria-nivel" type="text" placeholder="URL da imagem do nível" />
                        <input class="descricao-cria-nivel" minlength="30" type="text" placeholder="Descrição do nível" />
                        </div>
                    </div>
                `;

    for (let i = 1; i < qtdNiveisCriadosTotais; i++) {
        containerQtdCriaNiveis.innerHTML += `
                    <div class="container-cria-nivel">
                        <div class="menu-hidden-nivel">
                            <h2>Nível ${i + 1}</h2>
                            <img onclick="abrirNivel(this)" src="../img/button-mostra-cria-pergunta.svg" alt="" />
                        </div>
                        <div class="container-mostra-cria-nivel hidden">
                            <input class="titulo-cria-nivel" minlength="10" type="text" placeholder="Titulo do Nível" />
                            <input class="acerto-minimo-cria-nivel" maxlength="3" type="text" placeholder="% de acerto mínima" />
                            <input class="url-imagem-cria-nivel" type="text" placeholder="URL da imagem do nível" />
                            <input class="descricao-cria-nivel" minlength="30" type="text" placeholder="Descrição do nível" />
                        </div>
                    </div>
                `;
    }
}

// algo apenas visual
function abrirNivel(elemento) {
    const containerCriaNivel = elemento.parentNode.parentNode;
    const tiraHidden = containerCriaNivel.querySelector(".container-mostra-cria-nivel");

    tiraHidden.classList.toggle("hidden");
}

function prosseguirCriaSucessoBuzzQuizz(elemento) {
    verificacaoAcertoMinimo = [];
    prosseguir = true;
    levels = [];
    const allContainerCriaNiveis = document.querySelectorAll(".container-cria-nivel");

    for (let i = 0; i < allContainerCriaNiveis.length; i++) {
        let objectProsseguir = testaInputsCriaNiveis(allContainerCriaNiveis[i]);
        levels.push(objectProsseguir);
    }
    console.log(questions);
    console.log(verificacaoAcertoMinimo);
}

function testaInputsCriaNiveis(elemento) {
    const verificaSeNumero = /[0-9]{3}$/i;
    let verificaTituloNivel = false;

    const qualNivel = elemento.querySelector(".menu-hidden-nivel h2").innerHTML;
    const inputTituloCriaNivel = elemento.querySelector(".titulo-cria-nivel");
    const inputPorcentagemMinimaNivel = elemento.querySelector(".acerto-minimo-cria-nivel");
    const numeroPorcentagemMinimaNivel = Number(inputPorcentagemMinimaNivel.value);
    console.log(numeroPorcentagemMinimaNivel);
    // Verifica o tamanho do que foi digitado no titulo

    if (inputTituloCriaNivel.value.length > inputTituloCriaNivel.minLength) {
        inputTituloCriaNivel.style.border = "1px solid #d1d1d1";
        console.log(`${qualNivel}: Titulo nível foi digitado corretamente!`);
        verificaTituloNivel = true;
    } else {
        inputTituloCriaNivel.style.border = "1px solid red";
        alert(`Titulo nível não pode ter menos de 10 caracteres! Corrija o ${qualNivel}`);
        verificaTituloNivel = false;
    }
    console.log("verifica se numero" + verificaSeNumero.test(numeroPorcentagemMinimaNivel));
    console.log(
        "verifica se tamanho max" + inputPorcentagemMinimaNivel.value.length <
            inputPorcentagemMinimaNivel.maxLength
    );
    // Verifica a porcentagem minima de acerto
    if (inputPorcentagemMinimaNivel.value.length <= inputPorcentagemMinimaNivel.maxLength) {
        if (
            verificaSeNumero.test(numeroPorcentagemMinimaNivel) &&
            verificaSeNumero > 0 &&
            verificaSeNumero < 100
        ) {
            verificacaoAcertoMinimo.push(numeroPorcentagemMinimaNivel);
        } else {
            alert("");
        }
    }
}
