# proyecto-bisan
Instrucciones 

 Pasos para Clonar el Repositorio
1. Abre tu terminal o consola de comandos.
2. Navega a la carpeta donde deseas clonar el repositorio:
cd ~/Documents/pruebas-git/prueba   O cualquier otra carpeta donde desees clonar
3. Clona el repositorio desde GitHub:
git clone https://github.com/DavidGPineda/proyecto-bisan.git
Esto creará una nueva carpeta llamada `proyecto-bisan` en tu directorio actual con todos los archivos del repositorio.
Paso 1: Navegar a la Carpeta Clonada
4. Navega a la carpeta clonada:
cd proyecto-bisan
Paso 2: Instalar Dependencias (Backend y Frontend)
Si tu proyecto tiene un backend y un frontend, necesitarás instalar las dependencias para ambos. 
Para el Backend (Node con Express)
5. Navega a la carpeta del backend e instala las dependencias:
cd backend
npm install
Para el Frontend (React)
6. Navega a la carpeta del frontend e instala las dependencias:
   
cd ../frontend   Regresa a la raíz y luego accede a frontend
npm install

 Paso 3: Ejecutar el Proyecto
Ahora puedes ejecutar ambos proyectos.
 Ejecutar el Backend
8. Navega a la carpeta del backend (si no lo hiciste antes):
   cd ../backend
9. Ejecuta el servidor (asegúrate de que el archivo de entrada sea `servidor.js`):
   npm start -  O el comando específico que uses para iniciar tu servidor (node servidor.js)
 Ejecutar el Frontend
10. Ahora, navega de nuevo a la carpeta del frontend:
   cd ../frontend
11. Ejecuta la aplicación React:
    npm start
 Verifica que Funcione
12. Abre tu navegador y visita `http://localhost:3000` (o el puerto que esté configurado para tu aplicación React). Deberías ver tu aplicación funcionando.
 Solucionar Problemas
- Si encuentras algún error al ejecutar los comandos, revisa los mensajes en la terminal para identificar lo que puede estar fallando. Puede ser que necesites algún ajuste en tu archivo de configuración o en las dependencias.
¡Con estos pasos, deberías poder clonar y probar tu proyecto sin problemas!

// ---------------------------------

Crear el archivo .env con la siguiente información: 

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=DDDDD77777david

DB_NAME=prueba

DB_PORT=3306

JWT_SECRET=123456789

Cambiar la contraseña y el nombre de la base de datos por la suya, modificar tambiar el archivo bd en config
(Importante colocar el archivo .env en la carpeta principal del backend, es  decir, en la carpeta backend)

Esta es la base de datos (El orden de creación de las tablas es de arriba hacia abajo, en orden) (Para utilizar la plataforma debe primero registrarse y después iniciar sesión, No debería tener problemas con el registro ya que al iniciar el servidor, se crear dos roles en la tabla roles en la base de datos de forma automática, como puede evidenciar en el archivo servidor.js en el backend (Si presenta problemas, crear en la tabla roles lo siguiente = (insert into roles (nombre_rol) values ("administrador");
insert into roles (nombre_rol) values ("estudiante");
))): 

Base de Datos 

create database prueba; (O el nombre que desee - Si lo cambia, tendrá que cambiarlo en el backend, en el .env y en bd.js en config)

use prueba;

create table roles (
	id_rol INT unsigned auto_increment primary key,
	nombre_rol VARCHAR(50) not null unique
);

CREATE TABLE usuarios (
    id_usuario INT unsigned auto_increment primary key,
    nombre VARCHAR(50) not null,
    apellidos VARCHAR(50) not null,
    correo VARCHAR(255) unique not null,
    contrasena VARCHAR(64) not null,
    id_rol INT unsigned not null,
   	fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_conexion TIMESTAMP DEFAULT NULL,
    estado ENUM('activo', 'inactivo') not null,
    foreign key (id_rol) references roles(id_rol)
);

CREATE TABLE cursos (
    id_curso INT unsigned auto_increment primary key,
    nombre_curso VARCHAR(100) not null,
    descripcion VARCHAR(1000) not null,
    precio DECIMAL(10, 0) not null,
    fecha_inicio DATE not null,
    fecha_fin DATE not null,
    id_profesor INT unsigned default NULL,  
    nombre_creador VARCHAR(50) not null,
    imagen_url VARCHAR(255) default NULL
);

