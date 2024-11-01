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



let currentIndex = 0;
    const carouselImages = document.querySelector('.carousel-images');
    let autoSlideInterval;
    
    function showSlide(index) {
        const images = carouselImages.querySelectorAll('img');
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === index) {
                img.classList.add('active');
            }
        });
    }
    
    function nextSlide() {
        const images = carouselImages.querySelectorAll('img');
        if (images.length === 0) return; // Si no hay imágenes, no hacer nada
        currentIndex = (currentIndex + 1) % images.length;
        showSlide(currentIndex);
    }
    
    function prevSlide() {
        const images = carouselImages.querySelectorAll('img');
        if (images.length === 0) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showSlide(currentIndex);
    }
    
    function addImages(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
    
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                if (carouselImages.querySelectorAll('img').length === 0) {
                    img.classList.add('active');
                }
                carouselImages.appendChild(img);
            };
    
            reader.readAsDataURL(file);
        }
    
        // Reiniciar el intervalo de auto-desplazamiento cuando se agreguen nuevas imágenes
        startAutoSlide();
    }
    function startAutoSlide() {
        // Si ya hay un intervalo en ejecución, limpiarlo primero
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    
        // Establecer un nuevo intervalo para cambiar la imagen cada 3 segundos
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    // Iniciar el auto-desplazamiento al cargar la página
    startAutoSlide();
    
    // Inicializa el carrusel con la primera imagen como activa (si existe alguna)
    showSlide(currentIndex);
    
