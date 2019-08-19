# MediTel API

## Instalación

- Copiar el repositorio
```bash
git clone https://github.com/peperojel/meditel_backend.git
```
- Instalar dependencias
```bash
npm install
```
- Copiar el archivo `.env`
- Correr migraciones
```bash
adonis migration:run
```
- Montar el servicio
```bash
adonis serve --dev
```

***
## API Endpoints

#### API URL (provisional)
  `http://localhost:3333`

#### Headers
Todas las solicitudes al servidor deben tener los siguientes headers:
  ```js
  'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  ```
### Auth

#### `POST` Registrar usuario

  * Endpoint: `/api/auth/register`
  * Body:
    ```js
    {
      "email": "new_user@meditel.com",
      "password": "rukafe123",
      "role": "paciente"
    }
    ```
   * Response:
      * `201 Created`: Success
      ```js
      {
        "message": "La cuenta se ha creado satisfactoriamente."
      }
      ```
      * `400 Bad Request`: Validation Failed
      ```js
      [
        {
          "message": "Este correo ya se encuentra registrado",
          "field": "email",
          "validation": "unique"
        }
      ]
      ```

#### `GET` Login de usuario

  * Endpoint: `/api/auth/login`
  * Body:
    ```js
    {
      "email": "new_user@meditel.com",
      "password": "rukafe123",
    }
    ```
   * Response:
      * `200 Ok`: Success
      ```js
      {
        "type": "bearer",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExLCJpYXQiOjE1NjYxNzY1MTJ9.pheEZnww87835fdLzXv5L307zOgsW42EitaSmeVBf9g",
        "refreshToken": "59ca4b9f60aeb64f1f76b61415960cf4BN2xPqeLcBXTA79bo+V1jHIkWR9jST8IQQaegr2oJ2sJdw6F0/goT2sQoqxDAGCk"
      }
      ```
      * `401 Unauthorized`: Wrong credentials
      ```js
      {
        "message": "No existe un usuario con dichas credenciales."
      }
      ```
      * `400 Bad Request`: Validation Failed
      ```js
      [
        {
          "message": "Debes ingresar una contraseña",
          "field": "password",
          "validation": "required"
        }
      ]
      ```
