import { useState } from 'react'; // Importa el hook useState de React

export default function CrearProducto() { // Componente para crear un nuevo producto
  // Estado para almacenar los datos del formulario
  const [datosFormulario, setDatosFormulario] = useState({
    codigo: '',   // Código del producto
    nombre: '',   // Nombre del producto
    precio: '',   // Precio del producto
    cantidad: ''  // Cantidad del producto
  });

  // Función que se ejecuta al enviar el formulario
  const manejarEnvio = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    await fetch('/api/products/create', { // Realiza una solicitud POST a la API para crear el producto
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Establece el tipo de contenido como JSON
      },
      body: JSON.stringify(datosFormulario), // Convierte los datos del formulario a formato JSON
    });
  };

  return (
    <form onSubmit={manejarEnvio}> {/* Asocia el evento de envío del formulario con la función manejarEnvio */}
      <input type="text" name="codigo" placeholder="Código" required
        onChange={(e) => setDatosFormulario({ ...datosFormulario, codigo: e.target.value })} // Actualiza el estado con el nuevo código
      />
      <input type="text" name="nombre" placeholder="Nombre" required
        onChange={(e) => setDatosFormulario({ ...datosFormulario, nombre: e.target.value })} // Actualiza el estado con el nuevo nombre
      />
      <input type="number" name="precio" placeholder="Precio" required
        onChange={(e) => setDatosFormulario({ ...datosFormulario, precio: e.target.value })} // Actualiza el estado con el nuevo precio
      />
      <input type="number" name="cantidad" placeholder="Cantidad" required
        onChange={(e) => setDatosFormulario({ ...datosFormulario, cantidad: e.target.value })} // Actualiza el estado con la nueva cantidad
      />
      <button type="submit">Crear Producto</button> {/* Botón para enviar el formulario */}
    </form>
  );
}
