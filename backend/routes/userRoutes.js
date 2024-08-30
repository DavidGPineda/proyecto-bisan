const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Obtener todos los usuarios
router.get('/usuarios', userController.obtenerTodosUsuarios);

// Obtener un usuario por ID
router.get('/usuarios/:id', userController.obtenerUsuarioPorId);

// Crear un nuevo usuario
router.post('/usuarios', userController.crearUsuario);

// Actualizar un usuario por ID
router.put('/usuarios/:id', userController.actualizarUsuario);

// Eliminar un usuario por ID
router.delete('/usuarios/:id', userController.eliminarUsuario);

module.exports = router;
