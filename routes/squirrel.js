var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('squirrel', { title: 'Search Results squirrel' });
});

var express = require('express');
const squirrel_controlers= require('../controllers/squirrel');
var router = express.Router();
/* GET squirrels */
router.get('/', squirrel_controlers.squirrel_view_all_Page );
/* GET detail squirrel page */
router.get('/detail',secured, squirrel_controlers.squirrel_view_one_Page);
/* GET create squirrel page */
router.get('/create',secured, squirrel_controlers.squirrel_create_Page);
/* GET create update page */
const secured = (req, res, next) => {
  if (req.user){
  return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
  }
router.get('/update',secured, squirrel_controlers.squirrel_update_Page);

/* GET delete squirrel page */
router.get('/delete',secured,squirrel_controlers.squirrel_delete_Page);
module.exports = router;

