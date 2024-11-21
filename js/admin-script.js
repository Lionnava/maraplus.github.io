document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('image-form');
    const imageUrlInput = document.getElementById('image-url');
    const imageFileInput = document.getElementById('image-file');
    const imageList = document.getElementById('image-list');
    let images = JSON.parse(localStorage.getItem('carouselImages')) || [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const imageUrl = imageUrlInput.value;
        const imageFile = imageFileInput.files[0];

        if (imageUrl) {
            images.push(imageUrl);
            updateImageList();
            localStorage.setItem('carouselImages', JSON.stringify(images));
        } else if (imageFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                images.push(event.target.result);
                updateImageList();
                localStorage.setItem('carouselImages', JSON.stringify(images));
            };
            reader.readAsDataURL(imageFile);
        }

        imageUrlInput.value = '';
        imageFileInput.value = '';
    });

    function updateImageList() {
        imageList.innerHTML = '';
        images.forEach((url, index) => {
            const div = document.createElement('div');
            div.className = 'image-item';
            const img = document.createElement('img');
            img.src = url;
            img.style.maxWidth = '100px';
            const btn = document.createElement('button');
            btn.innerText = 'Eliminar';
            btn.onclick = () => {
                images.splice(index, 1);
                updateImageList();
                localStorage.setItem('carouselImages', JSON.stringify(images));
            };
            div.appendChild(img);
            div.appendChild(btn);
            imageList.appendChild(div);
        });
    }

    updateImageList(); // Inicializar la lista de imágenes
});
