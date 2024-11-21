// Código para la barra de progreso
let progress = document.getElementById('progress');
let successMessage = document.getElementById('success-message');
let width = 0;
let interval = setInterval(() => {
    if (width >= 100) {
        clearInterval(interval);
        successMessage.style.display = 'block'; // Mostrar el mensaje de éxito
        alert('TE HAS CONECTADO CON TOTAL ÉXITO!!!'); // Notificación emergente
    } else {
        width++;
        progress.style.width = width + '%';
    }
}, 100); // Ajustado para que dure aproximadamente 10 segundos
