let tituloCriadoQuizz, urlCriadoQuizz, qtdPerguntasCriadasTotais, qtdNiveisCriadosTotais;

let boleanTituloQuizzInfoBasic = false,
    boleanUrlQuizzInfoBasic = false,
    boleanQtdPerguntasQuizzInfoBasic = false,
    boleanQtdNiveisQuizzInfoBasic = false;

let testeTrue = false;

function prosseguirCriarPergunta() {
    const containerHiddenInfoBasic = document.querySelector(".container-hidden-cria-info-basic");
    const containerHiddenCriaPerguntas = document.querySelector(
        ".container-hidden-cria-perguntas-resposta"
    );

    testaTituloCorreto();

    setTimeout(() => {
        console.log(boleanTituloQuizzInfoBasic);
        console.log(boleanQtdPerguntasQuizzInfoBasic);
        console.log(boleanQtdNiveisQuizzInfoBasic);
        console.log(boleanUrlQuizzInfoBasic);
        console.log(boleanUrlQuizzInfoBasic);
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
            testeTrue = false;
        }
    }, 1000);
}
// Inicio Primeira Tela 3.1
// Essa função verifica se o link é de uma imagem mesmo

function is_img(file) {
    const inputUrlQuizzInfoBasic = document.querySelector("#url-info-basic");
    let ajax = new XMLHttpRequest();
    ajax.open("GET", file, true);
    ajax.send();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4) {
            var jpg = ajax.responseText;
            console.log(ajax.status);
            if (ajax.status === 200) {
                urlCriadoQuizz = file;
                testeTrue = true;
                console.log("A imagem " + file + " existe");
                inputUrlQuizzInfoBasic.style.border = "1px solid #d1d1d1";
            } else {
                testeTrue = false;
                console.log("A imagem " + file + " NAO existe");
                alert("Digite um URL de imagem válido!");
                inputUrlQuizzInfoBasic.style.border = "1px solid red";
            }
        }
    };
}
function testaTituloCorreto() {
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
        alert("Digite alguma coisa no url!");
        inputUrlQuizzInfoBasic.style.border = "1px solid red";
    } else {
        try {
            let url = new URL(inputUrlQuizzInfoBasic.value);
            console.log("Valid URL!");
            is_img(url);
            setTimeout(() => {
                boleanUrlQuizzInfoBasic = testeTrue;
            }, 500);
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
                <input type="text" placeholder="Texto da Pegunta" />
                <input
                    type="text"
                    maxlength="7"
                    placeholder="Cor de fundo da pergunta"
                />
            </div>
            <div class="resposta-correta">
                <h2>Resposta correta</h2>
                <input type="text" placeholder="Resposta Correta" />
                <input type="text" placeholder="URL da imagem" />
            </div>
            <div class="respostas-incorretas">
                <h2>Respostas incorretas</h2>
                <div class="respota-incorreta-input">
                    <input type="text" placeholder="Resposta incorreta 1" />
                    <input type="text" placeholder="URL da imagem 1" />
                </div>
                <div class="respota-incorreta-input">
                    <input type="text" placeholder="Resposta incorreta 2" />
                    <input type="text" placeholder="URL da imagem 2" />
                </div>
                <div class="respota-incorreta-input">
                    <input type="text" placeholder="Resposta incorreta 3" />
                    <input type="text" placeholder="URL da imagem 3" />
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
            <div class="container-mostra-cria-perguntas hidden">
                <div class="pergunta">
                    <input type="text" placeholder="Texto da Pegunta" />
                    <input
                        type="text"
                        maxlength="7"
                        placeholder="Cor de fundo da pergunta"
                    />
                </div>
                <div class="resposta-correta">
                    <h2>Resposta correta</h2>
                    <input type="text" placeholder="Resposta Correta" />
                    <input type="text" placeholder="URL da imagem" />
                </div>
                <div class="respostas-incorretas">
                    <h2>Respostas incorretas</h2>
                    <div class="respota-incorreta-input">
                        <input type="text" placeholder="Resposta incorreta 1" />
                        <input type="text" placeholder="URL da imagem 1" />
                    </div>
                    <div class="respota-incorreta-input">
                        <input type="text" placeholder="Resposta incorreta 2" />
                        <input type="text" placeholder="URL da imagem 2" />
                    </div>
                    <div class="respota-incorreta-input">
                        <input type="text" placeholder="Resposta incorreta 3" />
                        <input type="text" placeholder="URL da imagem 3" />
                    </div>
                </div>
            </div>
        </div>
    `;
    }
}

function abrirPergunta(elemento) {
    const containerCriaPergunta = elemento.parentNode.parentNode;
    const tiraHidden = containerCriaPergunta.querySelector(".hidden");

    tiraHidden.classList.remove("hidden");
}

function prosseguirCriaNiveis() {
    const allContainerCriaPergunta = document.querySelectorAll(".container-cria-pergunta");

    console.log(allContainerCriaPergunta);
}
