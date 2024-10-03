# Microservicio Usuarios

Este proyecto es un microservicio para la gestión de usuarios utilizando **NestJS** y **MongoDB**.

## Estructura del Proyecto

- `src/modules/`
    - `users/`
        - `dto/`
            - `create-user.dto.ts`: DTO para la creación de usuarios.
            - `login-user.dto.ts`: DTO para el login de usuarios.
        - `schemas/`
            - `user.schema.ts`: Definición del esquema de usuario.
            - `role.schema.ts`: Definición del esquema de rol.
        - `users.controller.ts`: Controlador para la gestión de usuarios.
        - `users.service.ts`: Servicio para la gestión de usuarios.
        - `users.module.ts`: Módulo de usuarios.
        - `roles.controller.ts`: Controlador para la gestión de roles.
        - `roles.service.ts`: Servicio para la gestión de roles.
        - `roles.module.ts`: Módulo de roles.
    - `app.module.ts`: Módulo principal de la aplicación.
    - `app.controller.ts`: Controlador principal de la aplicación.
    - `app.service.ts`: Servicio principal de la aplicación.
    - `auth.middleware.ts`: Middleware de autenticación.

## Configuración

1. Clonar el repositorio.
2. Configurar la base de datos en el archivo `src/modules/app.module.ts`.
3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Ejecutar la aplicación:

   ```bash
   npm run build
   npm run start
   ```
#### IMPORTANTE: Tengan cuidado con la ruta en que se genera el archivo `main.js` al momento de buildear el proyecto:
Asegúrense de que se genere en la ruta correspondiente, actualmente debería generarse en la ruta `./dist/modules`. Esta configuración debe estar presente tanto en el `package.json` como en el `package-lock.json`.
## Uso

### Endpoints

**Usuarios:**
- **POST /users**: Registrar un nuevo usuario.
- **POST /users/login**: Iniciar sesión.
- **GET /users**: Obtener todos los usuarios.
- **GET /users/{id}**: Obtener un usuario por ID.
- **PUT /users/{id}**: Actualizar un usuario por ID.
- **DELETE /users/{id}**: Eliminar un usuario por ID.

**Roles:**
- **POST /roles**: Crear un nuevo rol.
- **GET /roles**: Obtener todos los roles.
- **GET /roles/{id}**: Obtener un rol por ID.
- **PUT /roles/{id}**: Actualizar un rol por ID.
- **DELETE /roles/{id}**: Eliminar un rol por ID.


## Endpoints

### Usuarios:
- **POST /users**: Crear un nuevo usuario.
    - **Body**:
      ```json
      {
        "nombre": "string",
        "email": "string",
        "password": "string"
      }
      ```
- **POST /users/login**: Iniciar sesión.
    - **Body**:
      ```json
      {
        "email": "string",
        "password": "string"
      }
      ```
- **GET /users**: Obtener todos los usuarios.
- **GET /users/{id}**: Obtener un usuario por ID.
- **PUT /users/{id}**: Actualizar un usuario por ID.
    - **Body**:
      ```json
      {
        "nombre": "string",
        "email": "string",
        "password": "string"
      }
      ```
- **DELETE /users/{id}**: Eliminar un usuario por ID.

### Roles:
- **POST /roles**: Crear un nuevo rol.
    - **Body**:
      ```json
      {
        "nombre": "string"
      }
      ```
- **GET /roles**: Obtener todos los roles.
- **GET /roles/{id}**: Obtener un rol por ID.
- **PUT /roles/{id}**: Actualizar un rol por ID.
    - **Body**:
      ```json
      {
        "nombre": "string"
      }
      ```
- **DELETE /roles/{id}**: Eliminar un rol por ID.

## Configuración de la Base de Datos

La configuración de la base de datos se encuentra en el archivo `src/modules/app.module.ts`:

```typescript
MongooseModule.forRoot('mongodb://54.234.150.200:27017/usuarios_db')
```

## Contribuir

1. Hacer un fork del repositorio.
2. Crear una nueva rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realizar los cambios necesarios y hacer commit:

   ```bash
   git commit -am 'Añadir nueva funcionalidad'
   ```

4. Hacer push a la rama:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Crear un Pull Request.

## Puerto
La aplicación se ejecuta en el puerto `3000`. Asegúrate de que este puerto esté disponible en tu máquina.

## Licencia

Este proyecto está licenciado bajo los términos de la licencia **MIT**.
