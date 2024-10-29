import { PrismaClient } from '@prisma/client';
import { procesarEstadisticas } from './procesar_estadisticas.js';
import { procesarVisitantes } from './procesar_visitantes.js';


const prisma = new PrismaClient()

async function main() {
    await procesarEstadisticas()
    await procesarVisitantes()
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })