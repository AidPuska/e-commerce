const Cart = require('../models/cart')
const User = require('../models/user')
const Product = require('../models/product');


const router = require('express').Router();

router.post('/', async (req, res) => {
    const { productId } = req.body
    console.log(productId)

    try {

        const product = await Product.findById({ _id: productId })
        const cart = await Cart.findOne({ user: req.user._id.valueOf() })

        const prod = {
            itemId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        }

        if (cart === null) {
            const newCart = new Cart({ user: req.user._id.valueOf(), products: prod })
            await newCart.save()
            console.log('newcart is: ', newCart)
            return res.status(200).json(newCart)
        } else {
            const findItem = cart.products.findIndex(el => el.itemId == productId)
            console.log('findItem:', findItem)
            if (findItem === -1) {
                // add to cart if there is no that product
                console.log('no product add to cart')
                cart.products.push(prod);
                await cart.save()
                res.status(200).json(cart)
            } else {
                const prod = cart.products[findItem];
                console.log('there is product add to quantity')
                const crt = await Cart.findOneAndUpdate(
                    { user: req.user._id.valueOf() },
                    { $set: { "products.$[elem].quantity": prod.quantity + 1 } },
                    { arrayFilters: [{ "elem.itemId": prod.itemId }] },
                )
                res.status(200).json(crt)
            }
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/quantity', async (req, res) => {
    const { productId, method } = req.body;

    const cart = await Cart.findOne({ user: req.user._id.valueOf() })
    const findItem = cart.products.findIndex(el => el._id == productId)

    try {
        const prod = cart.products[findItem]
        if (method) {
            const crt = await Cart.findOneAndUpdate(
                { user: req.user._id.valueOf() },
                { $set: { "products.$[elem].quantity": prod.quantity + 1 } },
                { arrayFilters: [{ "elem.itemId": prod.itemId }] },
            )
            res.status(200).json(crt)
        } else {
            if (prod.quantity > 1) {

                const crt = await Cart.findOneAndUpdate(
                    { user: req.user._id.valueOf() },
                    { $set: { "products.$[elem].quantity": prod.quantity - 1 } },
                    { arrayFilters: [{ "elem.itemId": prod.itemId }] },
                )
                res.status(200).json(crt)
            }
        }
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/', async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id.valueOf() })
        res.status(200).json(cart)
    } catch (err) {
        res.status(404).json('Not found')
    }
})

router.put('/', async (req, res) => {
    const { productId } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate({ user: req.user._id.valueOf() }, {
            $pull: {
                products: { itemId: productId }
            }
        }, { new: true })
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.put('/removeAll', async (req, res) => {
    try {
        const cart = await Cart.findOneAndUpdate({ user: req.user._id.valueOf() }, {
            $set: {
                products: []
            }
        }, { new: true })
        res.status(200).json(cart)
    } catch (err) {
        res.status(400).send(err)
    }
})

router.get('/total', async (req, res) => {
    /* const total = await Cart.aggregate([
        { $match: { user: req.user._id } },
        { $group: { _id: { total: { $sum: "$products.price" }, totalSum: { $multiply: ["$products.quantity", "$products.price"] } } } }
    ]) */
    const total = await Cart.aggregate([
        { $match: { user: req.user._id } },
        { $unwind: "$products" },
        { $project: { _id: 0, products: 1 } },
        { $group: { _id: null, total: { $sum: { $multiply: ["$products.price", "$products.quantity"] } } } }
    ])
    res.status(200).json(total)
})

module.exports = router;