# JSON Web Tokens y Express.js

Este proyecto es una práctica de autenticación y autorización de usuarios utilizando JSON Web Tokens (JWT) en una aplicación web construida con Express.js.
Proporciona rutas para registrar nuevos usuarios, iniciar sesión y acceder al perfil del usuario autenticado.

## Instalación

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona este repositorio en tu máquina local.
2. Navega al directorio del proyecto
3. Ejecuta `npm install` para instalar las dependencias.
4. renombrar el `.env.example` a `.env`
5. Configura las variables de entorno necesarias:

- `MONGODB_URI`: Esta variable debe contener la URI de tu base de datos MongoDB. Puedes obtenerla a través de un servicio de MongoDB en la nube o configurar una base de datos local.

- `PORT`: Especifica el puerto en el que deseas ejecutar la aplicación.

- `SECRET`: clave secreta utilizada para firmar los JWT.

6. Inicia la aplicación con el comando `npm start`.

## Uso

# Registro de Usuario (Signup)

- **Ruta:** `POST /signup`

Esta ruta permite a los usuarios registrarse proporcionando un nombre de usuario, correo electrónico y contraseña. Después de registrar con éxito un nuevo usuario, se generará un JWT que se utilizará para la autenticación en futuras solicitudes.

- **Ejemplo de solicitud:**

```json
{
  "username": "ejemplo",
  "email": "ejemplo@gmail.com",
  "password": "contraseña123"
}
```

- **Ejemplo de respuesta:**

```json
{
  "auth": true,
  "token": "your-generated-jwt-token"
}
```

# Inicio de Sesión (Signin)

- **Ruta:** `POST /signin`

Esta ruta permite a los usuarios iniciar sesión proporcionando su correo electrónico y contraseña. Si las credenciales son válidas, se generará un nuevo JWT para la autenticación.

- **Ejemplo de solicitud:**

```json
{
  "email": "ejemplo@gmail.com",
  "password": "contraseña123"
}
```

- **Ejemplo de respuesta:**

```json
{
  "auth": true,
  "token": "your-generated-jwt-token"
}
```

# Perfil de Usuario (Profile)

- **Ruta:** `GET /profile`

Esta ruta requiere un JWT válido en el encabezado de la solicitud para acceder al perfil del usuario autenticado. El middleware verifyToken se utiliza para verificar la autenticación antes de permitir el acceso al perfil.

- **Ejemplo de solicitud con encabezado JWT::**

```json
Headers:
{
  "x-access-token": "Bearer your-generated-jwt-token"
}
```

- **Ejemplo de respuesta:**

```json
{
  "user": {
    "username": "ejemplo",
    "email": "ejemplo@gmail.com"
  }
}
```

# Errores

En caso de errores en las solicitudes, se proporcionarán mensajes de error adecuados junto con los códigos de estado correspondientes en las respuestas.

## Créditos

Este proyecto fue desarrollado por YisusAbet24
