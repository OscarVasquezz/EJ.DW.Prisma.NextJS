import { PrismaClient } from '@prisma/client'; // Importa el cliente de Prisma desde la librería '@prisma/client'

// Crea una instancia del cliente de Prisma
const prisma = new PrismaClient(); 

export default prisma; // Exporta la instancia del cliente de Prisma para su uso en otras partes de la aplicación
