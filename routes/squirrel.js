var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('squirrel', { title: 'Search Results squirrel' });
});
module.exports = router;
var express = require('express');
const squirrel_controlers= require('../controllers/squirrel');
var router = express.Router();
/* GET squirrels */
router.get('/', squirrel_controlers.squirrel_view_all_Page );
module.exports = router;
