/**
 * New node file
 */

var ejs = require('ejs');
var mysql = require('mysql');
function getConnection(){
	var connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'yelp'	
	});
	return connection;
}
//var sqlQuery = "select * from user";
//fetchData(sqlQuery);
function fetchData(callback, sqlQuery){
	
	//console.log("\nSQL Query::"+sqlQuery);
	var connection = getConnection();
	connection.query(sqlQuery, function(err, rows, fields){
		if(err){
			console.log("err message: " + err.message);
		}else{
			callback(err, rows);
			//console.log(rows);
		}
	});
	console.log("\nConnection closed...");
	connection.end();
}
exports.fetchData = fetchData;


/*
var mysql = require('mysql');
var ejs = require('ejs');
var poolModule = require('generic-pool');


//generic-pool
var pool = poolModule.Pool({
    name     : 'mysql',
    create   : function(callback) {
    	var connection = mysql.createConnection({
    		host    : 'localhost',
    		port    : '3000',
    		user    : 'root',
    		password: '',
    		database: 'yelp'
    	});
    	connection.connect();
    	callback(null, connection);
    },
    max      : 10,
    destroy  : function(client){
    	client.end();
    }
});

//one connection
function getOneConnection(){
	var connection = mysql.createConnection({
		host    : 'localhost',
		user    : 'root',
		password: '',
		database: 'yelp'
	});
	return connection;
}

// get connection from pool
var max = 10;
var pool = [];
for(var i = 0; i < max; ++i){
	pool.push(getOneConnection());
}

var get = function(){
	if(pool.length > 0){
		return pool.pop();
	}else{
		return getOneConnection();
	}
}

var close = function(con){
	if(pool.length == max){
		con.end();
	}else{
		pool.push(con);
	}
}

function getConnectionFromPool(){
	return get();
}


var CONNECTION_TYPE = "pool"; // one means getOneConnection(), pool means getConnectionFromPool()

function getConnection(type){
	if(type == "pool")
		return getConnectionFromPool();
	else if(type == "one")
		return getOneConnection();
	else
		return genericConnection();	
}

//var sqlQuery = "select loginTime from user where userID = 1";
//fetchData(sqlQuery);
function fetchData(callback, sqlQuery){
	console.log("\nSQL Query::"+sqlQuery);
	var connection = getConnection(CONNECTION_TYPE);
	connection.query(sqlQuery, function(err, rows, fields){
		
		if(err){
			console.log("err message: " + err.message);
		}else{
			callback(err, rows);
			console.log(rows);
			console.log("\nConnection closed...");
			connection.end();
		}
	});
}

//var sqlQuery = "insert into category set cName = 'Grocery'";
//insertData(sqlQuery);


//var sqlQuery = "delete from category where cName = 'Pets'";
//deleteData(sqlQuery);


//var sqlQuery = "update category set cName = 'cinema' where categoryID = 2";



//var sqlQuery = "insert into user (firstName, lastName, email, password) values ('z', 'z', 'z@gmail.com', 'z')";


var pool = mysql.createPool({
	host    : 'localhost',
	user    : 'root',
	password: '',
	database: 'yelp'
	//numberOfConnections
});



exports.fetchData = fetchData;


*/



















