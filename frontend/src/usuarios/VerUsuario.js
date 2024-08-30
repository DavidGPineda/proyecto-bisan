import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const VerUsuario = () => {
    const [usuario, setUsuario] = useState(null);
    const { id_usuario } = useParams();  
    const navigate = useNavigate();      

    useEffect(() => {
        axios.get(`/api/usuarios/${id_usuario}`)
            .then(response => setUsuario(response.data))
            .catch(error => {
                console.error('Error al obtener los detalles del usuario:', error);
                navigate('/usuarios');  
            });
    }, [id_usuario, navigate]);

    if (!usuario) {
        return <div>Cargando...</div>; 
    }

    return (
        <div>
            <h1>Detalles del Usuario</h1>
            <div>
                <p><strong>ID:</strong> {usuario.id_usuario}</p>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
                <p><strong>Correo:</strong> {usuario.correo}</p>
                <p><strong>Contrseña:</strong> {usuario.contrasena}</p>
                <p><strong>Rol:</strong> {usuario.id_rol}</p>
                <p><strong>Fecha de Registro:</strong> {usuario.fecha_registro}</p>
                <p><strong>Ultima Conexion:</strong> {usuario.ultima_conexion}</p>
                <p><strong>Estado:</strong> {usuario.estado}</p>
                <button onClick={() => navigate('/usuarios')}>Volver a la Lista</button>
            </div>
        </div>
    );
};

export default VerUsuario;
