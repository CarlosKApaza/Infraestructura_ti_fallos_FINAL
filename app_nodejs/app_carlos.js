
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware para que Express entienda JSON
app.use(express.json());

// ---CONFIGURACION DE LA CONEXION A LA BASE DE DATOS ----
const db = mysql.createConnection({
  host: '192.168.89.104',     // La IP del servidor ubuntu_mysql
  user: 'app_user',	      // El usuario creado
  password: 'Kevin123#',      // La contraseña de app_user
  database: 'sis313_db'	      // El nombre de la base de datos creada
});

// Conectar a la base de datos
db.connect(err => {
	if(err) {
	  console.error('Error al conectar a la base de datos:', err);
	  return;
  }
  console.log('Conectando exitosamente a la base de datos MySQL.');
});


// TURA PARA LA PAGINA PRINCIAPL (RAIZ)
app.get('/', (req, res) => {
	res.send('API funcional en el servidor 1 - CARLOS\n');
});


// --- DEFINICION DE RUTAS DEL CRUD ---

// RUTA PARA CREAR un nuevo producto (CREATE)
app.post('/productos', (req, res) => {
	const { nombre, descripcion } = req.body;
	const sql = 'INSERT INTO productos (nombre, descripcion) VALUES (?, ?)';
	db.query(sql, [nombre, descripcion], (err, result) => {
	  if (err) throw err;
	  res.send({ id: result.insertId, nombre, descripcion, message: 'Producto creado!' });
  });
});

// RUTA PARA LEER todos los productos (READ)
app.get('/productos', (req, res) => {
	const sql = 'SELECT * FROM productos';
	db.query(sql, (err, results) => {
	  if (err) throw err;
	  res.send(results);
  });
});


// RUTA PARA ACTUALIZAR un producto existente (UPDATE)
app.put('/productos/:id', (req, res) => {
	const { nombre, descripcion } = req.body;
	const { id } = req.params; 
	const sql = 'UPDATE productos SET nombre = ?, descripcion = ? WHERE id = ?';
	db.query(sql, [nombre, descripcion, id], (err, result) => {
	  if (err) throw err;
	  res.send({ message: 'Producto actualizado!' });
  });
});

//  RUTA PARA BORRAR un producto (DELETE)
app.delete('/productos/:id', (req, res) => {
	const { id } = req.params;
	const sql = 'DELETE FROM productos WHERE id = ?';
	db.query(sql, [id], (err, result) => {
	  if (err) throw err;
	  res.send({ message: 'Producto eliminado!' });
  });
});


// INICIAR EL SERVIDOR
app.listen(port, () => {
  console.log(`API CRUD corriendo en el puerto ${port}`);
});







