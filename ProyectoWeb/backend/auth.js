const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_listas_compras'
});

// Ruta para autenticar usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
      return;
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const user = results[0];

    // Verifica la contraseña
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseñas:', err);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
        return;
      }

      if (isMatch) {
        res.json({ success: true, message: 'Autenticación exitosa', user: { id: user.id_usuario, nombre: user.nombres, rol: user.rol } });
      } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }
    });
  });
});

module.exports = router;