CREATE TABLE modulos (
    id_modulo INT unsigned auto_increment primary key,
    id_curso INT unsigned default NULL,
    nombre_modulo VARCHAR(100) not null,
    descripcion VARCHAR(1000) not null,
    orden INT default NULL,
    foreign key (id_curso) references cursos(id_curso)
);

CREATE TABLE lecciones (
    id_leccion INT unsigned auto_increment primary key,
    id_modulo INT unsigned default NULL,
    titulo VARCHAR(100) not null,
    contenido LONGTEXT,
    duracion INT not null,
    tipo_contenido ENUM('texto', 'video', 'quiz', 'archivo') not null,
    url_contenido VARCHAR(255) default NULL,
    orden INT default NULL,
    completada TINYINT(1) default '0',
    foreign key (id_modulo) references modulos(id_modulo)
);

CREATE TABLE evaluaciones (
    id_evaluacion INT unsigned auto_increment primary key,
    id_curso INT unsigned default NULL,
    titulo VARCHAR(100) not null,
    descripcion VARCHAR(1000) not null,
    fecha_inicio DATE not null,
    fecha_fin DATE not null,
    tipo ENUM('quiz', 'examen', 'tarea') not null,
    ponderacion INT default NULL,
    foreign key (id_curso) references cursos(id_curso)
);

create table preguntas (
    id_pregunta INT unsigned auto_increment primary key,
    id_evaluacion INT unsigned,
    pregunta TEXT not null,
    tipo ENUM('opcion_multiple', 'verdadero_falso', 'respuesta_corta') not null,
    foreign key (id_evaluacion) references evaluaciones(id_evaluacion)
);

create table opciones (
    id_opcion INT unsigned auto_increment primary key,
    id_pregunta INT unsigned,
    opcion TEXT not null,
    es_correcta BOOLEAN DEFAULT 0,
    foreign key (id_pregunta) references preguntas(id_pregunta)
);

create table respuestas (
    id_respuesta INT unsigned auto_increment primary key,
    id_usuario INT unsigned,
    id_pregunta INT unsigned,
    id_opcion INT unsigned,
    foreign key (id_usuario) references usuarios(id_usuario),
    foreign key (id_pregunta) references preguntas(id_pregunta),
    foreign key (id_opcion) references opciones(id_opcion)
);

CREATE TABLE inscripcion_cursos (
    id_inscripcion INT unsigned auto_increment primary key,
    id_usuario INT unsigned default NULL,
    id_curso INT unsigned default NULL,
    fecha_inscripcion DATE NULL,
    fecha_finalizacion DATE NULL, 
    estado ENUM('activo', 'completado', 'cancelado') not null,
    foreign key (id_usuario) references usuarios(id_usuario),
    foreign key (id_curso) references cursos(id_curso)
);

create table foros (
    id_foro INT unsigned auto_increment primary key,
    id_usuario INT unsigned,
    titulo VARCHAR(100) not null,
    descripcion LONGTEXT not null,
    fecha_creacion TIMESTAMP default CURRENT_TIMESTAMP,
    foreign key (id_usuario) references usuarios(id_usuario)
);

CREATE TABLE publicaciones (
    id_publicacion INT unsigned auto_increment primary key,
    id_foro INT unsigned,
    id_usuario INT unsigned,
    contenido LONGTEXT not null, 
    fecha_publicacion TIMESTAMP default CURRENT_TIMESTAMP,
    foreign key (id_foro) references foros(id_foro),
    foreign key (id_usuario) references usuarios(id_usuario)
);

create table temas (
    id_tema SERIAL PRIMARY KEY,
    id_foro INT unsigned NOT NULL, 
    titulo VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_usuario INT unsigned,  -- Asegúrate que sea 'unsigned'
    foreign key (id_foro) references foros(id_foro) ON DELETE CASCADE,
    foreign key (id_usuario) references usuarios(id_usuario) ON DELETE SET NULL
);

(Para ver todas las funcionalidades tendrá que registrarse dos veces, una con id rol = 1 y otra con id rol = 2, uno para administradores y 2 para usuarios o estudiantes, así podrá ver las funcionalidades de administrador y funcionalidades de usuario o estudiante)



