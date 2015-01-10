/**
 * New node file
 */
var ejs = require("ejs");
var mysql = require('./mysql');

exports.pool = function(req,res){
	var poolSql = "select * from category where cid=1";
	mysql.fetchData(function(err,data){
		console.log(data);
		res.redirect('/');
	},poolSql);
}

exports.one = function(req,res){
	var oneSql = "select * from category where cid=1";
	mysql.fetchData(function(err,data){
		console.log(data);
		res.redirect('/');
	},oneSql);
}
exports .signout = function(req,res){
	var d = new Date();
	var month = d.getMonth()+1;
	var dstr =  month+"/"+d.getDate()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes();
	var updateSql = "update users set llogin = '"+dstr+"' where emailid='"+req.session.user+"'";
	mysql.fetchData(function(err, data){
		req.session = null;
		res.redirect('/');
	},updateSql);
}
exports.showUserInfo = function(req,res){
	var currUser = req.session.user;
	var info = "select * from users where emailid = '"+currUser+"'";
	var contentSql = "select * from users join reviews on users.uid=reviews.uid where users.emailid = '"+currUser+"'";
	var uid = 0;//original value;
	var fname='';
	var lname='';
	var llogtime='';
	var einfo = "";
	mysql.fetchData(function(err,results1){
		cont = results1[0].content;
	}, contentSql);
	mysql.fetchData(function(err, results){
		fname = results[0].firstname;
		lname = results[0].lastname;
	    uid = results[0].uid;
		llogtime = results[0].llogin;
		console.log(uid);
		einfo = "select * from reviews join element on reviews.eid=element.eid where uid='"+uid+"'";
		mysql.fetchData(function(err,results2){
			console.log(results2);
			res.render("userinfo",{title:'user',userfname:fname, userlname: lname, uid:uid,eNameCont: results2, llogin:llogtime });
		},einfo);
	},info);
	
	
	
	
}

exports.list = function(req,res){
	var cid = req.param.cid;
	var elemSql = "select * from element where cid='"+cid+"'";
	mysql.fetchData(function(err, results){
		if(err) throw err;
		else{
			console.log(results);
			console.log(JOSN.stringify(results));
			res.send(results);
		}
	},elemSql);
}
exports.deleteElem = function(req,res){
	res.render("deleteElem",{title: 'Delete Element'});
}

exports.doDeleteElem = function(req,res){
	var ename = req.param("inputElemName");
	var checkExist = "select * from element where ename = '"+ename+"'";
	var deleteSql = "delete from element where ename = '"+ename+"'";
	mysql.fetchData(function(err, results){
		if(results.length>0){
			mysql.fetchData(function(err,results){
				console.log('deleted');
				res.redirect('/main');
			},deleteSql);
		}else{
			req.session.error = 'element does not exists';
			res.redirect('/deleteElem');
		}
	},checkExist);
}
exports.deleteCat = function(req,res){
	res.render("deleteCategory",{title: 'Delete Category'})
}
exports.doDeleteCat = function(req,res){
	var cname = req.param("inputCategory");
	var checkExist = "select * from category where cname = '"+cname+"'";
	var deleteSql = "delete from category where cname = '"+cname+"'";
	mysql.fetchData(function(err, results){
		if(results.length>0){
			mysql.fetchData(function(err,results){
				console.log('deleted');
				res.redirect('/main');
			},deleteSql);
		}else{
			req.session.error = 'category does not exists';
			res.redirect('/deleteCat');
		}
	},checkExist);
}

