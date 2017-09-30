var itemModel = require('../models/items')
var exceptions = require('../utils/exceptions')



/**
 * Adds a new item
 * input : POST call with the following body
 * {
 *		"items":{
 *			"name": "the name",
 * 			"price": "1111.11",
 *			"brand": "the brand"
 *		}
 * }
 *
 * HTTP response is 400 if input is not proper
 * HTTP response is 201 if item was created
 * HTTP repsonse is 500 in all other cases
 * Successful response returns with the following JSON
 * {
 *		"items":{
 *			"id": "id inserted in db"
 *			"name": "the name",
 * 			"price": "1111.11",
 *			"brand": "the brand"
 *		}
 * }
 */
module.exports.add = function(req, res){
	try {
		//validates input json.
		validateNewItemRequest(req);
		//adds item to db and returns inserted id in callback
		itemModel.addItem(req.body.items, function(err, result){
			//if there is an error in callback, throw it. this will lead to 500 being sent as the API response
			if(err){
				console.log("error in add callback : " + err);
				throw err;
			}else{
				res.status(201).json({items: {id: ""+result.insertId, name: req.body.items.name, price: req.body.items.price, brand: req.body.items.brand}});
			}
		});
	}catch(e){
		console.error("Error while adding new item");
		if(e.name == "InvalidInputException"){
			console.error(e.name + "\n" + e.message + "\n" + e.stack);
			res.status(400).json({error: {message: e.message}});
		}else{
			console.error(e.name + "\n" + e.message + "\n" + e.stack);
			res.status(500).json({error: {meessage: "internal server error"}});
		}
	}
}


/**
 * Deletes an existing item with id in the path parameter.
 * input : DELETE call with the itemid as query parameter
 * 
 * response :
 * 400 if itemid is not present as path parameter
 * 404 if no item corresponding to the item id is present
 * 204 for successful deletion
 * 500 in all other cases
 */
module.exports.deleteById = function(req, res){
	try{
		//return 400 if itemid is not present as a path parameter
		if(!req.params.itemid){
			throw exceptions.InvalidInputException("'itemid' is missing in path parameter. Please add itemid and send the request again");
		}else{
			itemModel.deleteItemById(req.params.itemid, function(err, result){
				if(err){
					//if there is an error in callback, throw it. this will lead to 500 being sent as the API response
					console.error("error in deleteById callback : ");
					throw err;
				}else{
					if(!result.affectedRows){
						throw exceptions.NotFoundException("No Item with id " + req.params.id + " is present");
					}else{
						console.log("Row with id " + req.params.itemid + " has been succesfully deleted");
						res.status(204).send();
					}
				}
			});
		}
	}catch(e){
		if(e.name == "InvalidInputException"){
			console.error(e.name + "\n" + e.message + "\n" + e.stack);
			res.status(400).json({error: {message: e.message}});
		}else if(e.name == "NotFoundException"){
			console.error(e.name + "\n" + e.message + "\n" + e.stack);
			res.status(404).json({error: {message: e.message}});
		}else{
			console.error(e.name + "\n" + e.message + "\n" + e.stack);
			res.status(500).json({error: {meessage: "internal server error"}});
		}
	}
}


/* Returns a page of data or items
 * input : GET call with pagenumber and pagesize as arguments
 * if pagesize < 0 or not specified, use defaultpagesize from config
 * if pagesize > maxpagesize, use maxpagesize from config
 * if pagenumber is not specified or not a proper value or <1, shows first page
 * if page number is greater than total pages, show the last page
 * 
 * Response : 200 with page data (data + page info)
 *            500 in all other cases
 *
 * {
 *   "items": [
 *       {
 *           "id": 3,
 *           "name": "iPhone 7_2",
 *           "price": 2999.9,
 *           "brand": "Apple"
 *       }
 *   ],
 *   "paginationInfo": {
 *       "totalResults": 29,
 *       "resultsPerPage": "500",
 *       "currentPage": 1,
 *       "pages": 1
 *    }
 * }
 */
module.exports.getPage = function(req, res){
	try{
		itemModel.getPage(req.query.pagesize, req.query.pagenumber, function(err, result, pageInfo){
			if(err){
				throw err;
			}
			//use this if you want price and id in string format in response
			//var itemsArray = [];
			/*result.forEach(function(element){
				itemsArray.push({id: ""+element.id, name: element.name, price: ""+element.price, brand: element.brand});
			});*/
			var outputBody = {};
			outputBody.items = result;
			outputBody.paginationInfo = pageInfo;
			res.status(200).json(outputBody);
		});
	}catch(e){
		console.error(e.name + "\n" + e.message + "\n" + e.stack);
		res.status(500).json({error: {meessage: "internal server error"}});
	}
}


/* partially updates an exisiting resource
 * Input : patch request with itemid as path parameter and itemDiff in the body.
 * The format of the diff is as follows:
 *			{
 *				"name" : "newName",
 *				"price" : "newPrice",
 *				 "brand" : "newBrand"
 *			}
 * Note that the input is valid if only one of name, price or brand is present
 * Response : 404 if itemid is not present
 *            400 if nothing to update has been specified
 *            200 with body if success
 *            500 otherwise
 *
 * Note : This implementation is not the standard implementation as presented in the RFCs
 * https://tools.ietf.org/html/rfc6902 and https://tools.ietf.org/html/rfc5789. Only the 'replace' operation is being supported by this API
 */
module.exports.patchItem = function(req, res){
	try{
		console.log(req.body);
		//throw error if itemid is not present
		if(!req.params.itemid){
			throw exceptions.InvalidInputException("Item id has not been specified");
		}else if(!req.body.name && !req.body.price && !req.body.brand){
			//if none of name, price, brand have been specified to be updated, throw error
			throw exceptions.InvalidInputException("Nothing is present in request body to be updated. Add either new name or price or brand or a combination of these");
		}else{
			itemModel.patchItem(req.params.itemid, req.body, function(err, result){
				if(err){
					console.error("error in patchItem callback");
					console.error(err);
					//added this here because I was getting some weird error if i was throwing error here and then catching later.
					//Sequence.js file in mysqljs might be buggy according to some online research
					if(err.name == "NotFoundException"){
						res.status(404).json({error: {message: err.message}});
					}else{
						res.status(500).json({error: {meessage: "internal server error"}});
					}
				}else{
					res.status(200).json({items: {id: result.id, name: result.name, price: result.price, brand: result.brand}});
				}
			});
		}
	}catch(e){
		if(e.name == "InvalidInputException"){
			console.error(e.name + "\n" + e.message + "\n" + e.stack);
			res.status(400).json({error: {message: e.message}});
		}else{
			console.error(e.name + "\n" + e.message + "\n" + e.stack);
			res.status(500).json({error: {meessage: "internal server error"}});
		}
	}
}

//validate new item request by checking input parameters and rasing appropriate exception if needed
function validateNewItemRequest(req){
	if(!req.body.items){
		throw exceptions.InvalidInputException("key 'items' is missing in request");
	}else if(!req.body.items.name){
		throw exceptions.InvalidInputException("key 'name' is missing in request");
	}else if(!req.body.items.price){
		throw exceptions.InvalidInputException("key 'price' is missing in request");
	}else if(!req.body.items.brand){
		throw exceptions.InvalidInputException("key 'brand' is missing in request");
	}
}