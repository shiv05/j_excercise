//file for configuration variables

var config = {};

config.db = {
	host: "127.0.0.1",
	user: "root",
	pass: "",
	database: "jetspree_backend_test"
};

config.items = {
	defaultPageSize: "5",
	maxPageSize: "500"
}

module.exports = config;