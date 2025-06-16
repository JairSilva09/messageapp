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

### 2. Instala las dependencia
npm install

# .env
JWT_SECRET=claveSuperSecretaJWT123
DATABASE_USER=tu_usuario_mysql
DATABASE_PASSWORD=tu_contraseña_mysql
```
###🧱 Base de datos

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










