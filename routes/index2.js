var express = require('express');
var router = express.Router();
var db=require('./DB/DB');
/* GET home page. */
var classtitle={};
var Art,phb={},cls;
db.classModel.find().exec((err,img)=>{
    for (var a in img){
        classtitle[img[a].title]=img[a].img;
    }
    cls=img;
    db.ArticleModel.find().sort({'click':-1}).limit(5).exec(function (err,data) {
        phb=data;
    });
});//开启即初始化数据
setInterval(function () {
        db.classModel.find().exec((err,img)=>{
            for (var a in img){
                classtitle[img[a].title]=img[a].img;
            }
            cls=img;
            db.ArticleModel.find().sort({'click':-1}).limit(5).exec(function (err,data) {
                phb=data;
            });
        });
        console.log('刷新');
    }, 30000);//每30秒初始化数据
db.ArticleModel.find().sort({'_id':-1}).limit(10).exec(function (err,data) {
    Art=data;
});//数据路由初始化

router.get('/', function(req, res, next) {
    db.ArticleModel.find().sort({'_id':-1}).exec((err,data)=>{
        for(var i in data){
            data[i].img=[classtitle[data[i].class]];
        }
        for (var i in phb) {
            phb[i].img = [classtitle[phb[i].class]];
        }
        db.LabelModel.find().exec((err,biaoqian)=>{
            res.render('index', {Article:data,biaoqian:biaoqian ,phb: phb});
        })
    });
});//主页路由
router.get('/index.html', function(req, res, next) {
    db.ArticleModel.find().sort({'_id':-1}).exec((err,data)=>{
        for(var i in data){
            data[i].img=[classtitle[data[i].class]];
        }
        for (var i in phb) {
            phb[i].img = [classtitle[phb[i].class]];
        }
        db.LabelModel.find().exec((err,biaoqian)=>{
            res.render('index', {Article:data,biaoqian:biaoqian ,phb: phb});
        })
    });
});//主页路由
router.get('/page',function (req,res,next) {
    db.ArticleModel.findById(req.query.id).exec(function (err, news) {
        db.LabelModel.find().exec((err, biaoqian) => {
            for (var i in phb) {
                phb[i].img = [classtitle[phb[i].class]];
            }
            res.render('info', {
                news: news,
                Label: [{Label: '前端', xvhao: '1'}, {Label: 'WEB开发', xvhao: '2'}, {Label: 'HTML5', xvhao: '3'}],
                guding: Art,
                biaoqian: biaoqian,
                phb: phb,
                classtitle:cls
            });
        });
        news.click = news.click + 1;
        news.save((err) => {
            if (err) {
               throw err;
            }
        });
    });
});//详细页路由
router.get('/list.html',function (req,res,next) {
    db.ArticleModel.find().sort({'_id':-1}).exec((err,data)=>{
        for(var i in data){
            data[i].img=[classtitle[data[i].class]];
        }
        for (var i in phb) {
            phb[i].img = [classtitle[phb[i].class]];
        }
        db.LabelModel.find().exec((err,biaoqian)=>{
            res.render('list', {cont:data,cont2:data,biaoqian:biaoqian ,phb: phb,classtitle:cls});
        })
    });
});//导航栏第一页路由
function getByPager(id,User){
    var pageSize = 13;                   //一页多少条
    var currentPage = id;                //当前第几页
    var sort = {'_id':-1};        //排序（按登录时间倒序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            return res;
        }
    })
}//废弃未用
router.get('/list:id',function (req,res,next) {
    var id=req.params.id;//当前多少页
    var pageSize = 13; //一页多少条
    var currentPage = id;//当前多少页
    var sort = {'_id':-1};//排序（按id排序）
    var condition = {};                 //条件
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
    db.ArticleModel.find().sort({'_id':-1}).exec((err,data2)=>{//全部内容
        db.ArticleModel.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, data) {//查询当前页的内容
            for(var i in data){//给data加内容img
                data[i].img=[classtitle[data[i].class]];

            }
            for (var i in phb) {//给phb加内容img
                phb[i].img = [classtitle[phb[i].class]];
            }
            db.LabelModel.find().exec((err,biaoqian)=>{//查询下标签并且上传渲染了
                res.render('list2', {cont:data,cont2:data2,biaoqian:biaoqian ,phb: phb,classtitle:cls});
            })
        })
    });
});//导航栏第其他页路由

module.exports = router;
