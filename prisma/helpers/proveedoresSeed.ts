import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const proveedores = [
  { nombre: 'Productos Frescos del Campo C.A' },
  { nombre: 'Mar y Tierra C.A' },
  { nombre: 'Delicias Lácteas C.A' },
  { nombre: 'Panadería Dulce Hogar C.A' },
  { nombre: 'Mundo Bebidas C.A' },
  { nombre: 'Delicias Congeladas C.A' },
  { nombre: 'Alimentos Enlatados y Secos C.A.' },
  { nombre: 'Desayunos Esenciales C.A' },
  { nombre: 'Dulces y Snacks C.A' },
  { nombre: 'Suministros de Higiene Personal C.A' },
  { nombre: 'Soluciones de Limpieza Hogar C.A' },
  { nombre: 'Suministros para Mascotas C.A' },
  { nombre: 'Esenciales para Bebés C.A' },
  { nombre: 'Importaciones Alimentarias Globales C.A' },
  { nombre: 'Suministros de Belleza y Salud C.A' },
  { nombre: 'Cosecha Orgánica C.A' },
];

export default async () => {
  await prisma.proveedor.deleteMany();
  // Reiniciamos la secuencia del campo autoincremental
  await prisma.$executeRaw`ALTER TABLE Proveedor AUTO_INCREMENT = 1`;
  await prisma.proveedor.createMany({
    data: proveedores,
  });
  console.log('Proveedor seed ejecutado correctamente');
};
