const pool = require('./concon');

const getAll = async () => {
  const q = `SELECT * FROM sectores`
  const r = pool.query(q);
  return r;
}

const getById = async (id) => {
  const q = `SELECT * FROM sectores WHERE id = ${id}`
  const r = await pool.query(q);
  if (r.length > 0)
    return r;
}

const save = async (body) => {
  const v = { nombre: body.nombre };
  const q = `INSERT INTO sectores SET ?`;
  const r = pool.query(q, v);
  return r
}

module.exports = {
  getAll,
  getById,
  save
}