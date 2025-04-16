// Funcionalidad JavaScript para el juego Número Secreto

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const guessInput = document.getElementById('guess');
    const tryButton = document.getElementById('try-button');
    const resetButton = document.getElementById('reset-button');
    const messageElement = document.getElementById('game-message');
    const attemptsElement = document.getElementById('attempts-message');
    const numberBox = document.getElementById('number-box');
    const gamesCounter = document.getElementById('games-counter');
    const winsCounter = document.getElementById('wins-counter');
    const avgAttempts = document.getElementById('avg-attempts');
    const character = document.querySelector('.character');
    const messageBubble = document.getElementById('message-bubble');
    
    // Variables del juego
    let secretNumber;
    let attempts = 0;
    let games = 0;
    let wins = 0;
    let totalAttempts = 0;
    
    // Estado del juego
    let gameActive = true;
    
    // Función para generar un número aleatorio entre 1 y 10
    function generateSecretNumber() {
        return Math.floor(Math.random() * 10) + 1;
    }
    
    // Iniciar un nuevo juego
    function startNewGame() {
        secretNumber = generateSecretNumber();
        attempts = 0;
        gameActive = true;
        
        // Actualizar UI
        guessInput.value = '';
        numberBox.textContent = '?';
        messageElement.textContent = '¡Intenta adivinar el número secreto!';
        attemptsElement.textContent = 'Intentos: 0';
        
        // Resetear animaciones
        character.classList.remove('celebrate');
        messageBubble.classList.remove('pulse');
        
        // Enfocar el input
        guessInput.focus();
        
        // Incrementar contador de juegos
        games++;
        gamesCounter.textContent = games;
        
        // Actualizar estadísticas
        updateStats();
        
        console.log('Número secreto generado:', secretNumber); // Para depuración
    }
    
    // Verificar el intento del usuario
    function checkGuess() {
        // Verificar si el juego está activo
        if (!gameActive) {
            return;
        }
        
        // Obtener el valor ingresado
        const userGuess = parseInt(guessInput.value);
        
        // Validar que sea un número
        if (isNaN(userGuess) || userGuess === '') {
            alert('Por favor, ingresa un número válido');
            guessInput.value = '';
            guessInput.focus();
            return;
        }
        
        // Validar que esté en el rango 1-10
        if (userGuess < 1 || userGuess > 10) {
            alert('Por favor, ingresa un número entre 1 y 10');
            guessInput.value = '';
            guessInput.focus();
            return;
        }
        
        // Incrementar intentos
        attempts++;
        attemptsElement.textContent = `Intentos: ${attempts}`;
        
        // Comprobar si adivinó
        if (userGuess === secretNumber) {
            // ¡Victoria!
            messageElement.textContent = `¡Felicidades! Has adivinado el número secreto: ${secretNumber}`;
            numberBox.textContent = secretNumber;
            
            // Actualizar estadísticas
            wins++;
            totalAttempts += attempts;
            winsCounter.textContent = wins;
            
            // Animaciones
            character.classList.add('celebrate');
            messageBubble.classList.add('pulse');
            
            // Desactivar el juego
            gameActive = false;
        } else if (userGuess < secretNumber) {
            // Número muy bajo
            messageElement.textContent = 'El número secreto es mayor.';
            updateCharacterExpression('higher');
        } else {
            // Número muy alto
            messageElement.textContent = 'El número secreto es menor.';
            updateCharacterExpression('lower');
        }
        
        // Limpiar el input
        guessInput.value = '';
        guessInput.focus();
        
        // Actualizar estadísticas
        updateStats();
    }
    
    // Actualizar expresión del personaje
    function updateCharacterExpression(hint) {
        const mouth = document.querySelector('.mouth');
        const leftEye = document.querySelector('.eye.left');
        const rightEye = document.querySelector('.eye.right');
        
        // Resetear animaciones
        character.classList.remove('celebrate');
        messageBubble.classList.remove('pulse');
        
        if (hint === 'higher') {
            // Mirar hacia arriba
            leftEye.style.top = '30px';
            rightEye.style.top = '30px';
            mouth.style.width = '20px';
            mouth.style.height = '10px';
        } else if (hint === 'lower') {
            // Mirar hacia abajo
            leftEye.style.top = '40px';
            rightEye.style.top = '40px';
            mouth.style.width = '20px';
            mouth.style.height = '10px';
        } else {
            // Restablecer expresión normal
            leftEye.style.top = '35px';
            rightEye.style.top = '35px';
            mouth.style.width = '30px';
            mouth.style.height = '15px';
        }
    }
    
    // Actualizar estadísticas
    function updateStats() {
        if (wins > 0) {
            const average = (totalAttempts / wins).toFixed(1);
            avgAttempts.textContent = average;
        } else {
            avgAttempts.textContent = '0';
        }
    }
    
    // Event listeners
    tryButton.addEventListener('click', checkGuess);
    
    // También permitir presionar Enter para enviar
    guessInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
    
    // Botón de reinicio
    resetButton.addEventListener('click', startNewGame);
    
    // Iniciar el primer juego al cargar
    startNewGame();
    
    // Navegación responsiva
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const checkBox = document.getElementById('check');
    
    // Cerrar menú al hacer clic en un enlace (para móvil)
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                checkBox.checked = false;
            }
        });
    });
});