import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ListaUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        axios.get('/api/usuarios')
            .then(response => setUsuarios(response.data))
            .catch(error => console.error('Error al obtener los usuarios:', error));
    }, []);

    const eliminarUsuario = (id_usuario) => {  
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            axios.delete(`/api/usuarios/${id_usuario}`)
                .then(() => {
                    setUsuarios(usuarios.filter(usuario => usuario.id_usuario !== id_usuario));
                })
                .catch(error => console.error('Error al eliminar el usuario:', error));
        }
    };

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(usuario => (
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.id_usuario}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellidos}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.id_rol}</td>
                            <td>
                                <Link to={`/usuarios/${usuario.id_usuario}`}>Ver</Link>
                                <Link to={`/usuarios/actualizar/${usuario.id_usuario}`} className="btn-link">Actualizar</Link>
                                <button onClick={() => eliminarUsuario(usuario.id_usuario)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/usuarios/crear">Agregar Nuevo Usuario</Link>
        </div>
    );
};

export default ListaUsuarios;
