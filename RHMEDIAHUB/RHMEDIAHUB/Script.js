/*
    // Selecciona los elementos del DOM
    const imageInput = document.getElementById('imageInput');
    const addImageBtn = document.getElementById('addImageBtn');
    const carouselInner = document.getElementById('carousel-inner');
    // Escuchar el click en el botón para agregar la imagen
    addImageBtn.addEventListener('click', function() {
        const file = imageInput.files[0];
        if (file) {
            // Crear un FileReader para cargar la imagen
            const reader = new FileReader();
            reader.onload = function(e) {
                // Crear una nueva <div> con la clase "carousel-item"
                const newCarouselItem = document.createElement('div');
                newCarouselItem.classList.add('carousel-item');
                // Crear la nueva imagen
                const newImage = document.createElement('img');
                newImage.src = e.target.result;
                newImage.classList.add('d-block', 'w-100');
                newImage.alt = 'Nueva Imagen';
                // Añadir la imagen a la nueva "carousel-item"
                newCarouselItem.appendChild(newImage);
                // Añadir el nuevo item al carrusel
                carouselInner.appendChild(newCarouselItem);
            };
            // Leer la imagen como una URL de datos
            reader.readAsDataURL(file);
        } else {
            alert('Por favor selecciona una imagen.');
        }
    }); */




































    