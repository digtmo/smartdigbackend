const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express()

app.use(cors());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: '190.107.177.44',
  user: 'cdi87393_digtmo',
  password: 'Tricahueb11$', // Reemplaza esto con la contraseña real
  database: 'cdi87393_digtmo' // Reemplaza esto con el nombre de tu base de datos
});

// Establece la conexión a la base de datos
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
    throw error;
  }
  console.log('Conexión exitosa a la base de datos.');

  // Crea una instancia de la aplicación Express
  const app = express();

  // Define una ruta para obtener los datos de los detalleventas
  app.get('/detalleventas', (req, res) => {
    const query = `
    SELECT *
    FROM ventas dv
    JOIN cliente c ON dv.idcliente = c.idclientes
    JOIN detalleventa p ON dv.idventas = p.idventa
  `;

  

    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error('Error al obtener los detalleventas: ', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los detalleventas.' });
      } else {
        res.json(results);
      }
    });
  });

  // Inicia el servidor
  const port = 3000;
  app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
  });
});



/*   // Insertar registro en la tabla 'cliente'
  connection.query('INSERT INTO cliente SET ?', clienteData, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar en la tabla Cliente: ', error);
      throw error;
    }
    console.log('Registro insertado en la tabla Cliente con ID:', results.insertId);
  });

    // Datos para insertar en la tabla 'cliente'
  const clienteData = {
    nombrecliente: 'David Torres',
    numerotelefono: '123456789'
  };

  // Datos para insertar en la tabla 'Ventas'
  const ventasData = {
    idcliente: 1
  };

  // Insertar registro en la tabla 'Ventas'
  connection.query('INSERT INTO Ventas SET ?', ventasData, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar en la tabla Ventas: ', error);
      throw error;
    }
    console.log('Registro insertado en la tabla Ventas con ID:', results.insertId);
  });

  // Datos para insertar en la tabla 'DetalleVenta'
  const detalleVentaData = {
    medioventa: 'Tienda físicas',
    nombrerecibe: 'María Gósmez',
    telefonorecibe: '98765s4321',
    direccionrecibe: 'Atahualpa',
    mensaje: 'Entregar esn la puerta principal',
    observaciones: 'Ninsguna',
    fechaenvio: '2023-06-24',
    horarioentrega: '09:00 - 12:00',
    fechaventa: '2023-06-23'
  };

  // Insertar registro en la tabla 'detalleventa'
  connection.query('INSERT INTO detalleventa SET ?', detalleVentaData, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar en la tabla DetalleVenta: ', error);
      throw error;
    }
    console.log('Registro insertado en la tabla DetalleVenta con ID:', results.insertId);
  });

  // Datos para insertar en la tabla 'Productos'
  const productosData = {
    nombreproducto: 'Producto 3',
    valorproducto: 10.99
  };

  // Insertar registro en la tabla 'Productos'
  connection.query('INSERT INTO productos SET ?', productosData, (error, results, fields) => {
    if (error) {
      console.error('Error al insertar en la tabla Productos: ', error);
      throw error;
    }
    console.log('Registro insertado en la tabla Productos con ID:', results.insertId);
  });

  // Cierra la conexión a la base de datos después de que se hayan insertado todos los registros
  connection.end();
}); */



