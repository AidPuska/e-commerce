const router = require('express').Router()
const product = require('../models/product');

const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(403).json('Not authenticated')
    } else {
        next()
    }
}

router.post('/create', async (req, res) => {
    console.log('body:', req.body)
    const newProduct = new product(req.body.body)
    await newProduct.save()
    res.status(200).json(newProduct)
})

router.get('/products', async (req, res) => {
    const items_per_page = 8;
    const page = req.query.page || 1;
    const query = {};

    try {
        const count = await product.estimatedDocumentCount(query)
        const num = count / items_per_page;
        const pageCount = Math.round(num) + 1;
        const skipItems = (page - 1) * items_per_page;

        const products = await product.find(query).limit(items_per_page).skip(skipItems);
        res.status(200).json({
            pagination: {
                count,
                pageCount
            },
            products
        })
    } catch (err) {
        res.status(404).json(err)
    }
})

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await product.findByIdAndDelete(id);
        res.status(200).json('Deleted a product')
    } catch (err) {
        res.status(400).json(err)
    }
})

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedProduct = await product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(401).json(err)
    }
})

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foundProduct = await product.findById(id);
        res.status(200).json(foundProduct)
    } catch (err) {
        res.status(401).json(err)
    }
})

module.exports = router;