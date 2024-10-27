import prisma from '../../../lib/prisma'; // Importa el cliente Prisma desde la configuración en lib/prisma

export default async function manejador(req, res) {
  // Manejo de la solicitud POST
  if (req.method === 'POST') {
    const { codigo, nombre, precio, cantidad } = req.body; // Extrae los datos del cuerpo de la solicitud
    try {
      // Crea un nuevo producto en la base de datos
      const nuevoProducto = await prisma.producto.create({
        data: { 
          codigo, 
          nombre, 
          precio: parseFloat(precio), // Convierte el precio a tipo Float
          cantidad: parseInt(cantidad), // Convierte la cantidad a tipo Int
        },
      });
      res.status(201).json(nuevoProducto); // Devuelve el nuevo producto creado en formato JSON con estado 201 (Creado)
    } catch (error) {
      // Manejo de errores en caso de que la creación falle
      res.status(500).json({ error: 'Error al crear el producto' }); // Devuelve un error con estado 500 (Error interno del servidor)
    }
  } else {
    // Si el método de la solicitud no es POST, devuelve un error 405 (Método no permitido)
    res.status(405).json({ mensaje: 'Método no permitido' });
  }
}