const router = require("express").Router();
const sectoresRepo = require("../repositorio/sectores");

router.get('', async (req, res) => {
    try {
        const sectores = await sectoresRepo.getAll();
        if (sectores.length === 0)
            res.send({ mensaje: 'No se encontraron sectores' })
        else
            res.send(sectores);
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const sector = await sectoresRepo.getById(id)
        if (sector)
            res.status(200).send(sector);
        else
            res.status(404).send({ mensaje: 'El sector no existe' });
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

router.post('/', async (req, res) => {
    try {
        let promises = [];
        const { body: sector } = req;
        promises.push(await sectoresRepo.save(sector));
        Promise.all(promises).then(values => {
            if (values.length > 0)
                res.status(201).send({ mensaje: 'Sector creado correctamente' });
            else
                res.status(500).send({ mensaje: 'algo pasò' })
        })
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

module.exports = router;