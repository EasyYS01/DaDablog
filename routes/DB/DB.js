var mongooes=require('mongoose');
/* GET home page. */
function　db(IP,por,blog){
    mongooes.connect('mongodb://'+IP+':'+por+'/'+blog,function(err){
        if(err){
            console.log('数据库链接失败');
        }else{
            console.log('数据库链接成功');
        }
    })
    return mongooes;
}
var mongodb=db('127.0.0.1','27017','blog');
var classSchema=new mongodb.Schema({
    title:String,
    time:String,
    img:String
});
var LabelSchema=new mongodb.Schema({
    title:String,
    time:String,
    xvhao:Number
});
var ArticleSchema=new mongodb.Schema({
    title:String,
    class:String,
    Label1:String,
    Label2:String,
    Label3:String,
    time:String,
    click:Number,
    content:String,
    introduce:String,
    key:String
});
var AdminSchema=new mongodb.Schema({
    uname:String,
    upwd:String,
    Effect:String,
    time:String
});

var messageSchema=new mongodb.Schema({
    Email:String,
    Mobile:String,
    Message:String,
    See:Boolean,
    time:String
});
var classModel=mongodb.model('class',classSchema,'class');
var LabelModel=mongodb.model('Label',LabelSchema,'Label');
var ArticleModel=mongodb.model('Article',ArticleSchema,'Article');
var messageModel=mongodb.model('message',messageSchema,'message');
var AdminModel=mongodb.model('useradmin',AdminSchema,'useradmin');
exports.classModel=classModel;
exports.LabelModel=LabelModel;
exports.ArticleModel=ArticleModel;
exports.messageModel=messageModel;
exports.AdminModel=AdminModel;
