import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './autenticacion/Login';
import Register from './autenticacion/Register';
import ListaUsuario from './usuarios/ListaUsuarios';
import ActualizarUsuario from './usuarios/ActualizarUsuario';
import CrearUsuarios from './usuarios/CrearUsuarios';
import VerUsuario from './usuarios/VerUsuario';

function App() {
    return (
        <Router>
            <div className="App">
                <h1>Bienvenido a la App</h1>
                <Routes>
                    <Route path="/autenticacion/login" element={<Login />} />
                    <Route path="/autenticacion/register" element={<Register />} />
                    <Route path="/usuarios/lista" element={<ListaUsuario />} />
                    <Route path="/usuarios/crear" element={<CrearUsuarios />} />
                    <Route path="/usuarios/actualizar/:id" element={<ActualizarUsuario />} />
                    <Route path="/usuarios/:id_usuario" element={<VerUsuario />} />
                    {/* Otras rutas */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
