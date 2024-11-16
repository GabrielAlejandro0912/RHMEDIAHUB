const carouselInner = document.getElementById("carouselInner");
const searchCarouselInput = document.getElementById("searchCarouselInput");
const previewGallery = document.getElementById("previewGallery");
// Función para cargar las imágenes en el carrusel
function loadCarouselImages() {
    carouselInner.innerHTML = ""; // Limpiar carrusel
    const storedImages = localStorage.getItem("carouselImages");
    if (storedImages) {
        const images = JSON.parse(storedImages);
        images.forEach((image, index) => {
            const div = document.createElement("div");
            div.className = "carousel-item" + (index === 0 ? " active" : "");
            const img = document.createElement("img");
            img.className = "d-block w-100";
            img.src = image.url;
            div.appendChild(img);
            carouselInner.appendChild(div);
        });
    }
}
// Función para cargar la vista previa de las imágenes filtradas
function loadPreviewImages(filter) {
    previewGallery.innerHTML = ""; // Limpiar vista previa
    const storedImages = localStorage.getItem("carouselImages");
    if (storedImages) {
        const images = JSON.parse(storedImages);
        images.forEach(image => {
            if (image.name.toLowerCase().includes(filter.toLowerCase())) {
                const colDiv = document.createElement('div');
                colDiv.classList.add('col-md-4', 'mb-4');
                const img = document.createElement('img');
                img.src = image.url;
                img.classList.add('img-fluid', 'rounded');
                colDiv.appendChild(img);
                previewGallery.appendChild(colDiv);
            }
        });
    }
}
// Cargar las imágenes al cargar la página
document.addEventListener("DOMContentLoaded", loadPreviewImages);
// Cargar todas las imágenes en el carrusel al abrir la página
document.addEventListener("DOMContentLoaded", function () {
    loadCarouselImages();
});
// Filtrar las imágenes cuando el usuario escribe en el campo de búsqueda
searchCarouselInput.addEventListener("input", function () {
    loadPreviewImages(this.value);
});
// Escuchar cambios en `localStorage` para sincronizar la vista previa
window.addEventListener("storage", function (event) {
    if (event.key === "galleryImages") {
        loadPreviewImages(); // Recargar la vista previa si se detectan cambios
    }
});

//////////////////////////////////////////////////////////////
//editor script
function showPreview() {
    const previewGrid = document.getElementById("previewGrid");
    previewGrid.innerHTML = ""; // Limpiar vista previa anterior
    const files = document.getElementById("imageUploader").files;

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.className = "preview-image";
            previewGrid.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}
// Función para generar un ID único
function generateUniqueId() {
    return 'img-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}
function saveimages() {
    if (!confirm("¿Quieres agregar estas imágenes ?")) return;
    const imageUploader = document.getElementById("imageUploader");
    const newImages = [];      // Para almacenar las nuevas imágenes            
    Array.from(imageUploader.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = {
                id: 'img-' + Date.now() + '-' + Math.floor(Math.random() * 1000),  // Generar un ID único
                name: file.name,   // Guardar el nombre del archivo
                url: e.target.result
            };
            newImages.push(imageData);
            if (index === imageUploader.files.length - 1) {
                const existingImages = JSON.parse(localStorage.getItem("carouselImages")) || [];
                const allImages = existingImages.concat(newImages);
                localStorage.setItem("carouselImages", JSON.stringify(allImages));
                alert("Imágenes guardadas y agregadas al carrusel con éxito!");
            }
        };
        reader.readAsDataURL(file);
    });
}
function clearimages() {
    localStorage.removeItem("carouselImages");
    alert("Todas las imágenes del carrusel han sido eliminadas.");
    document.getElementById("previewGrid").innerHTML = "";
}

//////////////////////////////////////////////////////////////////
//script de Galerias 