exports.addElem = function(req,res){
	res.render("addElem", {title: 'Add element'});
}
/*
exports.doAddElem = function(req,res){
	// userinfo = req.session.userinfo;
	var ename = req.param("inputElemName");
	var des = req.param("inputDecription");
	var rate = req.param("inputRate");
	var cid = req.param("inputCatId");
	//var review = req.param("inputReviews");
	//var checkExist = "select * from element where ename = '"+ename+"'";
	var checkExist = "select * from element where ename = '"+ename+"'";
	//var insertSql = "insert into element(ename, description, rating, cid) values('"+ename+"','"+des+"', '"+rate+"', '"+cid+"')";
	var insertSql = "insert into element(ename, description, rating, cid) values('"+ename+"', '"+des+"', '"+rate+"', '"+cid+"')"
	//var eid = '';
	//var uid = ''+userinfo[0].uid;
	mysql.fetchData(function(err, results){
		if(results.length>0){
			req.session.error = 'element exists';
			res.redirect('/addElem');
		}else{
			mysql.fetchData(function(err,results){
				console.log('added');
				res.redirect('/main');
			},insertSql);
		}
	},checkExist);
	//var eidSql = "select * from element where ename='"+ename+"'";
	//mysql.fetchData(function(err,results){
	//	eid=''+results[0].eid;
	//	console.log(eid);
	//},eidSql);
	//var insertReview = "insert into reviews(uid, eid, content,rate) values('"+userinfo[0].uid+"', '"+eid+"', '"+review+"','"+rate+"')";
	//mysql.fetchData(function(err,results){
	
	//},insertReview);
	
}
*/
exports.doAddElem = function(req,res){
	var userinfo = req.session.userinfo;
	var uid = userinfo[0].uid;
	console.log(uid);
	var ename = req.param("inputElemName");
	console.log(ename);
	var des = req.param("inputDecription");
	var rate = req.param("inputRate");
	var cname= req.param("inputCatName");
	var cont = req.param("inputReviews");
	var checkExist = "select * from element where ename = '"+ename+"'";
	var getCatId = "select * from category where cname = '"+cname+"'";
	mysql.fetchData(function(err, results){
		if(results.length>0){
			req.session.error = 'element exists';
			res.redirect('/addElem');
		}else{
			console.log(getCatId);
			mysql.fetchData(function(err,results1){
				console.log('added');
				console.log(results1);
				var insertElem = "insert into element(ename, description,rating,cid) values('"+ename+"','"+des+"','"+rate+"','"+results1[0].cid+"')";
				mysql.fetchData(function(err,results2){
					console.log(results2);
					var eidSql ="select * from element where ename = '"+ename+"'";
					mysql.fetchData(function(err, results3){
						console.log(results3[0].eid);
						var insertReview = "insert into reviews(uid, eid,content, rate) values('"+uid+"','"+results3[0].eid+"','"+cont+"','"+rate+"')";
						mysql.fetchData(function(err, results4){
							console.log(results4);
						},insertReview);
					},eidSql);
					res.redirect('/main');
				},insertElem);
				
			},getCatId);
			
			
		}
	},checkExist);
	
	
	
}

exports.eleinfo = function(req,res){
	var eid = req.query.eid;
	var name = "";
	var rate = "";
	var des = "";
	var rev = "";
	var rev_html = "";
	var eleSQL = "select * from element where eid = '"+eid+"'";
	var revSQL = "select * from element join users join reviews where reviews.eid = element.eid and reviews.uid = users.uid and element.eid = "+eid;
	mysql.fetchData(function(err,data){
		name = data[0].ename;
		rate = data[0].rating+"/5.0";
		des = data[0].description;
		//rev ='<a href="/addreview?eid='+eid+'" class="ybtn ybtn-primary ytype war-button"><span  class="i-wrap ig-wrap-common i-war-star-common-wrap"><i  class="i ig-common i-war-star-common"></i> Write a Review</span></a>';
		mysql.fetchData(function(err,data){
			//for(var i=0;i<data.length;i++){
				//rev_html += '<li><div class="review review-with-no-actions" data-review-id="2cETD5PTiMqD7LihZN0TRg" itemprop="review" itemscope itemtype="http://schema.org/Review"><div class="review-sidebar"><div class="review-sidebar-content"><div class="ypassport media-block clearfix"><div class="media-story"><ul class="user-passport-info"><li class="user-name">'+data[i].firstname+' '+data[i].lastname+'</li></ul></div></div></div></div><div class="review-wrapper"><div class="review-content"><div class="biz-rating biz-rating-very-large clearfix"><div itemprop="reviewRating" itemscope itemtype="http://schema.org/Rating"><div class="rating-very-large">'+data[i].rate+'.0/5.0</div></div></div><p class="review_comment ieSucks" itemprop="description" lang="en">'+data[i].review+'</p></div></div></div></li>';
			//}
			res.render("eleinfo",{elename:name,elerate:rate,eledes:des,eleid:eid,review:data});
		},revSQL);
	},eleSQL);
	
}

exports.addreview = function(req,res){
	res.render("addreview",{eid:'"'+req.query.eid+'"'});
}

exports.doAddreview = function(req,res){
	var review = req.param("inputReview");
	var rate = req.param("inputRate");
	var eleid = req.param("inputEleId");
	var uidSql="select * from users where emailid='"+req.session.user+"'";
	var avgSql="select AVG(rate) as avg_rate from reviews where eid = '"+eleid+"'";
	mysql.fetchData(function(err, data){
		if(data==""||data==null){
			req.session.error='session broken please login again';
			res.redirect('/');
		}else{
			var insertSql = "insert into reviews(uid,eid,content,rate) values("+data[0].uid+",'"+eleid+"','"+review+"','"+rate+"')";
			mysql.fetchData(function(err, data2){
				console.log("invokeed[add]");
				mysql.fetchData(function(err,avg){
					console.log(avg[0].avg_rate);
					var updateSql = "update element set rating = "+[avg[0].avg_rate]+" where eid='"+eleid+"'";
					mysql.fetchData(function(err, avg){
						
					},updateSql);
				},avgSql);
			},insertSql);
			res.redirect('/showUserInfo');
		}
	},uidSql);
}

