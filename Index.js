// Requerir las dependencias necesarias
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require("path");
// Configurar la aplicación Express
const app = express();
const port = 3001;
// Configurar Body Parser para manejar datos POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'sugerencias'
});
// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

//Muestra los html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/Index.html"));
});




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
function clearimages() {
    localStorage.removeItem("carouselImages");
    alert("Todas las imágenes del editor han sido eliminadas.");
    document.getElementById("previewGrid").innerHTML = "";
}





