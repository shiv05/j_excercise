//contains custom exceptions for handling errors

module.exports.InvalidInputException = function(message){	
	return {name: "InvalidInputException", message: message, stack: new Error().stack};
};

module.exports.DatabaseException = function(message){
	return {name: "DatabaseException", message: message, stack: new Error().stack};
};

module.exports.NotFoundException = function(message){
	return {name: "NotFoundException", message: message, stack: new Error().stack};
};