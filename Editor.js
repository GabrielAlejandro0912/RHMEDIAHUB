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
