const router = require("express").Router();
const mesasRepo = require("../repositorio/mesas");

router.get('', async (req, res) => {
    try {
        const mesas = await mesasRepo.getAll();
        if (mesas.length === 0)
            res.send({ mensaje: 'No se encontraron mesas' })
        else
            res.send(mesas);
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

router.get('/sector/:id_sector', async (req, res) => {
    try {
        const id_sector = req.params.id_sector;
        const mesa = await mesasRepo.getTablesBySector(id_sector)
        if (mesa)
            res.status(200).send(mesa);
        else
            res.status(404).send({ mensaje: 'No existen mesas en este sector' });
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const mesa = await mesasRepo.getById(id)
        if (mesa)
            res.status(200).send(mesa);
        else
            res.status(404).send({ mensaje: 'La mesa no existe' });
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});


router.post('/', async (req, res) => {

    let cant = req.query.cant;

    try {
        let promises = [];
        const { body: mesa } = req;

        for (let i = 0; i < cant; i++) {
            promises.push(await mesasRepo.save(mesa));
        }
        Promise.all(promises).then(values => {
            if (values.length > 0)
                res.status(201).send({ mensaje: 'Mesas creadas correctamente' });
            else
                res.status(500).send({ mensaje: 'algo pasò' })
        })

    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});



module.exports = router;