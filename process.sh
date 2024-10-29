#!/bin/bash

# Configuraciones
REMOTE_USER="lee"       # Usuario del servidor remoto
REMOTE_HOST="10.0.0.5"          # Dirección IP o dominio del servidor remoto
REMOTE_PATH="/home/vinkOS/archivosVisitas"         # Ruta en el servidor remoto donde están los archivos
LOCAL_PATH="/home/etl/visitas"           # Ruta local donde quieres almacenar el archivo comprimido
ARCHIVO_ZIP="reports_$(date +%Y-%m-%d-%H:%M:%S).zip"  # Nombre del archivo comprimido
NODE_PATH="/home/lee/.nvm/versions/node/v20.14.0/bin/node"
# Conectar al servidor y encontrar los archivos con el formato report_*.txt
echo "Conectando al servidor y encontrando archivos..."

ssh $REMOTE_USER@$REMOTE_HOST << EOF
  # Crear un directorio temporal para los archivos
  mkdir -p /tmp/reports
  # Copiar archivos que coinciden con el formato al directorio temporal
  find $REMOTE_PATH -type f -name "report_[[:digit:]].txt" -exec mv {} /tmp/reports/ \;
  # Comprimir los archivos en un solo archivo .zip
  zip -j /tmp/$ARCHIVO_ZIP /tmp/reports/*
  # Limpiar archivos temporales
  rm -rf /tmp/reports
EOF

# Descargar el archivo comprimido a la ruta local mediante SFTP
echo "Descargando archivo comprimido..."

sftp $REMOTE_USER@$REMOTE_HOST:/tmp/$ARCHIVO_ZIP $LOCAL_PATH/bckp

unzip $LOCAL_PATH/bckp/$ARCHIVO_ZIP -d $LOCAL_PATH/temp_files/


# Limpiar el archivo comprimido en el servidor remoto
ssh $REMOTE_USER@$REMOTE_HOST "rm -f /tmp/$ARCHIVO_ZIP"

echo "Proceso completado. Archivo descargado en $LOCAL_PATH/bckp/$ARCHIVO_ZIP" &&

# Registrar datos en la BD
$NODE_PATH $LOCAL_PATH/process/main.js &&

# Eliminar los archivos
rm $LOCAL_PATH/temp_files/*.txt
