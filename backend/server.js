const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', userRoutes);

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,  
    user: 'root',
    password: 'D7711avidPineda',
    database: 'proyecto_bisan',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        throw err;
    }
    console.log('Conectado a la base de datos MySQL');
});


app.post('/register', (req, res) => {
    const { nombre, apellidos, correo, contrasena, id_rol } = req.body;
    console.log('Datos recibidos:', { nombre, apellidos, correo, contrasena, id_rol});  

    db.query('SELECT * FROM usuarios WHERE nombre = ?', [nombre], (err, result) => {
        if (err) {
            console.error('Error al buscar usuario:', err);  
            return res.status(500).send('Error en el servidor al buscar el usuario');
        }
        if (result.length > 0) {
            console.warn('Usuario ya existe:', nombre);  
            return res.status(400).send('El usuario ya existe');
        }

        const hashedPassword = bcrypt.hashSync(contrasena, 8);
        console.log('Contraseña encriptada:', hashedPassword);  

        
        db.query('INSERT INTO usuarios (nombre, apellidos, correo, contrasena, id_rol) VALUES (?, ?, ?, ?, ?)', [nombre, apellidos, correo,hashedPassword, id_rol], (err, result) => {
            if (err) {
                console.error('Error al insertar usuario:', err);  
                return res.status(500).send('Error en el servidor al insertar el usuario');
            }
            console.log('Usuario registrado con éxito:', nombre);  
            res.status(200).send({ message: 'Usuario registrado con éxito' });
        });
    });
});

app.post('/login', (req, res) => {
    const { correo, contrasena } = req.body;

    db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, result) => {
        if (err) {
            console.error('Error al buscar usuario en login:', err);
            return res.status(500).send('Error en el servidor');
        }
        if (result.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        const user = result[0];
        const isPasswordValid = bcrypt.compareSync(contrasena, user.contrasena);

        if (!isPasswordValid) {
            return res.status(401).send('Contraseña incorrecta');
        }

        
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        res.status(200).send({ auth: true, token });
    });
});



// Ruta para obtener todos los usuarios
app.get('/api/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).send('Error en el servidor al obtener los usuarios');
        }
        res.status(200).json(results);
    });
});

// Ruta para obtener todos los usuarios pod ID
app.get('/api/usuarios/:id', (req, res) => {
    const id_usuario = req.params.id;
    db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, result) => {
        if (err) {
            console.error('Error al obtener el usuario:', err);
            return res.status(500).send('Error en el servidor al obtener el usuario');
        }
        if (result.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).json(result[0]);
    });
});

// Ruta para Actualizar usuarios pod ID
app.put('/api/usuarios/:id', (req, res) => {
    const id_usuario = req.params.id;
    const { nombre, apellidos, correo, id_rol } = req.body;
    db.query('UPDATE usuarios SET nombre = ?, apellidos = ?, correo = ?, id_rol = ? WHERE id_usuario = ?', [nombre, apellidos, correo, id_rol, id_usuario], (err, result) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            return res.status(500).send('Error en el servidor al actualizar el usuario');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).send({ message: 'Usuario actualizado con éxito' });
    });
});


// Ruta para Eliminar usuarios pod ID
app.delete('/api/usuarios/:id', (req, res) => {
    const id_usuario = req.params.id;
    db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario], (err, result) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            return res.status(500).send('Error en el servidor al eliminar el usuario');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).send({ message: 'Usuario eliminado con éxito' });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});