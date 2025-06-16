# 📩 SendMeApp - API de Mensajes con NestJS

Una API RESTful construida con [NestJS](https://nestjs.com/) que permite crear, leer, actualizar y eliminar mensajes. Incluye autenticación y autorización con JWT, control de usuarios, y protección de rutas para garantizar que solo los autores puedan modificar sus propios mensajes.

---

## 🚀 Tecnologías

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- MySQL
- JWT (JSON Web Token)
- `dotenv` para variables de entorno

---

## 🛠️ Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/sendmeapp.git
cd sendmeapp

## 2. Instala las dependencia
npm install

# .env
JWT_SECRET=claveSuperSecretaJWT123
DATABASE_USER=tu_usuario_mysql
DATABASE_PASSWORD=tu_contraseña_mysql
```
##🧱 Base de datos

La base de datos se llama sendmeapp y tiene dos tablas relacionadas
📄 Tabla: usuario

| Campo    | Tipo         |
| -------- | ------------ |
| id       | int (PK)     |
| nick     | varchar(255) |
| email    | varchar(255) |
| password | varchar(255) |
| rol      | varchar(255) |

📨 Tabla: mensaje

| Campo     | Tipo         |
| --------- | ------------ |
| id        | int (PK)     |
| mensaje   | varchar(255) |
| nick      | varchar(255) |
| usuarioId | int (FK)     |

Relación: Un usuario puede tener varios mensajes.

##🔐 Autenticación y autorización
El sistema usa JWT para autenticar usuarios.
Solo el autor de un mensaje puede editarlo o eliminarlo.
Las rutas protegidas están guardadas con @UseGuards() y roles.

##  Comandos útiles
```bash
# Iniciar en desarrollo
npm run start:dev

# Compilar
npm run build

# Ejecutar en producción
npm run start:prod
```

##🧑‍💻 Endpoints principales
Path dev: http://localhost:3000/api/v1/
Path prod: {tu host}/api/v1/
POST /api/v1/auth/register → Registro de usuarios
POST /api/v1/auth/login → Inicio de sesión (devuelve token JWT)
GET /api/v1/mensajes → Listar mensajes
POST /api/v1/mensajes → Crear mensaje (requiere JWT)
PATCH /api/v1/mensajes/:id → Editar mensaje (solo autor)
DELETE /api/v1/mensajes/:id → Eliminar mensaje (solo autor)

##📌 Notas
Asegúrate de tener MySQL corriendo con una base de datos llamada sendmeapp.
La sincronización de entidades (synchronize: true) está habilitada solo para desarrollo.
Usa contraseñas seguras en producción y cambia el JWT_SECRET.

##📜 Licencia
MIT © Jair Fernando Silva








