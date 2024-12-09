// Código del carrusel
const images = [];
const imageFormats = ['jpg', 'jpeg', 'png'];
const imageCount = 25; // Cambia 25 por el número total de imágenes que tienes

for (let i = 1; i <= imageCount; i++) {
    const imageNumber = i.toString().padStart(3, '0'); // Asegura que el número tiene 3 dígitos
    imageFormats.forEach(format => {
        const image = new Image();
        image.src = `recurso/img_${imageNumber}.${format}`;
        image.onload = () => {
            if (!images.includes(image.src)) {
                images.push(image.src);
            }
        };
        image.onerror = () => console.error(`Error loading image recurso/img_${imageNumber}.${format}`);
    });
}

const carousel = document.getElementById('carousel');
let index = 0;
let remainingImages = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateCarousel() {
    if (remainingImages.length === 0) {
        remainingImages = [...images];
        shuffle(remainingImages);
    }
    if (remainingImages.length > 0) {
        index = Math.floor(Math.random() * remainingImages.length);
        const currentImage = remainingImages.splice(index, 1)[0];
        carousel.innerHTML = `<img src="${currentImage}" alt="Imagen">`;
    } else {
        console.error("No images available to display.");
    }
}

window.onload = () => {
    // Carrusel de imágenes
    setTimeout(() => {
        shuffle(images);
        remainingImages = [...images];
        updateCarousel();  // Mostrar la primera imagen de inmediato
        setInterval(updateCarousel, 3000);  // Cambiar cada 3 segundos
    }, 1000);  // Espera un segundo para asegurar la carga de imágenes

    // Barra de progreso
    const progressBar = document.getElementById('progress-bar');
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            // Mostrar mensaje de éxito y redirigir
            showToast('¡Conexión exitosa!');
            setTimeout(() => {
                window.location.href = 'http://mikrotik.url'; // Reemplaza con la URL de tu MikroTik
            }, 2000); // Esperar 2 segundos antes de redirigir
        } else {
            width++;
            progressBar.style.width = width + '%';
            progressBar.innerHTML = width + '%';
        }
    }, 300); // Configurado para completar en 30 segundos (300ms * 100 = 30,000ms)
};

// Función para mostrar notificación tipo toast
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.visibility = 'visible';
    setTimeout(() => {
        toast.style.visibility = 'hidden';
    }, 4000); // Ocultar el toast después de 4 segundos
}
 // Obtener los parámetros de la URL
            const params = new URLSearchParams(window.location.search);
            const correo = params.get('correo');
            const edad = params.get('edad');
            const sexo = params.get('sexo');
            const especialidad = params.get('especialidad');

            // Simular la autenticación de Mikrotik y mostrar el progreso
            const progressBar = document.getElementById('progress-bar');
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 100) {
                    clearInterval(interval);
                    // Redirigir a la página de planes de Mikrotik después de 20 segundos
                    const mikrotikUrl = `http://<mikrotik_ip>/login?username=${correo}&password=${edad}`;
                    window.location.href = mikrotikUrl;
                } else {
                    width += 5; // Incremento del progreso
                    progressBar.style.width = width + '%';
                }
            }, 1000); // Actualizar cada 1 segundo
        </script>
