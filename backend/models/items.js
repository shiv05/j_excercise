exceptions = require('../utils/exceptions')
db = require('../utils/db')
config = require('../config/config')

/* add item to db
 * input : item object that contains name, price and brand
 * returns the id of the item added via callback
 */
module.exports.addItem = function(item, callback){
	var query = "INSERT INTO items (name, price, brand) VALUES ('" + item.name + "', " + item.price + ", '" + item.brand + "')";
	db.query(query, function (err, result) {
		if (err) {
			throw exceptions.DatabaseException(err);
		}
		console.log("new item inserted"+result.insertId);
		//callback for sending insertId
		callback(0, result);
	});
};


/* delete item from db
 * input : itemid
 * returns the number of rows affected by delete command
 */
module.exports.deleteItemById = function(itemid, callback){
	var query = "DELETE FROM items where id = " + itemid;
	db.query(query, function(err, result) {
		if(err) {
			throw exceptions.DatabaseException(err);
		}
		console.log("Delete query " + query + " was successfully executed");
		//callback for sending affected number of rows
		callback(0, result);
	})
};


/* returns data for items in a particular page
 * input : pageSize : number of items in a page
 *         pageNumber
 * output : data for pageNumber given the pageSize
 */
module.exports.getPage = function(pageSize, pageNumber, callback){
	//get totalitems first
	getTotalItems(function(err, totalItems){
		if(err){
			console.error("Error in totalItemsCallback");
			callback(err, 0);
		}
		console.log("total number of items is " + totalItems);


		pageNumber = parseInt(pageNumber);
		pageSize = parseInt(pageSize);
		//make sure pageSize has proper value and get totalPages
		//if page size is NaN or < 0, pageSize = defaultpageSize
		//if page size > maxPageSize, pageSize = maxPageSize
		if(pageSize !== pageSize || pageSize < 0 ){
			pageSize = config.items.defaultPageSize;
		}else if(pageSize > config.items.maxPageSize){
			pageSize = config.items.maxPageSize;
		}
		var totalPages = Math.ceil(totalItems / pageSize);
		while(totalPages !== totalPages){};
		//make sure that pagenumber has proper values
		//if page number < 1, show first page
		//if page number is greater than totalpages, show the last page
		if(pageNumber !== pageNumber || pageNumber < 1){
			pageNumber = 1;
		}else if(pageNumber > totalPages){
			pageNumber = totalPages;
		}


		//generate sql query for page
		var offset = (pageNumber - 1) * pageSize;
		var query = "SELECT * FROM items limit " + offset + "," + pageSize;
		db.query(query, function(err, result){
			if(err){
				console.error("Error in getPage callback");
				callback(err, 0);
			}
			console.log("query : " + query + " executed successfully");
			callback(0, result, {totalResults: totalItems, resultsPerPage: pageSize, currentPage: pageNumber, pages: totalPages});
		});
	});
};


/* Pathes the item with itemId. Note that patch can be a partial update.
 * Input : itemId : id of the item
 *         itemDiff : Object with the following format.
 *			{
 *				name: "newName",
 *				price: "newPrice",
 *				brand: "newBrand"
 *			}
 * Note that the input is valid if only one of name, price or brand is present
 * Output : returns the item with the new details
 *
 * Note : This implementation is not the standard implementation as presented in the RFCs
 * https://tools.ietf.org/html/rfc6902 and https://tools.ietf.org/html/rfc5789. Only the 'replace' operation is being supported by this API
 */
module.exports.patchItem = function(itemId, itemDiff, callback){
	//check if item with itemId exists
	getItemById(itemId, function(err, result){
		if(err){
			console.log("error in getTotalItems callback");
			callback(err, 0);
		}
		if(!result[0]){
			callback(exceptions.NotFoundException("No item with the given item id is present"), 0);
			//throw new Error("yoyoyooyoyoy");
			//exceptions.NotFoundException("No item with the given item id is present");
		}else{
			if(itemDiff.name){
				result[0].name = itemDiff.name;
			}
			if(itemDiff.price){
				result[0].price = itemDiff.price;
			}
			if(itemDiff.brand){
				result[0].brand = itemDiff.brand;
			}
			var query = "UPDATE items SET name = '" + result[0].name + "', price = " + result[0].price + ", brand = '" + result[0].brand + "' WHERE id = " + itemId;
			db.query(query, function(err, updateResult){
				if(err){
					console.error("Error in patchItem callback");
					callback(err, 0);
				}
				console.log("query : '" + query + "' was run successfully on the db");
				callback(0, result[0]);
			});
		}
	});
	
};

function getItemById(itemId, callback){
	var query = "SELECT * from items where id = " + itemId;
	db.query(query, function(err, result){
		if(err){
			callback(err, 0);
		}
		console.log("query : '" + query + "' was run successfully on the db");
		callback(0, result);
	});
}

function getTotalItems(totalItemsCallback){
	var query = "SELECT count(*) as numrows FROM items";
	db.query(query, function(err, result){
		if(err) {
			totalItemsCallback(err, 0);
		}
		console.log("query : '" + query + "' was run successfully on the db");
		totalItemsCallback(0, result[0]['numrows']);
	});
}




