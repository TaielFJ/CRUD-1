const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const removeAccents = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

const controller = {
	index: (req, res) => {
		let productosOfertas = products.filter(product => {
			return product.discount > 1
		})
		let productosVisitados = products.filter(product => {
			return product.category === "visited";
		})
		res.render('index', {
			productosOfertas,
			productosVisitados,
			toThousand
		})
	},
	search: (req, res) => {
		let searchResult = []
		products.forEach(product => {
			if(removeAccents(product.name).toLowerCase().includes(req.query.search.toLowerCase())){
				searchResult.push(product)
			}
			});
			res.render('results', {
				searchResult,
				search: req.query.search,
				toThousand
			})
	}
};

module.exports = controller;
