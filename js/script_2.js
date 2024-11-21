const images = [];
for (let i = 1; i <= 5; i++) {
    let jpgImage = new Image();
    let jpegImage = new Image();
    jpgImage.src = `recurso/img_0${i < 10 ? '0' + i : i}.jpg`;
    jpegImage.src = `recurso/img_0${i < 10 ? '0' + i : i}.jpeg`;

    jpgImage.onload = () => images.push(jpgImage.src);
    jpegImage.onload = () => images.push(jpegImage.src);
}

const carousel = document.getElementById('carousel');
let index = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateCarousel() {
    carousel.innerHTML = `<img src="${images[index]}" alt="Imagen ${index + 1}">`;
    index = (index + 1) % images.length;
}

setInterval(updateCarousel, 3000);
window.onload = () => shuffle(images);  // Mezclar imágenes al cargar la página
