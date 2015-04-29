var express = require('express'),
    http = require('http'),
    path = require('path'),
    aws = require('aws-sdk'),
    uuid = require('node-uuid'),
    ExifImage = require('exif').ExifImage;
    db = require('orchestrate')(process.env.ORCHESTRATE_API_KEY),
    dbCollectionName = 'Most-Curious-Data';

var app = express();

var routes = require('./routes/index');

app.set('views', path.join(__dirname, 'public'));
app.set('title', 'Curious Cities ');
app.engine('html', require('ejs').renderFile);
app.set('port', process.env.PORT || 3000);
app.use('/api', routes);
app.use('/c/:id', routes);
app.use(express.static(path.join(__dirname, 'public')));

var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
var S3_BUCKET_NAME = process.env.S3_BUCKET_NAME

// router.get('/', function(req, res){
//     res.render('index.html');
// });

app.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY_ID , secretAccessKey: AWS_SECRET_ACCESS_KEY });
    var s3 = new aws.S3(); 
    var unique_name = uuid.v1();
    var s3_params = { 
        Bucket: S3_BUCKET_NAME,
        Key: unique_name,
        Expires: 60, 
        ContentType: req.query.s3_object_type, 
        ACL: 'public-read'
    }; 
    s3.getSignedUrl('putObject', s3_params, function(err, data){ 
        if(err){ 
            console.log(err); 
        }
        else{ 
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET_NAME+'.s3.amazonaws.com/'+s3_params.Key
            };
            res.write(JSON.stringify(return_data));
            res.end();
        } 
    });
});

//     app.post('/submit_form', function(req, res){
// //    
//         db.post('curious-data', {
//             "url": req.param("picture_url"),
//             "name": req.param("name"),
//             "description": req.param("description"),
//             "category": req.param("oddity_type"),
//             "uploadTime": new Date()
//         })
//         .then(function (res) {
//             console.log(res.statusCode)
//         })
//         .fail(function(err) {

//         });
// });

app.listen(app.get('port'));
