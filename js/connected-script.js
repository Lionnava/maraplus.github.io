// Lista de imágenes (rutas actualizadas)
const images = [
    "recursos/imagen2.jpg",
    "recursos/imagen3.jpg",
    "recursos/imagen4.jpg",
    "recursos/imagen5.jpg",
    "recursos/imagen6.jpg",
    "recursos/imagen7.jpg",
    "recursos/imagen11.jpg",
    "recursos/imagen8.jpg",
    "recursos/imagen9.jpg",
    "recursos/imagen10.jpg"
];

// Función para mezclar el array de imágenes aleatoriamente
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Variables globales
let currentIndex = 0;
let shuffledImages = [...images];

// Mezclar imágenes al cargar la página
shuffleArray(shuffledImages);

// Función para verificar si una imagen existe
function checkImageExists(url, callback) {
    const img = new Image();
    img.onload = () => callback(true); // La imagen existe
    img.onerror = () => callback(false); // La imagen no existe
    img.src = url;
}

// Función para mostrar la siguiente imagen
function showNextImage() {
    const imageElement = document.getElementById("carouselImage");
    const progressBarFill = document.getElementById("progressBarFill");
    const progressBarText = document.getElementById("progressBarText");

    // Verificar si la imagen actual existe
    checkImageExists(shuffledImages[currentIndex], (exists) => {
        if (exists) {
            // Mostrar la siguiente imagen
            imageElement.src = shuffledImages[currentIndex];
            imageElement.style.opacity = 0; // Efecto de transición
            setTimeout(() => {
                imageElement.style.opacity = 1;
            }, 100);

            // Reiniciar la barra de progreso y el porcentaje
            progressBarFill.style.width = "0";
            progressBarText.textContent = "0%";

            // Animar la barra de progreso y actualizar el porcentaje
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                progressBarFill.style.width = `${progress}%`;
                progressBarText.textContent = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(interval);
                }
            }, 30); // Actualizar cada 30ms

            // Incrementar el índice o reiniciar el ciclo
            currentIndex++;
            if (currentIndex >= shuffledImages.length) {
                currentIndex = 0;
                shuffleArray(shuffledImages); // Mezclar nuevamente
            }
        } else {
            // Si la imagen no existe, saltar a la siguiente
            currentIndex++;
            if (currentIndex >= shuffledImages.length) {
                currentIndex = 0;
                shuffleArray(shuffledImages); // Mezclar nuevamente
            }
            showNextImage(); // Mostrar la siguiente imagen inmediatamente
        }
    });
}

// Ciclo principal
function startCarousel() {
    setInterval(() => {
        showNextImage();
    }, 3000); // Cambiar imagen cada 3 segundos (3000 ms)

    // Iniciar la primera imagen inmediatamente
    showNextImage();
}

// Redirigir al archivo google-auth-html después de completar el ciclo
function redirectToGoogleAuth() {
    setTimeout(() => {
        window.location.href = "google-auth.html"; // Reemplaza con la ruta real
    }, shuffledImages.length * 3000 + 1000); // Tiempo total del ciclo + 1 segundo extra
}

// Iniciar el carrusel y la redirección
document.addEventListener("DOMContentLoaded", () => {
    startCarousel();
    redirectToGoogleAuth();
});
