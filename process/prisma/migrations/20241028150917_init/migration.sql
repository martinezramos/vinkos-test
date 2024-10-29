-- CreateTable
CREATE TABLE `visitante` (
    `email` VARCHAR(191) NOT NULL,
    `fechaPrimeraVisita` DATETIME(3) NOT NULL,
    `fechaUltimaVisita` DATETIME(3) NOT NULL,
    `visitasTotales` INTEGER NOT NULL,
    `visitasAnioActual` INTEGER NOT NULL,
    `visitasMesActual` INTEGER NOT NULL,

    UNIQUE INDEX `visitante_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estadistica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `jyv` VARCHAR(191) NOT NULL,
    `badmail` VARCHAR(191) NOT NULL,
    `baja` VARCHAR(191) NOT NULL,
    `fechaEnvio` DATETIME(3) NOT NULL,
    `fechaOpen` DATETIME(3) NOT NULL,
    `opens` INTEGER NOT NULL,
    `opensVirales` INTEGER NOT NULL,
    `fechaClick` DATETIME(3) NOT NULL,
    `clicks` INTEGER NOT NULL,
    `clicksVirales` INTEGER NOT NULL,
    `links` VARCHAR(191) NULL,
    `iPs` VARCHAR(191) NULL,
    `navegadores` VARCHAR(191) NULL,
    `plataformas` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
