# Express Auth

API REST completa con Express.js, MongoDB y JWT. Sistema integral que incluye gestión de usuarios con autenticación, sistema de publicaciones (posts) con likes y reposts, y sistema de comentarios. Ideal para proyectos tipo red social o plataforma de contenido.

## 🚀 Características

- ✅ Registro de usuarios con validación de datos
- ✅ Inicio de sesión con autenticación JWT
- ✅ Cierre de sesión
- ✅ Gestión de usuarios (CRUD)
- ✅ Sistema de publicaciones (Posts)
  - Crear, leer y actualizar posts
  - Sistema de likes con contador
  - Sistema de reposts con contador
  - Soporte para múltiples imágenes
  - Posts públicos y privados
  - Populate de comentarios y usuario
- ✅ Sistema de comentarios
  - Crear comentarios en posts
  - Sistema de likes en comentarios
  - Soporte para imágenes en comentarios
- ✅ Middleware de autenticación JWT
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
├── app.js                       # Punto de entrada de la aplicación
├── db.js                        # Configuración de la conexión a MongoDB
├── package.json                 # Dependencias y scripts
├── controllers/                 # Lógica de negocio
│   ├── user.js                 # Controlador de usuarios
│   ├── post.controller.js      # Controlador de posts
│   └── commentController.js    # Controlador de comentarios
├── models/                      # Modelos de datos
│   ├── user.js                 # Modelo de usuario
│   ├── post.model.js           # Modelo de posts
│   └── Comment.js              # Modelo de comentarios
├── routes/                      # Definición de rutas
│   ├── users.js                # Rutas de usuarios
│   ├── posts.routes.js         # Rutas de posts
│   └── comments.js             # Rutas de comentarios
├── schemas/                     # Esquemas de Mongoose
│   ├── user.js                 # Esquema de usuario
│   ├── post.js                 # Esquema de post
│   └── commentSchema.js        # Esquema de comentario
├── validations/                 # Validaciones con Zod
│   ├── user.js                 # Validaciones de usuario
│   ├── post.js                 # Validaciones de posts
│   └── commentValidation.js    # Validaciones de comentarios
└── middlewares/                 # Middlewares personalizados
    ├── cors.js                 # Configuración de CORS
    └── auth.middleware.js      # Middleware de autenticación JWT
```

## 🔌 API Endpoints

### Ruta Base
```
GET /
```
Respuesta: `"Hola, Auth!"`

### Autenticación

#### 🔐 Middleware de Autenticación

La API utiliza JWT (JSON Web Tokens) para proteger rutas sensibles. Los endpoints que requieren autenticación están marcados con 🔒.

**Headers requeridos:**
- Cookie `jwt` (establecida automáticamente en login)

**Respuestas de error de autenticación:**
- `401 Unauthorized`: "No has iniciado sesión" | "Token inválido" | "Token expirado"

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

---

### Posts (Publicaciones)

#### 1. Obtener todos los posts
```http
GET /posts
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "description": "Mi primer post",
    "images": ["https://ejemplo.com/imagen1.jpg"],
    "likes": [],
    "likesCount": 0,
    "repost": [],
    "repostCount": 0,
    "comments": [],
    "visibility": "public",
    "createdAt": "2025-10-29T19:26:41.000Z",
    "updatedAt": "2025-10-29T19:26:41.000Z"
  }
]
```

#### 2. Obtener post por ID (con populate) 🔒
```http
GET /posts/:id
```

**Parámetros:**
- `id` - ID del post (MongoDB ObjectId)

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": {
    "_id": "507f1f77bcf86cd799439012",
    "username": "usuario1"
  },
  "description": "Mi primer post",
  "images": ["https://ejemplo.com/imagen1.jpg"],
  "likes": [],
  "likesCount": 0,
  "repost": [],
  "repostCount": 0,
  "comments": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "content": "¡Excelente post!",
      "userId": "507f1f77bcf86cd799439014"
    }
  ],
  "visibility": "public",
  "createdAt": "2025-10-29T19:26:41.000Z",
  "updatedAt": "2025-10-29T19:26:41.000Z"
}
```

**Nota:** Este endpoint hace populate de `comments` y `userId` para traer toda la información relacionada.

