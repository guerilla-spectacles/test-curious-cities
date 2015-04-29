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
      console.log("hello from the server after newSearchBuilder");
      res.render('index');
    });


});



// router.post('/c/:id', function(req, res) {
//   var id = req.param("id")
//   , post = {
//     text: req.param("answer")
//   }

//   db.newEventBuilder()
//     .from(dbCollectionName, id)
//     .type('post')
//     .data(post)
//     .then(function (results){
//       res.redirect("/c/" + id);
//     });
// });

/** POST / create a new thing **/
router.post('/api', function (req, res){
  console.log("here is the /api route");
  console.log(req.body);

  db.post(dbCollectionName, req.body)  
});

module.exports = router;
