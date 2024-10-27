module.exports = {
  // Contenido donde se buscarán las clases de Tailwind CSS
  contenido: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Ruta para los archivos de página
    "./components/**/*.{js,ts,jsx,tsx}", // Ruta para los archivos de componentes
  ],
  tema: {
    // Extensión de la configuración del tema de Tailwind CSS
    extender: {}, // Aquí puedes agregar personalizaciones adicionales al tema
  },
  plugins: [], // Lista de plugins de Tailwind CSS que se utilizarán
};
