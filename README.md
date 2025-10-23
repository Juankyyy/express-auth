# Express Auth

API REST de autenticación con Express.js, MongoDB y JWT. Sistema completo de gestión de usuarios con registro, inicio de sesión, cierre de sesión y actualización de datos.

## 🚀 Características

- ✅ Registro de usuarios con validación de datos
- ✅ Inicio de sesión con autenticación JWT
- ✅ Cierre de sesión
- ✅ Gestión de usuarios (CRUD)
- ✅ Encriptación de contraseñas con bcrypt
- ✅ Validación de datos con Zod
- ✅ Middleware de seguridad con Helmet
- ✅ Configuración de CORS
- ✅ Cookies HTTP-only para tokens

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express.js** (v5.1.0) - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** (v8.18.0) - ODM para MongoDB
- **JWT** (jsonwebtoken v9.0.2) - Autenticación mediante tokens
- **bcrypt** (v6.0.0) - Encriptación de contraseñas
- **Zod** (v4.1.5) - Validación de esquemas
- **Helmet** (v8.1.0) - Seguridad HTTP
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing
- **dotenv** (v17.2.1) - Variables de entorno
- **cookie-parser** (v1.4.7) - Parseo de cookies

## 📋 Requisitos Previos

- Node.js (versión 18 o superior recomendada)
- MongoDB (local o en la nube)
- pnpm (v10.11.0 o superior)

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Juankyyy/express-auth.git
cd express-auth
```

2. Instala las dependencias:
```bash
pnpm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=1234
MONGODB_URI=mongodb://localhost:27017/express-auth
JWT_SECRET=tu_clave_secreta_aqui
```

4. Inicia el servidor:
```bash
pnpm run dev
```

El servidor se ejecutará en `http://localhost:1234` (o el puerto especificado en tu archivo `.env`).

## 📁 Estructura del Proyecto

```
express-auth/
├── app.js                  # Punto de entrada de la aplicación
├── db.js                   # Configuración de la conexión a MongoDB
├── package.json            # Dependencias y scripts
├── controllers/            # Lógica de negocio
│   └── user.js            # Controlador de usuarios
├── models/                 # Modelos de datos
│   └── user.js            # Modelo de usuario
├── routes/                 # Definición de rutas
│   └── users.js           # Rutas de usuarios
├── schemas/                # Esquemas de Mongoose
│   └── user.js            # Esquema de usuario
├── validations/            # Validaciones con Zod
│   └── user.js            # Validaciones de usuario
└── middlewares/            # Middlewares personalizados
    └── cors.js            # Configuración de CORS
```

## 🔌 API Endpoints

### Ruta Base
```
GET /
```
Respuesta: `"Hola, Auth!"`

### Usuarios

#### 1. Obtener todos los usuarios
```http
GET /users
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "username": "usuario1"
  }
]
```

#### 2. Obtener usuario por ID
```http
GET /users/:id
```

**Parámetros:**
- `id` - ID del usuario (MongoDB ObjectId)

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "usuario1"
}
```

#### 3. Crear usuario (Registro)
```http
POST /users
```

**Body (JSON):**
```json
{
  "username": "nuevo_usuario",
  "password": "contraseña123"
}
```

**Validaciones:**
- Username: mínimo 3 caracteres, máximo 50 caracteres
- Password: mínimo 3 caracteres, máximo 50 caracteres

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario creado",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "nuevo_usuario"
  }
}
```

#### 4. Iniciar sesión
```http
POST /users/login
```

**Body (JSON):**
```json
{
  "username": "usuario1",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Usuario logueado",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "usuario1"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Nota:** El token JWT también se establece como cookie HTTP-only.

#### 5. Cerrar sesión
```http
POST /users/logout
```

**Respuesta exitosa (200):**
```json
{
  "message": "Usuario cerró sesión"
}
```

#### 6. Actualizar usuario
```http
PATCH /users/:id
```

**Parámetros:**
- `id` - ID del usuario

**Body (JSON) - Todos los campos son opcionales:**
```json
{
  "username": "nuevo_username",
  "password": "nueva_contraseña"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Usuario actualizado",
  "user": {
    "acknowledged": true,
    "modifiedCount": 1,
    "matchedCount": 1
  }
}
```

## 🔒 Seguridad

- Las contraseñas se encriptan con **bcrypt** antes de almacenarse
- Tokens JWT con expiración de 1 día
- Cookies HTTP-only y SameSite para prevenir XSS y CSRF
- Helmet para configurar headers de seguridad HTTP
- Validación de datos en todas las entradas con Zod
- CORS configurado para orígenes específicos

## 🧪 Desarrollo

### Scripts disponibles:

```bash
# Iniciar servidor en modo desarrollo con hot-reload
pnpm run dev
```

### Linting:

El proyecto utiliza ESLint con Prettier para mantener la calidad del código.

## 📝 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

| Variable       | Descripción                          | Ejemplo                                      |
|---------------|--------------------------------------|----------------------------------------------|
| `PORT`        | Puerto del servidor                  | `1234`                                       |
| `MONGODB_URI` | URI de conexión a MongoDB            | `mongodb://localhost:27017/express-auth`     |
| `JWT_SECRET`  | Clave secreta para firmar tokens JWT | `mi_clave_super_secreta_123`                 |

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

ISC

## ✨ Autor

Juankyyy

---

**Nota:** Este es un proyecto de ejemplo educativo. Para un entorno de producción, considera implementar características adicionales como:
- Refresh tokens
- Rate limiting
- Verificación de email
- Recuperación de contraseña
- Roles y permisos
- Auditoría de logs
- Tests unitarios e integración