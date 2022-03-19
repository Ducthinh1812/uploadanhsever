var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/asia', function(req, res, next) {
  res.render('asia', { title: 'Asia HD' });
});

router.get('/euro', function(req, res, next) {
  res.render('euro', { title: 'Euro HD' });
});

router.get('/america', function(req, res, next) {
  res.render('america', { title: 'America HD' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});
router.get('/hot', function(req, res, next) {
  res.render('hot', { title: 'Host',message:'' });
});
var fs =require('fs');
router.post('/test',function (repuest,response){
  var  Email= repuest.body.Email;
  var SDT=repuest.body.phonenumber;
  var content =repuest.body.Content;
  console.log(Email);
  console.log(SDT);
  console.log(content);
  fs.writeFile('uploads/'+Email+'.txt','Số Điện Thoại: '+SDT+
      '                                           Nội Dung: '+content,function (error ){
    if (error){
      response.render('hot',{message:error})
    }else {
      response.render('hot',{message:'chúng tôi đã nhận phản hồi'})
    }
  })

});

module.exports = router;

