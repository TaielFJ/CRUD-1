const express = require('express');
const router = express.Router();
const uploadFile = require('../middleware/imageProduct');

const productsController = require('../controllers/productsController');

router.get('/', productsController.index); 
 
router.get('/detail/:id', productsController.detail);  

router.get('/create', productsController.create); 

router.post('/create', uploadFile.single('image'), productsController.store);

router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update);   

router.delete('/:id', productsController.destroy);


module.exports = router;
