const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const writeJSON = (dataBase) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify( dataBase), 'utf-8')
}

const controller = {
	index: (req, res) => {
		res.render('products', {
			title: 'Todos los productos',
			products,
			toThousand
		})
	},
	detail: (req, res) => {
		let product = products.find( product => product.id == req.params.id)
		res.render('detail', {
			product,
			toThousand
		})
	},

	create: (req, res) => {
		res.render('product-create-form', {  
			title: 'Formulario de creación'
		})
	},
	
	
	store: (req, res) => {
		let lastId = 0;
		products.forEach( product => {
			if(product.id > lastId){
				lastId = product.id
			}
		})
		let nuevoProducto = {
			...req.body, 
			id: lastId + 1,
			image: req.file ? req.file.filename : "default-image.png",			
		}
		products.push(nuevoProducto)
	
		writeJSON(products) 
		res.redirect('/products')
	},

	edit: (req, res) => {
		let productId = +req.params.id;
		let product = products.find(product => product.id === productId)
		res.render('product-edit-form', {
			product
		})
	},

	update: (req, res) => {
		let productId = +req.params.id;
		products.forEach(product => {
			if(product.id === productId){
				product.name = req.body.name
				product.price = req.body.price
				product.discount = req.body.discount
				product.category = req.body.category
				product.description = req.body.description
			}
		}) 
 
		writeJSON(products);
		res.redirect('/products'); 
	},
	destroy : (req, res) => {
		let productId = +req.params.id;
		products.forEach(product => {
			if(product.id === productId){
				let indiceProductoABorrar = products.indexOf(product);
				products.splice(indiceProductoABorrar, 1);
			}
		})
		writeJSON(products);
		res.redirect('/products');
	}
};

module.exports = controller;