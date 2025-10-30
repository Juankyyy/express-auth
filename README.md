# Express Auth

API REST con Express.js, MongoDB y JWT. Incluye autenticación de usuarios, sistema de posts con likes/reposts, y comentarios.

## 🚀 Características

- ✅ Autenticación JWT con cookies HTTP-only
- ✅ CRUD de usuarios, posts y comentarios
- ✅ Sistema de likes y reposts
- ✅ Validación con Zod y seguridad con Helmet
- ✅ Posts públicos/privados con imágenes

## 🛠️ Stack

- **Express.js** 5.1.0 | **MongoDB** + Mongoose 8.18.0
- **JWT** 9.0.2 | **bcrypt** 6.0.0 | **Zod** 4.1.5
- **Helmet** 8.1.0 | **CORS** 2.8.5

## 🔧 Instalación

```bash
# Clonar e instalar
git clone https://github.com/Juankyyy/express-auth.git
cd express-auth
pnpm install

# Configurar .env
PORT=1234
MONGODB_URI=mongodb://localhost:27017/express-auth
JWT_SECRET=tu_clave_secreta

# Iniciar
pnpm run dev
```

## 🔌 API Endpoints

### Usuarios
- `POST /users` - Registro
- `POST /users/login` - Login
- `POST /users/logout` - Logout
- `GET /users` - Listar usuarios
- `GET /users/:id` - Obtener usuario
- `PATCH /users/:id` - Actualizar usuario

### Posts 🔒
- `GET /posts` - Listar posts
- `GET /posts/:id` - Obtener post (con populate)
- `POST /posts` - Crear post
- `PATCH /posts/:id` - Actualizar post
- `PATCH /posts/:id/like` - Toggle like
- `PATCH /posts/:id/repost` - Toggle repost

### Comentarios 🔒
- `GET /comments` - Listar comentarios
- `GET /comments/:id` - Obtener comentario
- `POST /comments` - Crear comentario

🔒 = Requiere autenticación JWT (cookie)