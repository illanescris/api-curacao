const pool = require('./concon');

const getAll = async () => {
  const q = `SELECT * FROM categorias`
  const r = pool.query(q);
  return r;
}

const getById = async (id) => {
  const q = `SELECT * FROM categorias WHERE id = ${id}`
  const r = await pool.query(q);
  if (r.length > 0)
    return r;
}

const save = async (body) => {
  const v = { nombre: body.nombre };
  const q = `INSERT INTO categorias SET ?`;
  const r = pool.query(q, v);
  return r
}

module.exports = {
  getAll,
  getById,
  save
}