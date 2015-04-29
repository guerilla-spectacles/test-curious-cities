var express = require('express'),
	router = express.Router(),
	db = require('orchestrate')(process.env.ORCHESTRATE_API_KEY),
  dbCollectionName = 'A-Most-Curious-Notion';
  bodyParser = require('body-parser');


var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {

   db.newSearchBuilder()
    .collection(dbCollectionName)
    .limit(10)
    .query('*')
    .then(function (things){
      res.render('index');
    });


});

/** POST / create a new thing **/
router.post('/api', function (req, res){
  console.log("here is the /api route");
  console.log(req.body);

  db.post(dbCollectionName, req.body)  
});

module.exports = router;
