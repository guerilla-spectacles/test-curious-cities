var express = require('express'),
	router = express.Router(),
	db = require('orchestrate')(process.env.ORCHESTRATE_API_KEY),
  dbCollectionName = 'A-Most-Curious-Notion';
  bodyParser = require('body-parser'),
  _ = require('underscore');


var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  console.log("here is /")
  // db.get(dbCollectionName, req.body)
  // console.log(req.body)
   db.newSearchBuilder()
    .collection(dbCollectionName)
    .limit(100)
    .query('*')
    .then(function (things){
      res.render('index');
    });


});

/** POST / create a new thing **/

router.get('/api', function (req, res) {
  db.list(dbCollectionName, {limit: 100})
  .then(function (result) {
    var items = _.pluck(result.body.results, 'value');
    res.send(JSON.stringify(items));
  })
})
router.post('/api', function (req, res){
  console.log("here is the /api route");
  console.log(req.body);

  db.post(dbCollectionName, req.body)
  .then(function(result) {
    res.redirect('/')
  }) 
});

module.exports = router;
