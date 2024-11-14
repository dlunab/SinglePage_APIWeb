const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const authRoutes = require('./auth');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Configura la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',         // Cambia si tu base de datos está en otro servidor
  user: 'root',   // Reemplaza con tu usuario de MySQL
  password: '', // Reemplaza con tu contraseña de MySQL
  database: 'app_listas_compras' // Nombre de la base de datos
});

// Conecta a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL exitosa');
});

// Ruta para obtener datos de la tabla listas_compras
app.get('/api/listas_compras', (req, res) => {
  const sql = 'SELECT * FROM listas_compras'; // Cambia el nombre de la tabla si es necesario
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(result);
  });
});

// Puedes añadir rutas adicionales para otras tablas
app.get('/api/productos', (req, res) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(result);
  });
});

app.get('/api/productos', (req, res) => {
  const sql = 'SELECT nombre_producto AS nombre FROM productos'; // Cambia si necesitas otros campos
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    console.log("Datos obtenidos de la base de datos:", result);
    res.json(result);
  });
});




app.get('/api/sitios_compra', (req, res) => {
  const sql = 'SELECT * FROM sitios_compra';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(result);
  });
});

app.get('/api/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    res.json(result);
  });
});


// Ruta para eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM productos WHERE id_producto = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      res.status(500).send('Error en el servidor al eliminar el producto');
      return;
    }
    res.status(200).send('Producto eliminado exitosamente');
  });
});

// Ruta para crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre_producto, id_sitio } = req.body;
  
  // Verifica que los datos estén completos
  if (!nombre_producto || !id_sitio) {
    return res.status(400).json({ success: false, message: 'Datos incompletos' });
  }

  const sql = 'INSERT INTO productos (nombre_producto, id_sitio) VALUES (?, ?)';
  db.query(sql, [nombre_producto, id_sitio], (err, result) => {
    if (err) {
      console.error('Error al insertar el producto:', err);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
    res.json({ success: true, message: 'Producto creado correctamente', id: result.insertId });
  });
});



app.put('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  const { nombre_producto, id_sitio } = req.body;

  const sql = 'UPDATE productos SET nombre_producto = ?, id_sitio = ? WHERE id_producto = ?';
  db.query(sql, [nombre_producto, id_sitio, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el producto:', err);
      res.status(500).json({ error: 'Error al actualizar el producto' });
      return;
    }
    // Enviar una respuesta en formato JSON para que Angular la pueda procesar sin errores
    res.json({ success: true, message: 'Producto actualizado correctamente' });
  });
});



// Endpoint para obtener un producto específico por su ID
app.get('/api/productos/:id', (req, res) => {
  const id = req.params.id; // Extrae el ID de los parámetros de la URL

  const sql = 'SELECT * FROM productos WHERE id_producto = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al obtener el producto:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    
    if (result.length > 0) {
      res.json(result[0]); // Devuelve el producto encontrado
    } else {
      res.status(200).json({ success: true, message: 'Producto actualizado correctamente' });
    }
  });
});




// Configura el puerto en el que se ejecutará el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
