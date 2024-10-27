import { useState, useEffect } from 'react'; // Importa useState y useEffect desde React

export default function Home() {
  const [productos, setProductos] = useState([]); 
  const [codigoBusqueda, setCodigoBusqueda] = useState(''); 
  const [nuevoProducto, setNuevoProducto] = useState({ codigo: '', nombre: '', precio: '', cantidad: '' });
  const [productoAEditar, setProductoAEditar] = useState(null); // Estado para el producto a editar
  const [datosEditar, setDatosEditar] = useState({ codigo: '', nombre: '', precio: '', cantidad: '' }); // Datos para editar

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const respuesta = await fetch('/api/products'); 
    const datos = await respuesta.json(); 
    setProductos(datos); 
  };

  const buscarProducto = async () => {
    if (codigoBusqueda) {
      const respuesta = await fetch(`/api/products?codigo=${codigoBusqueda}`);
      const datos = await respuesta.json();
      setProductos(datos ? [datos] : []);
    } else {
      fetchProductos();
    }
  };

  const crearProducto = async (e) => {
    e.preventDefault(); 
    await fetch('/api/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto), 
    });
    fetchProductos();
    setNuevoProducto({ codigo: '', nombre: '', precio: '', cantidad: '' });
  };

  // Función para abrir el formulario de edición
  const abrirFormularioEdicion = (producto) => {
    setProductoAEditar(producto); // Guarda el producto que se va a editar
    setDatosEditar({ 
      codigo: producto.codigo, 
      nombre: producto.nombre, 
      precio: producto.precio, 
      cantidad: producto.cantidad 
    }); // Rellena los campos con los datos del producto
  };

  const editarProducto = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    await fetch(`/api/products/${productoAEditar.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosEditar), // Envia los nuevos datos del producto
    });
    setProductoAEditar(null); // Cierra el formulario de edición
    fetchProductos(); // Vuelve a cargar la lista de productos
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Gestión de Productos</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por código" 
          value={codigoBusqueda} 
          onChange={(e) => setCodigoBusqueda(e.target.value)} 
          className="border border-gray-300 p-2 rounded"
        />
        <button
          onClick={buscarProducto} 
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Buscar
        </button>
        <button
          onClick={fetchProductos} 
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Mostrar Todos
        </button>
      </div>

      <form onSubmit={crearProducto} className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Código" 
            value={nuevoProducto.codigo} 
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, codigo: e.target.value })}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Nombre" 
            value={nuevoProducto.nombre} 
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Precio" 
            value={nuevoProducto.precio} 
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
            className="border border-gray-300 p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Cantidad" 
            value={nuevoProducto.cantidad} 
            onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })}
            className="border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          Agregar
        </button>
      </form>

      {/* Formulario de edición */}
      {productoAEditar && (
        <form onSubmit={editarProducto} className="mb-6 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold mb-4">Editar Producto</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Código" 
              value={datosEditar.codigo} 
              onChange={(e) => setDatosEditar({ ...datosEditar, codigo: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Nombre" 
              value={datosEditar.nombre} 
              onChange={(e) => setDatosEditar({ ...datosEditar, nombre: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Precio" 
              value={datosEditar.precio} 
              onChange={(e) => setDatosEditar({ ...datosEditar, precio: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Cantidad" 
              value={datosEditar.cantidad} 
              onChange={(e) => setDatosEditar({ ...datosEditar, cantidad: e.target.value })}
              className="border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Actualizar
          </button>
        </form>
      )}

      <table className="min-w-full bg-white border border-gray-200 rounded shadow-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Código</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Cantidad</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => ( 
            <tr key={producto.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{producto.id}</td>
              <td className="py-2 px-4 border-b text-center">{producto.codigo}</td>
              <td className="py-2 px-4 border-b text-center">{producto.nombre}</td>
              <td className="py-2 px-4 border-b text-center">Q.{producto.precio.toFixed(2)}</td>
              <td className="py-2 px-4 border-b text-center">{producto.cantidad}u</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => abrirFormularioEdicion(producto)} // Abre el formulario de edición con el producto seleccionado
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
