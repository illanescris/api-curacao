const pool = require('./concon');

const getAll = async () => {
  const q = `SELECT * FROM productos`
  const r = pool.query(q);
  return r;
}

const getById = async (id) => {
  const q = `SELECT * FROM productos WHERE id = ${id}`
  const r = await pool.query(q);
  if (r.length > 0)
    return r;
}

const getProductsByCategories = async (id_categoria) => {
  const q = `SELECT * FROM productos WHERE id_categoria = ${id_categoria}`
  const r = await pool.query(q);
  if (r.length > 0)
    return r;
}

const save = async (body) => {
  const v = { nombre: body.nombre, precio: body.precio, id_categoria: body.id_categoria, id_cliente: body.id_cliente };
  const q = `INSERT INTO productos SET ?`;
  const r = pool.query(q, v);
  return r
}

module.exports = {
  getAll,
  getProductsByCategories,
  getById,
  save
}