import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PerfilUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        axios.get(`/api/usuarios/${id}`)
            .then(response => setUsuario(response.data))
            .catch(error => console.error('Error fetching user:', error));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`/api/usuarios/${id}`, usuario)
            .then(() => navigate('/usuarios/lista'))
            .catch(error => console.error('Error al actualizar el usuario:', error));
    };

    if (!usuario) return <div>Loading...</div>;

    return (
        <div>
            <h1>Editar Usuario</h1>
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
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default PerfilUsuario;
