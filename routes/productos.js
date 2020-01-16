const router = require("express").Router();
const productosRepo = require("../repositorio/productos");

router.get('', async (req, res) => {
    try {
        const productos = await productosRepo.getAll();
        if (productos.length === 0)
            res.send({ mensaje: 'No se encontraron productos' })
        else
            res.send(productos);
    } catch (err) {
        console.log(err)
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

router.get('/categoria/:id_producto', async (req, res) => {
    try {
        const id_producto = req.params.id_producto;
        const producto = await productosRepo.getProductsByCategories(id_producto)
        if (producto)
            res.status(200).send(producto);
        else
            res.status(404).send({ mensaje: 'No existen productos en esta categoria' });
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const producto = await productosRepo.getById(id)
        if (producto)
            res.status(200).send(producto);
        else
            res.status(404).send({ mensaje: 'La producto no existe' });
    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});


router.post('/', async (req, res) => {
    try {
        let promises = [];
        const { body: producto } = req;
        promises.push(await productosRepo.save(producto));
        Promise.all(promises).then(values => {
            if (values.length > 0)
                res.status(201).send({ mensaje: 'Productos creadas correctamente' });
            else
                res.status(500).send({ mensaje: 'algo pasò' })
        })

    } catch (err) {
        res.status(500).send({ mensaje: err.sqlMessage });
    }
});



module.exports = router;