exports.addCategory = function(req,res){
	res.render("addCategory",{title: 'Add category'});
}

exports.doAddCategory = function(req,res){
	var cname = req.param("inputCategory");
	var checkExist = "select * from category where cname = '"+cname+"'";
	var insertSql = "insert into category(cname) values('"+cname+"')";
	mysql.fetchData(function(err,results){
		if(results.length>0){
			req.session.error = 'category exists';
			res.redirect('/addCategory');
		}else{
			mysql.fetchData(function(err,results){
				console.log('added');
				res.redirect('/main');
			},insertSql);
		}
	},checkExist);
}
exports.main = function(req,res){
	console.log(req.session.user);//does not know how it work
	
	if(!req.session.user){
		
		req.session.error='Sign in first';
		res.redirect('/');
	}else{
		
		var catid = req.params.cate;
		var time = new Date();
		var selectCat = "select * from category";
		mysql.fetchData(function(err, results){
			var selectEle = "select * from element join category on element.cid = category.cid where category.cid='"+catid+"'";
			mysql.fetchData(function(err, results2){
				
				res.render("main",{title: 'Yelp',category: results, time: time, elements: results2});
			},selectEle);
				
		},selectCat);
	}
}
function signin(req,res) {
	res.render("signin",{title:'Signin'});	
}

function afterSignIn(req,res)
{
	// check user already exists
	var user = req.param("inputEmail");
	var pwd = req.param("inputPassword");
	var getUser="select * from users where emailid='"+user+"' AND password = '"+pwd+"'";
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
		console.log("select:"+results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				
				console.log("valid Login");
				req.session.user = user;
				 req.session.user = results[0].emailid;
				 req.session.userinfo = results;
		         welcome = results[0].firstname;
		         
		         res.redirect('/main');
		         
			}
			else {    
				console.log("Invalid Login");
				req.session.error='wrong username or password';
				res.redirect('/');
			}
		}  
	},getUser);
}
function signup(req,res){

	ejs.renderFile('./views/signup.ejs',function(err, result) {
	   // render on success
	   if (!err) {
	            res.end(result);
	   }
	   // render or error
	   else {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}
function afterSignUp(req,res){
	var getUser1="select * from users where emailid='"+req.param("inputEmail")+"'";
	console.log("Query is:"+getUser1);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("email already exists, please user another email");
				ejs.renderFile('./views/signup.ejs',function(err, result) {
			        // render on success
			        if (!err) {
			            res.end(result);
			        }
			        // render or error
			        else {
			            res.end('An error occurred');
			            console.log(err);
			        }
			    });
			}
			else {    
				var insertNewUser = "insert into users values ('"+req.param("inputFirstName")+"','"+req.param("inputLastName")+"','"+req.param("inputEmail")+"','"+req.param("inputPassword")+"')";
				console.log("Query is:"+insertNewUser);
				mysql.fetchData(function(err,result1){
					if(err){
						throw err;
					}else{
						console.log("new user inserted");
						var showNewUser = "select * from users where emailid='"+req.param("inputEmail")+"'";
						console.log("Query is:"+showNewUser);
						mysql.fetchData(function(err, result2){
							if(err){
								throw err;
							}else{
								if(result2.length>0){
									console.log(result2);
									ejs.renderFile('./views/signin.ejs',function(err, result2) {
								        // render on success
								        if (!err) {
								            res.end(result2);
								        }
								        // render or error
								        else {
								            res.end('An error occurred');
								            console.log(err);
								        }
								    });
								}else{
									console.log("failed signup");
								}
							}
						},showNewUser);
					}
					
				},insertNewUser);
			}
		}  
	},getUser1);
}
function showCategory(req,res){

	var category="select cname from category";
	console.log("Query is:"+category);
	
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			if(results.length > 0){
				console.log("number of category > 0");
				console.log(results);
			}
			else {    
				
				console.log("No Category.");
				
			}
		}  
	},category);
}


exports.signin=signin;
exports.afterSignIn=afterSignIn;
exports.signup=signup;
exports.afterSignUp=afterSignUp;
exports.showCategory=showCategory;