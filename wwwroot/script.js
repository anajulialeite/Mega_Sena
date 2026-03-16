const API_SORTEIO = '/api/sorteio';

async function realizarSorteio() {
    const botao = document.getElementById('botao-sortear');
    const globo = document.getElementById('globo-bolas');

    botao.disabled = true;
    globo.innerHTML = '';

    // Mostra 6 bolas girando enquanto aguarda a resposta da API
    for (let i = 0; i < 6; i++) {
        const bolaGirando = document.createElement('div');
        bolaGirando.className = 'bola-girando';
        globo.appendChild(bolaGirando);
    }

    try {
        const resposta = await fetch(API_SORTEIO);
        const dados = await resposta.json();

        globo.innerHTML = '';

        // Revela cada bola com um delay sequencial para criar efeito cascata
        dados.numerosDoSorteio.forEach((numero, indice) => {
            const bola = document.createElement('div');
            bola.className = 'bola';
            bola.textContent = numero;
            bola.style.animationDelay = `${indice * 0.15}s`;
            globo.appendChild(bola);
        });

        setTimeout(lancarConfetes, 300);
    } catch (erro) {
        globo.innerHTML = '<p style="color: #ff6b6b;">Erro ao sortear. Tente novamente.</p>';
    }

    botao.disabled = false;
}

function lancarConfetes() {
    const container = document.getElementById('confetes');
    const cores = ['#209b3e', '#f0c030', '#2fd45a', '#ffe066', '#ffffff', '#0d6b2e'];
    const totalConfetes = 60;

    for (let i = 0; i < totalConfetes; i++) {
        const confete = document.createElement('div');
        confete.className = 'confete';
        confete.style.left = `${Math.random() * 100}%`;
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.animationDelay = `${Math.random() * 0.8}s`;
        confete.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;

        // Formas variadas: quadrados e retângulos para parecer confete real
        if (Math.random() > 0.5) {
            confete.style.width = '8px';
            confete.style.height = '16px';
        }

        container.appendChild(confete);
    }

    // Remove confetes do DOM após a animação para evitar acúmulo
    setTimeout(() => { container.innerHTML = ''; }, 3000);
}