#### 3. Crear post 🔒
```http
POST /posts
```
**Requiere autenticación**

**Body (JSON):**
```json
{
  "description": "Contenido del post",
  "images": ["https://ejemplo.com/imagen1.jpg", "https://ejemplo.com/imagen2.jpg"],
  "visibility": "public"
}
```

**Validaciones:**
- Description: requerido, mínimo 1 carácter, máximo 200 caracteres
- Images: array de strings (opcional)
- Visibility: "public" o "private" (default: "public")

**Respuesta exitosa (201):**
```json
{
  "message": "Post creado",
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "description": "Contenido del post",
    "images": ["https://ejemplo.com/imagen1.jpg"],
    "likes": [],
    "likesCount": 0,
    "repost": [],
    "repostCount": 0,
    "comments": [],
    "visibility": "public"
  }
}
```

#### 4. Actualizar post 🔒
```http
PATCH /posts/:id
```
**Requiere autenticación**

**Parámetros:**
- `id` - ID del post

**Body (JSON) - Todos los campos son opcionales:**
```json
{
  "description": "Nuevo contenido",
  "images": ["https://ejemplo.com/nueva-imagen.jpg"],
  "visibility": "private"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Post actualizado",
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "description": "Nuevo contenido",
    "images": ["https://ejemplo.com/nueva-imagen.jpg"],
    "visibility": "private"
  }
}
```

#### 5. Toggle Like en post 🔒
```http
PATCH /posts/:id/like
```
**Requiere autenticación**

**Parámetros:**
- `id` - ID del post

**Respuesta exitosa (200):**
```json
{
  "message": "Le diste like",
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "likes": ["507f1f77bcf86cd799439012"],
    "likesCount": 1
  }
}
```

**Nota:** Si ya le habías dado like, el mensaje será "Le quitaste el like" y se decrementará el contador.

#### 6. Toggle Repost 🔒
```http
PATCH /posts/:id/repost
```
**Requiere autenticación**

**Parámetros:**
- `id` - ID del post

**Respuesta exitosa (200):**
```json
{
  "message": "Reposteado",
  "post": {
    "_id": "507f1f77bcf86cd799439011",
    "repost": ["507f1f77bcf86cd799439012"],
    "repostCount": 1
  }
}
```

**Nota:** Si ya habías reposteado, el mensaje será "Repost quitado" y se decrementará el contador.

---

### Comentarios

#### 1. Obtener todos los comentarios
```http
GET /comments
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "postId": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "content": "Excelente post!",
    "images": [],
    "likes": [],
    "likesCount": 0,
    "repost": [],
    "repostCount": 0,
    "createdAt": "2025-10-29T19:26:41.000Z",
    "updatedAt": "2025-10-29T19:26:41.000Z"
  }
]
```

#### 2. Obtener comentario por ID
```http
GET /comments/:id
```

**Parámetros:**
- `id` - ID del comentario (MongoDB ObjectId)

**Respuesta exitosa (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "postId": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "content": "Excelente post!",
  "images": [],
  "likes": [],
  "likesCount": 0,
  "repost": [],
  "repostCount": 0
}
```

#### 3. Crear comentario 🔒
```http
POST /comments
```
**Requiere autenticación**

**Body (JSON):**
```json
{
  "postId": "507f1f77bcf86cd799439011",
  "content": "¡Excelente post!",
  "images": ["https://ejemplo.com/imagen.jpg"]
}
```

**Validaciones:**
- postId: requerido, debe ser un ObjectId válido
- content: requerido, mínimo 1 carácter, máximo 200 caracteres
- images: array de strings (opcional)

**Respuesta exitosa (201):**
```json
{
  "message": "Comentario creado",
  "comment": {
    "_id": "507f1f77bcf86cd799439013",
    "postId": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "content": "¡Excelente post!",
    "images": ["https://ejemplo.com/imagen.jpg"],
    "likes": [],
    "likesCount": 0,
    "repost": [],
    "repostCount": 0
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
- Middleware de autenticación JWT para proteger rutas sensibles
  - Verifica la existencia y validez del token
  - Maneja tokens expirados e inválidos
  - Previene acceso no autorizado a recursos protegidos

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