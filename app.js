const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express()
const bodyParser = require('body-parser');

// Habilitando el cors
app.use(cors());

// Middleware para analizar el cuerpo de la solicitud
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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


  // Define una ruta para obtener los datos de los detalleventas
  app.get('/detalleventas', (req, res) => {
    const query = `
    SELECT *
    FROM ventas dv
    JOIN cliente c ON dv.idcliente = c.idclientes
    JOIN detalleventa p ON dv.idventas = p.idventa
    JOIN productos pr ON p.idproducto = pr.idproducto
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

  app.post('/api/cliente', (req, res) => {
    const clienteData = req.body;
  
    connection.query('INSERT INTO cliente SET ?', clienteData, (error, results, fields) => {
      if (error) {
        console.error('Error al insertar en la tabla Cliente: ', error);
        return res.status(500).json({ error: 'Error al insertar en la tabla Cliente' });
      }
      console.log('Registro insertado en la tabla Cliente con ID:', results.insertId);
      return res.status(200).json({ message: 'Registro insertado en la tabla Cliente' });
    });
  });

  app.post('/api/detalleventa', (req, res) => {
    const dataDetalleVenta = req.body;
  
    connection.query('INSERT INTO detalleventa SET ?', dataDetalleVenta, (error, results, fields) => {
      if (error) {
        console.error('Error al insertar en la tabla detalleventa: ', error);
        return res.status(500).json({ error: 'Error al insertar en la tabla Cliente' });
      }
      console.log('Registro insertado en la tabla detalleventa con ID:', results.insertId);
      return res.status(200).json({ message: 'Registro insertado en la tabla Cliente' });
    });
  });

  app.post('/api/productos', (req, res) => {
    const producto = req.body;
  
    connection.query('INSERT INTO productos SET ?', producto, (error, results, fields) => {
      if (error) {
        console.error('Error al insertar en la tabla productos: ', error);
        return res.status(500).json({ error: 'Error al insertar en la tabla Cliente' });
      }
      console.log('Registro insertado en la tabla productos con ID:', results.insertId);
      return res.status(200).json({ message: 'Registro insertado en la tabla Cliente' });
    });
  });

  app.post('/api/login', (req, res) => {
    const { correo, password } = req.body;
    const values = [correo, password];
  
    connection.query('SELECT * FROM usuarios WHERE correo = ? AND password = ?', values, (error, results) => {
      if (error) {
        console.error('Error autenticacion', error);
        return res.status(500).json({ error: 'Error de autenticación' });
      }
  
      if (results.length === 0) {
        // El usuario y contraseña no coinciden
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      // El inicio de sesión es exitoso
      console.log('Inicio de sesion exitoso', results[0]);
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    });
  });
  
  

  // Inicia el servidor
  const port = 4000;
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



