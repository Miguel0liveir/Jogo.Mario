const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const scoreElement = document.getElementById('score');
const jumpButton = document.getElementById('jumpButton');

const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('startButton');
const restartButton = document.createElement('button');
restartButton.id = 'restartButton';
restartButton.textContent = 'Reiniciar';
document.body.appendChild(restartButton);

let score = 0;
let gameOver = false;
let gameStarted = false;
let loopInterval = null;
let scoreInterval = null;

// Função para atualizar a pontuação
const updateScore = () => {
    if (!gameOver) {
        score++;
        scoreElement.textContent = `Pontuação: ${score}`;
    }
};

// Função de pulo do Mario
const jump = () => {
    if (!gameOver) {
        mario.classList.add('jump');
        setTimeout(() => {
            mario.classList.remove('jump');
        }, 500);
    }
};

// Função para iniciar o jogo
const startGame = () => {
    startScreen.style.display = 'none'; // Esconder a tela inicial
    pipe.style.animation = 'pipe-animation 1.5s infinite linear'; // Iniciar a animação do tubo
    pipe.style.left = ''; // Garantir que a posição à esquerda esteja vazia (resetar)
    gameStarted = true;
    score = 0;
    gameOver = false;

    // Reiniciar loops de pontuação e movimento do tubo
    scoreInterval = setInterval(updateScore, 1000);
    loopInterval = setInterval(gameLoop, 10);
};

// Função para reiniciar o jogo após perder
const restartGame = () => {
    gameOver = false; // Resetar estado do jogo
    restartButton.classList.remove('show'); // Esconder botão de reiniciar

    // Resetar o Mario
    mario.src = 'imagens/mario.gif'; // Voltar ao Mario original
    mario.style.width = '150px';
    mario.style.marginLeft = '0';
    mario.style.bottom = '0';
    mario.style.animation = '';

    // Resetar o tubo à posição inicial
    pipe.style.animation = 'none'; // Parar a animação temporariamente
    pipe.style.left = '100%'; // Resetar a posição do tubo fora da tela

    // Reiniciar a animação do tubo com um pequeno atraso
    setTimeout(() => {
        pipe.style.animation = 'pipe-animation 1.5s infinite linear'; // Reiniciar a animação do tubo
    }, 100);

    startGame(); // Reiniciar o jogo
};

// Função para parar o jogo quando ocorre uma colisão
const endGame = () => {
    clearInterval(loopInterval);
    clearInterval(scoreInterval);
    gameOver = true;
    pipe.style.animation = 'none'; // Parar a animação do tubo
    restartButton.classList.add('show'); // Mostrar o botão de reiniciar
};

// Loop principal do jogo para verificar colisões
const gameLoop = () => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        // Parar a animação do tubo e do Mario
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        // Trocar a imagem do Mario para a de game over
        mario.src = 'imagens/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        // Terminar o jogo
        endGame();
    }
};

// Eventos para iniciar e reiniciar o jogo
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
jumpButton.addEventListener('click', jump);
document.addEventListener('keydown', jump);
