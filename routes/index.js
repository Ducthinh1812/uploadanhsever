var express = require('express');
var router = express.Router();

var multer = require('multer');
var db = 'mongodb+srv://ducthinh18122002:nU7aXJdn!_X45MQ@cluster0.bs5ca.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error => {
  console.log("co loi xay ra")
});
var hinhAnhSch = new mongoose.Schema({
  tenHA : 'string',
  noiDungHA : 'string',
  linkHA : 'string'
});

var HinhAnh = mongoose.model('hinhanh', hinhAnhSch);

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
router.get('/addimg', function(req, res, next) {
  res.render('addimg', { title: 'addimg',message:'' });
});
router.get('/listimg',function (req,res) {
  console.log('listimg')
  HinhAnh.find({}, function (err, data){
    res.render('listimg', {title: 'List image',data: data});
    console.log(data)
  })
})


router.get('/updateimg', function(req, res, next) {
  res.render('updateimg', { title: 'updateimg',message:'' });
});
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if(file.mimetype == 'image/jpeg'){
      cb(null, 'uploads/');
    }else {
      cb(new Error("Chỉ được up load file .jpg và không được quá  5  file"), false)
    }

  },
  filename: function(req, file, cb) {
    cb(null, Date.now() +".jpg"  );
  },
});

var upload1 = multer({ storage: storage , litmits : {
    filesize : 1 * 1024 ,
    files : 5
  }});
router.get('/upload', function (req , res){
  res.render('upload',{title : "Upload File",message:''});
})
router.post('/upload' ,upload1.single('avatar'), (req , res , next ) =>{
  const file = req.file;
  if(!file){
    res.render('upload',{message:"Tải File thất bại."})
  }else {
    res.render('upload',{message:'Tải File thành công.'})
  }
})

router.get('/danhsach', function(req, res, next) {
  var danhsach = [
    {
      "albumId": 1,
      "id": 1,
      "title": "accusamus beatae ad facilis cum similique qui sunt",
      "url": "https://via.placeholder.com/600/92c952",
      "thumbnailUrl": "https://via.placeholder.com/150/92c952"
    },
    {
      "albumId": 1,
      "id": 2,
      "title": "reprehenderit est deserunt velit ipsam",
      "url": "https://via.placeholder.com/600/771796",
      "thumbnailUrl": "https://via.placeholder.com/150/771796"
    },
    {
      "albumId": 1,
      "id": 3,
      "title": "officia porro iure quia iusto qui ipsa ut modi",
      "url": "https://via.placeholder.com/600/24f355",
      "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    },
    {
      "albumId": 1,
      "id": 4,
      "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
      "url": "https://via.placeholder.com/600/d32776",
      "thumbnailUrl": "https://via.placeholder.com/150/d32776"
    }
  ]

  res.render('danhsach', { title: 'Danh Sách' , danhsach : danhsach,message:''});
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
router.post('/addimg', function (request, response){
  var tenHA = request.body.tenHA;
  var noiDungHA = request.body.noiDungHA;
  var linkHA = request.body.linkHA;

  console.log(tenHA + noiDungHA + linkHA);

  const data = new HinhAnh({
    tenHA : tenHA,
    noiDungHA : noiDungHA,
    linkHA : linkHA
  });

  data.save(function (error){
    var mes;
    if (error == null){
      mes = 'them thanh cong'
      console.log('them thanh cong')
    }else mes = error
    response.render('addimg', {message: mes});
  })
});

router.post('/updateimg', function (request, response){
  var tenHA = request.body.tenHA;
  var noiDungHA = request.body.noiDungHA;
  var linkHA = request.body.linkHA;

  //  console.log(email + ten + sdt);

  HinhAnh.updateOne({tenHA : tenHA}, {tenHA: tenHA, noiDungHA : noiDungHA, linkHA: linkHA}, function (err){
    if(err) throw err;
    console.log('Sua thanh cong');
  });
});

router.post('/xoaHA', function (request, response){
  var tenHA = request.body.tenHA;

  console.log(tenHA);

  HinhAnh.deleteOne({tenHA : tenHA},  function (err){
    if(err) throw err;
    console.log('Xoa thanh cong');
  });
});

module.exports = router;

