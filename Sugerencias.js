// Requerir las dependencias necesarias

const express = require('express');
const path = require("path");
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
// Configurar la aplicación Express
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
    //res.sendFile("C:/Users/isdintern/Desktop/RHMEDIAHUB/Index.html")
});


// Ruta para manejar el formulario de sugerencias
app.post('/guardar-sugerencia', (req, res) => {
    const { empleadoNum, nombreCompleto, comentarios } = req.body;
    // Validar los datos
    if (!empleadoNum || !nombreCompleto || !comentarios) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Insertar datos en la base de datos
    const query = 'INSERT INTO sugerencias (empleado_num, nombre_completo, comentarios) VALUES (?, ?, ?)';
    db.query(query, [empleadoNum, nombreCompleto, comentarios], (err, result) => {
        if (err) {
            console.error('Error al insertar datos:', err);
            return res.status(500).send('Error al guardar la sugerencia.');
        }
        res.send('Sugerencia guardada exitosamente.');
    });
});

// Ruta para obtener todas las sugerencias
app.get('/ver-sugerencias', (req, res) => {
    const query = 'SELECT * FROM sugerencias';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al recuperar datos:', err);
            return res.status(500).send('Error al recuperar sugerencias.');
        }
        res.json(results);
    });
});


///////////////////////////////////////////////////////////////////////////
//Index 


























// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:3001${port}`);
});

