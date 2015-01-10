	
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , home = require('./routes/home');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.cookieSession({secret : 'test.me'}));
app.use(express.session({
    secret : 'test.me',
    //store: new MySQlSessionStore(),
    cookie: { maxAge: 900000 } 
}));
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
    var welcome="";
    next();
});

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/', home.signin);
app.get('/signin', home.signin);
app.post('/afterSignIn', home.afterSignIn);
app.get('/signup', home.signup);
app.post('/afterSignUp', home.afterSignUp);
app.get('/showCategory', home.showCategory);
app.get('/main',home.main);
app.get('/main/:cate',home.main);
app.get('/addCategory',home.addCategory);
app.post('/doAddCategory', home.doAddCategory);
app.get('/addElem',home.addElem);
app.post('/doAddElem',home.doAddElem);
app.get('/deleteCat',home.deleteCat);
app.post('/doDeleteCat', home.doDeleteCat);
app.get('/deleteElem',home.deleteElem);
app.post('/doDeleteElem',home.doDeleteElem);
app.get('list/:cid',home.list);
app.get('/showUserInfo',home.showUserInfo);
app.get('/signOut',home.signout);
app.get('/ele_info',home.eleinfo);
app.get('/addreview',home.addreview);
app.post('/doAddreview',home.doAddreview);
app.get('/pool',home.pool);
app.get('/one',home.one);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
