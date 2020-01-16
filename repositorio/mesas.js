const pool = require('./concon');

const getAll = async () => {
  const q = `SELECT * FROM mesas`
  const r = pool.query(q);
  return r;
}

const getById = async (id) => {
  const q = `SELECT * FROM mesas WHERE id_mesa = ${id}`
  const r = await pool.query(q);
  if (r.length > 0)
    return r;
}

const getTablesBySector = async (id_sector) => {
  const q = `SELECT * FROM mesas WHERE id_sector = ${id_sector}`
  const r = await pool.query(q);
  if (r.length > 0)
    return r;
}

const save = async (body) => {
  const v = { id_sector: body.id_sector, capacidad: body.capacidad, id_cliente: body.id_cliente };
  const q = `INSERT INTO mesas SET ?`;
  const r = pool.query(q, v);
  return r
}

module.exports = {
  getAll,
  getTablesBySector,
  getById,
  save
}