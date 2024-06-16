import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const categorias = [
  { nombre: 'Alimentos Secos y Enlatados' },
  { nombre: 'Bebés' },
  { nombre: 'Bebidas' },
  { nombre: 'Carnes y Pescados' },
  { nombre: 'Cereales y Barras de Cereal' },
  { nombre: 'Congelados' },
  { nombre: 'Frutas y Verduras' },
  { nombre: 'Lácteos' },
  { nombre: 'Limpieza del Hogar' },
  { nombre: 'Mascotas' },
  { nombre: 'Panadería y Repostería' },
  { nombre: 'Productos de Higiene Personal' },
  { nombre: 'Productos Internacionales' },
  { nombre: 'Productos Orgánicos y Naturales' },
  { nombre: 'Salud y Belleza' },
  { nombre: 'Snacks y Dulces' },
];

export default async () => {
  await prisma.categoria.deleteMany();
  // Reiniciamos la secuencia del campo autoincremental
  await prisma.$executeRaw`ALTER TABLE Categoria AUTO_INCREMENT = 1`;
  await prisma.categoria.createMany({
    data: categorias,
  });
  console.log('Categorías seed ejecutado correctamente');
};
