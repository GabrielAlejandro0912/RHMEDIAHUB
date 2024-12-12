function loadGallery() {
    const galleryContainer = document.getElementById("galleryContainer");
    const images = JSON.parse(localStorage.getItem("carouselImages")) || [];
    if (images.length === 0) {
        galleryContainer.innerHTML = "<p>No hay imágenes en la galería.</p>";
        updateFooter(); // Actualizar el footer incluso si no hay imágenes
        return;
    }
    galleryContainer.innerHTML = ""; // Limpiar contenedor antes de cargar
    images.forEach((image, index) => {
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "image-wrapper";
        const imgElement = document.createElement("img");
        imgElement.src = image.url;
        imgElement.alt = image.name;
        imgElement.className = "gallery-image";
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.className = "delete-button";
        deleteButton.onclick = function () {
            deleteImage(index);
        };
        imgWrapper.appendChild(imgElement);
        imgWrapper.appendChild(deleteButton);
        galleryContainer.appendChild(imgWrapper);
    });
    updateFooter(); // Actualizar el footer después de cargar la galería
}
function deleteImage(index) {
    const images = JSON.parse(localStorage.getItem("carouselImages")) || [];
    if (index >= 0 && index < images.length) {
        images.splice(index, 1); // Eliminar la imagen del array
        localStorage.setItem("carouselImages", JSON.stringify(images));
        loadGallery(); // Recargar la galería
    }
}
// Cargar las imágenes al abrir la página
window.onload = loadGallery;


