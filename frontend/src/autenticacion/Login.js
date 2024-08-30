import React, { useState } from 'react';
import axios from 'axios';
import Register from './Register';  // Asegúrate de que la ruta es correcta

function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [message, setMessage] = useState('');
    const [isRegister, setIsRegister] = useState(false); // Estado para alternar entre login y registro


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/login', { correo, contrasena });
            setMessage(`Bienvenido a BISAN, ${correo}`);
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            setMessage('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div>
            {isRegister ? (
                <Register />  
            ) : (
                <div>
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleLogin} className='formulario-login'>
                        <div>
                            <label>Correo</label>
                            <input
                                type="email"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                                placeholder="Ingrese su correo"
                            />
                        </div>
                        <div>
                            <label>Contraseña</label>
                            <input
                                type="password"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                                required
                                placeholder="Ingrese su contraseña"
                            />
                        </div>
                        <button type="submit" className='btn-login'>Iniciar Sesión</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            )}

            <button onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? '¿Ya tienes una cuenta? Inicia Sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
        </div>
    );
}

export default Login;