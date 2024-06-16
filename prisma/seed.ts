import { PrismaClient } from '@prisma/client';
import crearCategorias from './helpers/categoriasSeed';
import crearProveedores from './helpers/proveedoresSeed';

const prisma = new PrismaClient();
async function main() {
  await crearCategorias();
  await crearProveedores();
  //Se debe crear cacteristicas/marcas/categorias antes de crear los productos
  //await crearProductos();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
