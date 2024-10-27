import prisma from '../../../lib/prisma'; // Importa el cliente Prisma desde la configuración en lib/prisma

export default async function manejador(req, res) {
  const { codigo } = req.query; // Extrae el código del producto de la consulta de la solicitud

  // Manejo de la solicitud GET
  if (req.method === 'GET') {
    // Si se proporciona un código específico en la consulta, busca ese producto
    if (codigo) {
      const producto = await prisma.producto.findUnique({
        where: { codigo: String(codigo) }, // Busca un producto único por código
      });
      return res.status(200).json(producto); // Devuelve el producto encontrado en formato JSON
    } else {
      // Si no se especifica ningún código, devuelve todos los productos
      const productos = await prisma.producto.findMany();
      return res.status(200).json(productos); // Devuelve la lista de productos en formato JSON
    }
  } else {
    // Si el método de la solicitud no es GET, devuelve un error 405 (Método no permitido)
    res.status(405).json({ mensaje: 'Método no permitido' });
  }
}
