var express = require('express');
var router = express.Router();
var db=require('./DB/DB');
/* GET home page. */
var classtitle={};
var Art10,phb={},cls,Art,Lab;
setTimeout(function () {
    db.classModel.find().exec((err,img)=>{
        for (var a in img){
            classtitle[img[a].title]=img[a].img;
        }
        cls=img;
        db.ArticleModel.find().sort({'click':-1}).limit(5).exec(function (err,data) {
            phb=data;
        });
    });//开启即初始化数据
    db.classModel.find().exec((err,img)=>{
        for (var a in img){
            classtitle[img[a].title]=img[a].img;
        }
        cls=img;
        db.ArticleModel.find().sort({'click':-1}).limit(5).exec(function (err,data) {
            phb=data;
        });
    });
    db.ArticleModel.find().sort({'_id':-1}).limit(10).exec(function (err,data) {Art10=data;});//数据路由初始化
    db.ArticleModel.find().sort({'_id':-1}).exec((err,data)=>{Art=data});
    db.LabelModel.find().exec((err,biaoqian)=>{Lab=biaoqian});
},0);//开始即开始缓存数据
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
        db.ArticleModel.find().sort({'_id':-1}).limit(10).exec(function (err,data) {Art10=data;});//数据路由初始化
        db.ArticleModel.find().sort({'_id':-1}).exec((err,data)=>{Art=data});
        db.LabelModel.find().exec((err,biaoqian)=>{Lab=biaoqian});
        console.log('刷新');
    }, 30000);//每30秒初始化数据
function Labs(news,Lab){
    var text=[];
    var text1=9999,text2=9999,text3=9999;
    for(var s in Lab){
        if(typeof news.Label1 != 'undefined'){
            if(news.Label1==Lab[s].title){
                text1=s;
            }
        }
        if(typeof news.Label2 != 'undefined'){
            if(news.Label2==Lab[s].title){
                text2=s;
            }
        }
        if(typeof news.Label3 != 'undefined'){
            if(news.Label3==Lab[s].title){
                text3=s;
            }
        }
    }
    if(text1==9999){
        text=[];
    }else{
        if (text2==9999){
            text=[{Label: Lab[text1].title, xvhao: Lab[text1].xvhao}];
        } else{
            if (text3==9999){
                text=[{Label: Lab[text1].title, xvhao: Lab[text1].xvhao},{Label: Lab[text2].title, xvhao: Lab[text2].xvhao}];
            }else{
                text=[{Label: Lab[text1].title, xvhao: Lab[text1].xvhao},{Label: Lab[text2].title, xvhao: Lab[text2].xvhao},{Label: Lab[text3].title, xvhao: Lab[text3].xvhao}];
            }
        }
    }
    console.log(text1,text2,text3);
    return text;
}
router.get('/', function(req, res, next) {
        for(var i in Art){
            Art[i].img=[classtitle[Art[i].class]];
        }
        for (var i in phb) {
            phb[i].img = [classtitle[phb[i].class]];
        }
            res.render('index', {Article:Art,biaoqian:Lab ,phb: phb});
});//主页路由
router.get('/index.html', function(req, res, next) {
    for(var i in Art){
        Art[i].img=[classtitle[Art[i].class]];
    }
    for (var i in phb) {
        phb[i].img = [classtitle[phb[i].class]];
    }
    res.render('index', {Article:Art,biaoqian:Lab ,phb: phb});
});//主页路由
router.get('/page',function (req,res,next) {
    db.ArticleModel.findById(req.query.id).exec(function (err, news) {
        for (var i in phb) {
            phb[i].img = [classtitle[phb[i].class]];
        }
        res.render('info', {
            news: news,
            Label:Labs(news,Lab),
            guding: Art10,
            biaoqian: Lab,
            phb: phb,
            classtitle:cls
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

        for(var i in Art){
            Art[i].img=[classtitle[Art[i].class]];
        }
        for (var i in phb) {
            phb[i].img = [classtitle[phb[i].class]];
        }
            res.render('list', {cont:Art,cont2:Art,biaoqian:Lab ,phb: phb,classtitle:cls});
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
        db.ArticleModel.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, data) {//查询当前页的内容
            for(var i in data){//给data加内容img
                data[i].img=[classtitle[data[i].class]];
            }
            for (var i in phb) {//给phb加内容img
                phb[i].img = [classtitle[phb[i].class]];
            }
                res.render('list2', {cont:data,cont2:Art,biaoqian:Lab ,phb: phb,classtitle:cls,pageSize:pageSize});
        })
});//导航栏第其他页路由
router.get('/info.html',function(req,res,next) {
    res.render('jsz', {
        biaoqian: Lab,
        classtitle:cls
    });
})
router.post('/contact',function (req,res,next) {
    var cla=new db.messageModel();
    cla.Email=req.body.email;
    cla.Mobile=req.body.Mobile;
    cla.Message=req.body.message;
    cla.See=false;
    cla.time=new Date().toLocaleString();
    cla.save((err)=>{
        if(err){
            res.send('<script>alert("留言失败请重试!!!");location.href="/ly.html"</script>');
        }else{
            res.send('<script>alert("留言成功!!!");location.href="/ly.html"</script>');
        };
    });
});
module.exports = router;
//后台admin路由需要完善：admin账号的增删改查，友情链接需要做火。再写20篇文章。栏目删除，访问者记录，管理员的访问者记录