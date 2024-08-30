import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearUsuarios = () => {
    const [usuario, setUsuario] = useState({ nombre: '', apellidos: '', correo: '', id_rol: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/usuarios', usuario);
            navigate('/usuarios/lista');
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        }
    };

    return (
        <div>
            <h1>Agregar Nuevo Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input type="text" value={usuario.nombre} onChange={e => setUsuario({ ...usuario, nombre: e.target.value })} />
                </label>
                <label>
                    Apellidos:
                    <input type="text" value={usuario.apellidos} onChange={e => setUsuario({ ...usuario, apellidos: e.target.value })} />
                </label>
                <label>
                    Correo:
                    <input type="email" value={usuario.correo} onChange={e => setUsuario({ ...usuario, correo: e.target.value })} />
                </label>
                <label>
                    Rol:
                    <input type="number" value={usuario.id_rol} onChange={e => setUsuario({ ...usuario, id_rol: e.target.value })} />
                </label>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default CrearUsuarios;
