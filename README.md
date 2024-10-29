# Prueba técnica 

## Installación

Ingresa a la carpeta process y has las instalaciones necesarias. Para el registro de los datos se uso el ORM Prisma y la versión 20 de Node.

```sh
npm install
```
Cambiar las variables de entorno del archivo `.env`
```js
DATABASE_URL="mysql://user:password@localhost:3306/vinkos"
LOCAL_PATH="MY_PATH"
```
Posteriormente ejecutar las migraciones con:
```sh
npx prisma generate
```
## Proceso que integra la información de visitas
El archivo `process.sh` es un script escrito en shell el cual tiene tres variables que deben ser cambiadas. REMOTE_PATH y LOCAL_PATH ya fueron seteadas acorde a los requerimientos.
```sh
REMOTE_PATH="/home/vinkOS/archivosVisitas"
LOCAL_PATH="/home/etl/visitas"
NODE_PATH="/node/v20.14.0/bin/node"
```
