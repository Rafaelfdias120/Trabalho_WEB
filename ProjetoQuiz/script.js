


document.getElementById('btn-resultado').addEventListener('click', function () {
    validacao();
    const resultado = calcularResultado();
    personagemvencedor(resultado);

});

const validacao = () => {
    for (let i = 1; i <= 10; i++) {
        const resposta = document.querySelector(`input[name="p${i}"]:checked`);

        if (!resposta) {
            alert(`Responda a pergunta ${i} antes de ver o resultado!`);
            return;
        }
    }

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

const personagemvencedor = (resultado) => {
    localStorage.setItem('quizResultado', JSON.stringify(resultado));

    if (resultado.harry > resultado.hermione && resultado.harry > resultado.ron) {
        window.location.href = "harryPotter.html";
    }
    else if (resultado.hermione > resultado.harry && resultado.hermione > resultado.ron) {
        window.location.href = "hermioneGranger.html";
    }
    else {
        window.location.href = "ronWeasley.html";
    }
}