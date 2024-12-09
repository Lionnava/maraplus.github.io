document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    const email = document.getElementById('email').value;
    const edad = document.getElementById('edad').value;
    const sexo = document.getElementById('sexo').value;

    const formData = {
        email: email,
        edad: edad,
        sexo: sexo
    };

    // Simulación de envío de datos y redirección, sin conexión a la base de datos
    setTimeout(() => {
        console.log('Datos simulados enviados:', formData);
        // Redirigir al usuario a connected.html
        window.location.href = 'connected.html';
    }, 500); // Simulación de medio segundo para enviar los datos

    // Descomenta esto y reemplaza la URL cuando el servidor esté activo
    /*
    fetch('https://example.com/api/save-data', { // Reemplaza esta URL con la de tu base de datos
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        showToast('¡Conexión exitosa!');
        setTimeout(() => {
            window.location.href = 'connected.html'; // Redireccionar al usuario a connected.html
        }, 2000); // Esperar 2 segundos antes de redirigir
    })
    .catch(error => {
        console.error('Error:', error);
        showToast('Error en la conexión. Redirigiendo...');
        setTimeout(() => {
            window.location.href = 'connected.html'; // Redireccionar al usuario a connected.html aunque haya error
        }, 2000); // Esperar 2 segundos antes de redirigir
    });
    */
});

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.visibility = 'visible';
}

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
}
<script>
        function handleSubmit(event) {
            event.preventDefault();

            const correo = document.querySelector('input[name="correo"]').value;
            const edad = document.querySelector('input[name="edad"]').value;
            const sexo = document.querySelector('select[name="sexo"]').value;
            const especialidad = document.querySelector('select[name="especialidad"]').value;

            // Guardar datos en archivo .csv
            const csvData = `Correo,Edad,Sexo,Especialidad\n${correo},${edad},${sexo},${especialidad}\n`;
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', 'datos.csv');
            a.click();

            // Redirigir a connected.html con los parámetros en la URL
            const params = new URLSearchParams({
                correo: correo,
                edad: edad,
                sexo: sexo,
                especialidad: especialidad
            });
            window.location.href = `./connected.html?${params.toString()}`;
        }
    </script>
