import csv from 'csv-parser';
import fs from 'fs';
import validator from 'validator';
import { PrismaClient } from '@prisma/client';
import moment from 'moment';

const results = [];
const invalidResults = [];
let files = null;
const prisma = new PrismaClient()
const directory = process.env.LOCAL_PATH;

// Esta funcion leera todos los archivos en el directorio y procesara los datos.
export async function procesarEstadisticas(){
  fs.readdirSync(directory).forEach(async file => {
    console.log(file);
    await prisma.bitacora.create({
      data: {
        fileName: file,
      },
    })
  
    fs.createReadStream(directory + file)
    .pipe(csv())
    .on('data', async (data) => {
      if (
          validator.isEmail(data?.email)
          && isDateFormat(data['Fecha envio'])
          && isDateFormat(data['Fecha open'])
        ) {
          await prisma.estadistica.create({
            data: {
              email: data['email'],
              jyv: data['jk'],
              badmail: data['Badmail'],
              baja: data['Baja'],
              fechaEnvio: moment(data['Fecha envio'], 'DD/MM/YYYY hh:mm:ss'),
              fechaOpen: moment(data['Fecha open'], 'DD/MM/YYYY hh:mm:ss'),
              opens: parseInt(data['Opens']),
              opensVirales: parseInt(data['Opens virales']),
              fechaClick: null,
              clicks: parseInt(data['Clicks']),
              clicksVirales: parseInt(data['Clicks virales']),
              links: data['Links'],
              iPs: data['IPs'],
              navegadores: data['Navegadores'],
              plataformas: data['Plataformas'],
            },
        })
        results.push(data)
      } else {
        invalidResults.push(data)
      }
    })
    .on('end', async () => {
      await prisma.$disconnect()
      console.log(results.length);
      console.log(invalidResults);
    });
  
  });
}



function isDateFormat(date) {
  // Expresión regular para validar el formato dd/mm/yyyy HH:mm
  const dateRegex = /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/;

  // Validar el formato con la expresión regular
  if (!dateRegex.test(date)) {
    return false;
  }

  // Dividir la fecha para comprobar si es válida
  const [day, month, year] = date.split(/[\/ ]/);
  const time = date.split(' ')[1];

  // Comprobar si es una fecha válida (dd, mm, yyyy y hh:mm válidos)
  return validator.isDate(`${year}-${month}-${day}`, { format: 'YYYY-MM-DD' }) && validator.isTime(time, { hourFormat: 'hour24' });
}
