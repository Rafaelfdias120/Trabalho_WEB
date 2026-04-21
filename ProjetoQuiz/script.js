class Personagem {
    constructor(nome, pontos, descricao, imagem) {
        this.nome = nome;
        this.pontos = pontos;
        this.descricao = descricao;
        this.imagem = imagem;
    }
}

document.getElementById('btn-resultado').addEventListener('click', function () {

    if (!validacao()) return;

    const resultado = calcularResultado();
    personagemVencedor(resultado);

});

const validacao = () => {
    for (let i = 1; i <= 10; i++) {
        const resposta = document.querySelector(`input[name="p${i}"]:checked`);

        if (!resposta) {
            alert(`Responda a pergunta ${i} antes de ver o resultado!`);
            return false;
        }
    }
    return true;
}

const calcularResultado = () => {
    let harry = 0;
    let hermione = 0;
    let ron = 0;

    for (let i = 1; i <= 10; i++) {
        const resposta = document.querySelector(`input[name="p${i}"]:checked`);

        harry += parseInt(resposta.dataset.harry);
        hermione += parseInt(resposta.dataset.hermione);
        ron += parseInt(resposta.dataset.ron);
    }
    return { harry, hermione, ron };
}

const personagemVencedor = (resultado) => {

    localStorage.setItem('quizResultado', JSON.stringify(resultado));

    const personagens = [
        new Personagem(
            "Harry Potter",
            resultado.harry,
            "Corajoso, impulsivo e sempre luta pelo que é certo.",
            "imagens/harryPotter.jpg"
        ),
        new Personagem(
            "Hermione Granger",
            resultado.hermione,
            "Inteligente, estratégica e sempre preparada.",
            "imagens/hermione.jpg"
        ),
        new Personagem(
            "Ron Weasley",
            resultado.ron,
            "Leal, engraçado e valoriza as amizades.",
            "imagens/ron.webp"
        )
    ];

    let vencedor = personagens[0];

    for (let i = 1; i < personagens.length; i++) {
        if (personagens[i].pontos > vencedor.pontos) {
            vencedor = personagens[i];
        }
    }

    mostrarResultado(vencedor);
}

const mostrarResultado = (personagem) => {

    const tela = document.getElementById("tela-resultado");

    tela.innerHTML = `
        <h2>Seu resultado:</h2>
        <h1>${personagem.nome}</h1>
        <img src="${personagem.imagem}" alt="${personagem.nome}">
        <p>${personagem.descricao}</p>
        <p><strong>Pontuação: ${personagem.pontos}</strong></p>
        <button id="btn-reiniciar" onclick="reiniciar()">Refazer teste</button>
    `;

    tela.classList.remove("escondido");
}

const reiniciar = () => {
    localStorage.clear();
    location.reload();
}
