const router = require("express").Router();
const categoriasRepo = require("../repositorio/categorias");

router.get('', async (req, res) => {
    try {
        const categorias = await categoriasRepo.getAll();
        if (categorias.length === 0)
            res.send({ mensaje: 'No se encontraron categorias' })
        else
            res.send(categorias);
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

router.get('/sector/:id_categoria', async (req, res) => {
    try {
        const id_categoria = req.params.id_categoria;
        const categoria = await categoriasRepo.getTablesBySector(id_categoria)
        if (categoria)
            res.status(200).send(categoria);
        else
            res.status(404).send({ mensaje: 'No existen categorias en este sector' });
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const categoria = await categoriasRepo.getById(id)
        if (categoria)
            res.status(200).send(categoria);
        else
            res.status(404).send({ mensaje: 'La categoria no existe' });
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});


router.post('/', async (req, res) => {
    try {
        let promises = [];
        const { body: categoria } = req;
        promises.push(await categoriasRepo.save(categoria));
        Promise.all(promises).then(values => {
            if (values.length > 0)
                res.status(201).send({ mensaje: 'Categoria creada correctamente' });
            else
                res.status(500).send({ mensaje: 'algo pasò' })
        })
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

module.exports = router;