import { PrismaClient } from '@prisma/client';

// Una ves que los archivos han sido procesados se obtiene los datos de los visitantes mediante SQL
export async function procesarVisitantes() {
    const prisma = new PrismaClient()

    await prisma.$executeRaw`DELETE FROM visitante`

    let result = await prisma.$queryRaw`SELECT 
    email,
    MIN(fechaOpen) fechaPrimeraVisita,
    MAX(fechaOpen) fechaUltimaVisita,
    COUNT(*) as visitasTotales,
    (SELECT sum(opens)  
            FROM estadistica
            WHERE e.email = estadistica.email
            AND year(estadistica.fechaEnvio) = year(curdate())
            ) as visitasAnioActual,
    (SELECT sum(opens)  
            FROM estadistica
            WHERE e.email = estadistica.email
            AND MONTH(estadistica.fechaEnvio) = MONTH(curdate())
            ) as visitasMesActual
    FROM
    estadistica AS e
    group by email;`

    console.log(typeof result[0]?.visitasTotales);
    result = result.map((item)=>{
        item.visitasTotales = Number(item.visitasTotales);
        item.visitasAnioActual = Number(item.visitasAnioActual);
        item.visitasMesActual = Number(item.visitasMesActual);
        return item;
    });

    const createMany = await prisma.visitante.createMany({
        data: result,
    })

    return createMany
}

procesarVisitantes();