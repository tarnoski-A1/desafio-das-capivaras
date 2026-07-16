// Sistema de Níveis: Matrizes do 1 ao 10 perfeitamente alinhadas com as cartas
const niveis = [
    // NÍVEL 1
    [
        [ 1, -1,  0, -1,  0],
        [-1,  1, -1,  0, -1],
        [ 0, -1,  1, -1,  0],
        [-1,  2, -1,  0, -1],
        [ 0, -1,  0, -1,  0]
    ],
    // NÍVEL 2
    [
        [ 1, -1,  0, -1,  1],
        [-1,  1, -1,  1, -1],
        [ 2, -1,  0, -1,  0],
        [-1,  0, -1,  0, -1],
        [ 0, -1,  0, -1,  0]
    ],
    // NÍVEL 3 
    [
        [ 1, -1,  0, -1,  0],
        [-1,  1, -1,  1, -1],
        [ 1, -1,  2, -1,  0],
        [-1,  0, -1,  0, -1],
        [ 0, -1,  0, -1,  0]
    ],
    // NÍVEL 4 
    [
        [ 1, -1,  0, -1,  0],
        [-1,  0, -1,  0, -1],
        [ 1, -1,  1, -1,  2],
        [-1,  1, -1,  0, -1],
        [ 0, -1,  0, -1,  0]
    ],
    // NÍVEL 5 (Corrigido pelas novas fotos)
    [
        [ 2, -1,  0, -1,  0],
        [-1,  1, -1,  0, -1],
        [ 1, -1,  1, -1,  1],
        [-1,  1, -1,  1, -1],
        [ 1, -1,  0, -1,  0]
    ],
    // NÍVEL 6 (Corrigido pelas novas fotos)
    [
        [ 2, -1,  1, -1,  0],
        [-1,  1, -1,  0, -1],
        [ 1, -1,  0, -1,  0],
        [-1,  0, -1,  0, -1],
        [ 1, -1,  1, -1,  0]
    ],
    // NÍVEL 7 (Corrigido pelas novas fotos)
    [
        [ 1, -1,  0, -1,  1],
        [-1,  1, -1,  0, -1],
        [ 1, -1,  2, -1,  1],
        [-1,  1, -1,  0, -1],
        [ 0, -1,  0, -1,  0]
    ],
    // NÍVEL 8 (Verificado - Estava perfeito)
    [
        [ 1, -1,  0, -1,  0],
        [-1,  1, -1,  1, -1],
        [ 1, -1,  2, -1,  0],
        [-1,  0, -1,  1, -1],
        [ 0, -1,  0, -1,  0]
    ],
    // NÍVEL 9 (Verificado - Estava perfeito)
    [
        [ 1, -1,  0, -1,  0],
        [-1,  1, -1,  2, -1],
        [ 1, -1,  0, -1,  1],
        [-1,  1, -1,  1, -1],
        [ 0, -1,  0, -1,  0]
    ],
    // NÍVEL 10 (Verificado - Estava perfeito)
    [
        [ 1, -1,  2, -1,  0],
        [-1,  1, -1,  0, -1],
        [ 1, -1,  1, -1,  0],
        [-1,  1, -1,  0, -1],
        [ 0, -1,  0, -1,  1]
    ]
];

let nivelAtual = 0;
let matrizInicial = JSON.parse(JSON.stringify(niveis[nivelAtual]));
let tabuleiro = JSON.parse(JSON.stringify(matrizInicial));

let linhaSel = -1;
let colunaSel = -1;

let tempo = 0;
let timer;
let jogoIniciado = false;
let fogosContinuos; 

function iniciarJogo() {
    document.getElementById('tela-nivel').classList.add('escondido');
    jogoIniciado = true;
    
    timer = setInterval(() => {
        tempo++;
        let min = String(Math.floor(tempo / 60)).padStart(2, '0');
        let seg = String(tempo % 60).padStart(2, '0');
        document.getElementById('relogio').innerText = `Tempo: ${min}:${seg}`;
    }, 1000);
}

function reiniciarJogo() {
    document.getElementById('tela-gameover').classList.add('escondido');
    
    tabuleiro = JSON.parse(JSON.stringify(matrizInicial));
    linhaSel = -1;
    colunaSel = -1;
    
    tempo = 0;
    document.getElementById('relogio').innerText = `Tempo: 00:00`;
    renderizar();
    
    clearInterval(timer);
    timer = setInterval(() => {
        tempo++;
        let min = String(Math.floor(tempo / 60)).padStart(2, '0');
        let seg = String(tempo % 60).padStart(2, '0');
        document.getElementById('relogio').innerText = `Tempo: ${min}:${seg}`;
    }, 1000);
}

function reiniciarTudo() {
    clearInterval(fogosContinuos); 
    document.getElementById('tela-vitoria').classList.add('escondido');
    
    nivelAtual = 0;
    matrizInicial = JSON.parse(JSON.stringify(niveis[nivelAtual]));
    tabuleiro = JSON.parse(JSON.stringify(matrizInicial));
    linhaSel = -1;
    colunaSel = -1;
    
    tempo = 0;
    document.getElementById('relogio').innerText = `Tempo: 00:00`;
    renderizar();
    
    clearInterval(timer);
    timer = setInterval(() => {
        tempo++;
        let min = String(Math.floor(tempo / 60)).padStart(2, '0');
        let seg = String(tempo % 60).padStart(2, '0');
        document.getElementById('relogio').innerText = `Tempo: ${min}:${seg}`;
    }, 1000);
}

