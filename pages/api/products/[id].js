import prisma from '../../../lib/prisma'; // Importa el cliente Prisma desde la configuración en lib/prisma

export default async function manejador(req, res) {
  const { id } = req.query; // Extrae el ID del producto de la consulta de la solicitud

  // Manejo de la solicitud PUT
  if (req.method === 'PUT') {
    const { nombre, precio, cantidad } = req.body; // Extrae los datos del cuerpo de la solicitud
    try {
      // Actualiza el producto en la base de datos
      const productoActualizado = await prisma.producto.update({
        where: { id: parseInt(id) }, // Busca el producto por su ID
        data: { 
          nombre, 
          precio: parseFloat(precio), // Convierte el precio a tipo Float
          cantidad: parseInt(cantidad), // Convierte la cantidad a tipo Int
        },
      });
      res.status(200).json(productoActualizado); // Devuelve el producto actualizado en formato JSON con estado 200 (OK)
    } catch (error) {
      // Manejo de errores en caso de que la actualización falle
      res.status(500).json({ error: 'Error al actualizar el producto' }); // Devuelve un error con estado 500 (Error interno del servidor)
    }
  } else {
    // Si el método de la solicitud no es PUT, devuelve un error 405 (Método no permitido)
    res.status(405).json({ mensaje: 'Método no permitido' });
  }
}