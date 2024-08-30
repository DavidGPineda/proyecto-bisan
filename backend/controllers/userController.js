const db = require('../db'); 

exports.obtenerTodosUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuarios WHERE id_usuario = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellidos, correo, contrasena, id_rol } = req.body;
    await db.query('INSERT INTO usuarios (nombre, apellidos, correo, contrasena, id_rol) VALUES (?, ?, ?, ?, ?)', [nombre, apellidos, correo, contrasena, id_rol]);
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
exports.actualizarUsuario = async (req, res) => {
  try {
    const { nombre, apellidos, correo, contrasena, id_rol } = req.body;
    await db.query('UPDATE usuarios SET nombre = ?, apellidos = ?, correo = ?, contrasena = ?, id_rol = ? WHERE id_usuario = ?', [nombre, apellidos, correo, contrasena, id_rol, req.params.id]);
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
exports.eliminarUsuario = async (req, res) => {
  try {
    await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [req.params.id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
