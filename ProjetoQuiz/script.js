class Personagem {
    constructor(nome, pontos, descricao, imagem) {
        this.nome = nome;
        this.pontos = pontos;
        this.descricao = descricao;
        this.imagem = imagem;
    }
}

document.getElementById('btn-iniciar').addEventListener('click', function() {
    document.getElementById('tela-boas-vindas').classList.add('escondido');
    document.getElementById('conteudo-quiz').classList.remove('escondido');
});

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
    const listaQuestoes = document.getElementById("questoes-lista");
    const btnResultado = document.getElementById("btn-resultado");

    document.querySelector("#conteudo-quiz h1").classList.add("escondido");
    const perfisResumo = document.querySelector(".perfis-resumo");
    perfisResumo.classList.add("escondido");
    listaQuestoes.classList.add("escondido");
    btnResultado.classList.add("escondido");

    tela.innerHTML = `
        <h2>Seu resultado:</h2>
        <h1>${personagem.nome}</h1>
        <img src="${personagem.imagem}" alt="${personagem.nome}" style="max-width:200px; border-radius:50%; border: 3px solid #d4af37; margin: 15px 0;">
        <p>${personagem.descricao}</p>
        <p><strong>Pontuação Total: ${personagem.pontos}</strong></p>
        <button id="btn-reiniciar" onclick="reiniciar()">Refazer teste</button>
    `;

    tela.classList.remove("escondido");
    window.scrollTo(0, 0); 
}
const reiniciar = () => {
    const opcoes = document.querySelectorAll('input[type="radio"]');
    opcoes.forEach(opcao => {
        opcao.checked = false;
    });

    location.reload();
}
