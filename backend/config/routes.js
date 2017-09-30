//file to add all APIs

const items = require('../controllers/items');

module.exports = function(app){
	app.post('/items', items.add);
	app.delete('/items/:itemid', items.deleteById);
	app.get('/items', items.getPage);
	app.patch('/items/:itemid', items.patchItem);
}