function renderizar() {
    const container = document.getElementById('tabuleiro');
    container.innerHTML = '';
    
    tabuleiro.forEach((linha, r) => {
        linha.forEach((coluna, c) => {
            const div = document.createElement('div');
            div.className = 'casa';
            
            if (tabuleiro[r][c] === 1) div.classList.add('tem-capivara');
            else if (tabuleiro[r][c] === 2) div.classList.add('tem-capivara-vermelha');
            else if (tabuleiro[r][c] === 0) div.classList.add('vazio');
            else div.classList.add('invalido');
            
            if ((tabuleiro[r][c] === 1 || tabuleiro[r][c] === 2) && r === linhaSel && c === colunaSel) {
                div.classList.add('selecionada');
            }
            
            div.onclick = () => tratarClique(r, c);
            container.appendChild(div);
        });
    });
}

function tratarClique(r, c) {
    if (!jogoIniciado) return;

    if (tabuleiro[r][c] === 1 || tabuleiro[r][c] === 2) {
        linhaSel = r;
        colunaSel = c;
        renderizar();
    } 
    else if (tabuleiro[r][c] === 0 && linhaSel !== -1) {
        let diffLinha = Math.abs(r - linhaSel);
        let diffColuna = Math.abs(c - colunaSel);
        
        let puloValido = false;
        let meioR, meioC;

        if (diffLinha === 4 && diffColuna === 0) { 
            puloValido = true;
            meioR = (r + linhaSel) / 2;
            meioC = c;
        } else if (diffLinha === 0 && diffColuna === 4) { 
            puloValido = true;
            meioR = r;
            meioC = (c + colunaSel) / 2;
        } else if (diffLinha === 2 && diffColuna === 2) { 
            puloValido = true;
            meioR = (r + linhaSel) / 2;
            meioC = (c + colunaSel) / 2;
        }

        if (puloValido) {
            let pecaMeio = tabuleiro[meioR][meioC];
            
            if (pecaMeio === 1) { 
                tabuleiro[r][c] = tabuleiro[linhaSel][colunaSel]; 
                tabuleiro[linhaSel][colunaSel] = 0;               
                tabuleiro[meioR][meioC] = 0;                       
                
                linhaSel = -1;
                colunaSel = -1;
                renderizar();
                
                verificarVitoria();
            }
        }
    }
}

function temMovimentoPossivel() {
    const movimentos = [
        { dr: 4, dc: 0, mr: 2, mc: 0 }, { dr: -4, dc: 0, mr: -2, mc: 0 },
        { dr: 0, dc: 4, mr: 0, mc: 2 }, { dr: 0, dc: -4, mr: 0, mc: -2 },
        { dr: 2, dc: 2, mr: 1, mc: 1 }, { dr: 2, dc: -2, mr: 1, mc: -1 },
        { dr: -2, dc: 2, mr: -1, mc: 1 }, { dr: -2, dc: -2, mr: -1, mc: -1 }
    ];

    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            if (tabuleiro[r][c] === 1 || tabuleiro[r][c] === 2) {
                for (let mov of movimentos) {
                    let destinoR = r + mov.dr;
                    let destinoC = c + mov.dc;
                    let meioR = r + mov.mr;
                    let meioC = c + mov.mc;

                    if (destinoR >= 0 && destinoR < 5 && destinoC >= 0 && destinoC < 5) {
                        if (tabuleiro[destinoR][destinoC] === 0 && tabuleiro[meioR][meioC] === 1) {
                            return true; 
                        }
                    }
                }
            }
        }
    }
    return false;
}

function verificarVitoria() {
    let verdes = 0;
    let vermelhas = 0;

    tabuleiro.forEach(linha => {
        linha.forEach(peca => {
            if (peca === 1) verdes++;
            if (peca === 2) vermelhas++;
        });
    });

    if (verdes === 0 && vermelhas === 1) {
        clearInterval(timer); 
        soltarFogos(3500); 
        
        setTimeout(() => {
            if (nivelAtual < niveis.length - 1) {
                nivelAtual++;
                passarDeNivel();
            } else {
                document.getElementById('tela-vitoria').classList.remove('escondido');
                iniciarFogosContinuos();
            }
        }, 4000);

    } else if (!temMovimentoPossivel()) {
        clearInterval(timer);
        document.getElementById('tela-gameover').classList.remove('escondido');
    }
}

function passarDeNivel() {
    // Agora formata o número do nível garantindo dois dígitos (ex: 09, 10)
    let numeroNivelFormatado = String(nivelAtual + 1).padStart(2, '0');
    
    document.getElementById('texto-transicao').innerText = `NÍVEL ${numeroNivelFormatado}`;
    document.getElementById('tela-transicao').classList.remove('escondido');
    
    matrizInicial = JSON.parse(JSON.stringify(niveis[nivelAtual]));
    tabuleiro = JSON.parse(JSON.stringify(matrizInicial));
    linhaSel = -1;
    colunaSel = -1;
    tempo = 0;
    document.getElementById('relogio').innerText = `Tempo: 00:00`;
    renderizar();
    
    setTimeout(() => {
        document.getElementById('tela-transicao').classList.add('escondido');
        timer = setInterval(() => {
            tempo++;
            let min = String(Math.floor(tempo / 60)).padStart(2, '0');
            let seg = String(tempo % 60).padStart(2, '0');
            document.getElementById('relogio').innerText = `Tempo: ${min}:${seg}`;
        }, 1000);
    }, 2500);
}

function soltarFogos(duracao) {
    let animationEnd = Date.now() + duracao;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 110 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    let interval = setInterval(function() {
        let timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) { return clearInterval(interval); }

        let particleCount = 50 * (timeLeft / duracao);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function iniciarFogosContinuos() {
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 110 };
    function randomInRange(min, max) { return Math.random() * (max - min) + min; }
    
    fogosContinuos = setInterval(function() {
        confetti(Object.assign({}, defaults, { particleCount: 30, origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } }));
    }, 400);
}

renderizar();