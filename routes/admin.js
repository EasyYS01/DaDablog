var express = require('express');

var router = express.Router();
var db=require('./DB/DB');
router.get('/index.html', function(req, res, next) {
    index(res);
});
router.get('/', function(req, res, next) {
    index(res);
});
router.get('/article.html', function(req, res, next) {
    db.ArticleModel.find({}).sort({'_id':-1}).exec((err,data)=>{
        res.render('admin/article',{Article:data,fenleigeshu:data.length});
    });
});
router.get('/manage-user.html', function(req, res, next) {
    db.AdminModel.find({}).sort({'_id':-1}).exec((err,data)=>{
        res.render('admin/manage-user',{adminuser:data,adminusergeshu:data.length});
    });
});
router.get('/add-article.html',function (req, res, next) {
    db.classModel.find().exec((err,calssdata)=>{
        db.LabelModel.find().exec((err,biaoqiandata)=>{
            res.render('admin/add-article', {list:calssdata,biaoqian: biaoqiandata});
        });
    });
});
router.get('/notice.html',function (req, res, next) {
    db.classModel.find().exec((err,data)=>{
        res.render('admin/notice',{fenlei:data,fenleigeshu:data.length});
    });
});
router.get('/message.html',function (req, res, next) {
    db.messageModel.find().exec((err,data)=>{
        res.render('admin/message',{message:data,fenleigeshu:data.length});
    });
});
router.get('/ed-notice.html',function (req, res, next) {
    db.classModel.findById(req.query.id).exec((err,data)=>{
        res.render('admin/add-notice',{fenlei:data});
    });
});
router.get('/comment.html',function (req,res,next) {
    db.LabelModel.find().exec((err,data)=>{
        res.render('admin/comment',{fenlei:data,fenleigeshu:data.length});
    });
})
router.get('/ed-comment.html',function (req, res, next) {
    db.LabelModel.findById(req.query.id).exec((err,data)=>{
        res.render('admin/add-comment',{fenlei:data});
    });
});
router.get('/ed-Article.html', function(req, res, next) {
    db.classModel.find().exec((err,calssdata)=>{
        db.LabelModel.find().exec((err,biaoqiandata)=>{
            console.log(req.query.id);
            db.ArticleModel.findById(req.query.id).exec((err,data)=>{
                console.log(data,calssdata,biaoqiandata);
                res.render('admin/ed-Article', {list:calssdata,biaoqian: biaoqiandata,Article:data});
            });

        });
    });
});
router.get('/ed-message.html',function (req,res,next) {
    db.messageModel.findById(req.query.id).exec((err,data)=>{
        if (err){
            res.send('<script>alert("查看此条数据时出错，请检查后再试!!!");location.href="/admin/message.html";</script>');
        }else{
            data.See=true;
            data.save((err)=>{
                if (err){
                    res.send('<script>alert("查看此条数据出错，请检查后再试!!!");location.href="/admin/message.html";</script>');
                }else{
                    res.send('<script>alert("查看此条数据成功！！！");location.href="/admin/message.html";</script>');
                }
            });
        };
    });
})
router.post('/add', function(req, res, next) {
    console.log(req.body)
    var cla=new db.ArticleModel();
    cla.title=req.body.title;
    cla.class=req.body.category;
    if(typeof req.body.checkbox==undefined){

    }else{
        if(req.body.checkbox.length<=3){
            cla.Label1=  req.body.checkbox[0];
            cla.Label2=  req.body.checkbox[1];
            cla.Label3=  req.body.checkbox[2];
        }else if(req.body.checkbox.length<=2){
            cla.Label1=  req.body.checkbox[0];
            cla.Label2=  req.body.checkbox[1];

        }else{
            cla.Label1=  req.body.checkbox;

        }
    }

    cla.time=new Date().toLocaleString();
    cla.click=0;
    cla.content=req.body.content;
    cla.introduce=req.body.describe;
    cla.key=req.body.keywords;
    cla.save((err)=>{
        if(err){
            res.send('<script>alert("新增文章失败请重试!!!");location.href="/admin/article.html"</script>');
        }else{
            res.send('<script>alert("新增文章成功!!!");location.href="/admin/article.html"</script>');
        };
    });
});
router.post('/useradd', function(req, res, next) {
    console.log(req.body)
    var cla=new db.AdminModel();
    cla.uname=req.body.username;
    cla.Effect=req.body.usertel;
    cla.time=new Date().toLocaleString();
    cla.upwd=req.body.password;
    cla.save((err)=>{
        if(err){
            res.send('<script>alert("新增文章失败请重试!!!");location.href="/admin/manage-user.html"</script>');
        }else{
            res.send('<script>alert("新增文章成功!!!");location.href="/admin/manage-user.html"</script>');
        };
    });
});

router.post('/add-notice', function(req, res, next) {
    var cla=new db.classModel();
    cla.title=req.body.title;
    cla.time=new Date().toLocaleString();
    cla.img=req.body.img;
    cla.save((err)=>{
        if(err){
            res.send('<script>alert("新增分类失败请重试!!!");location.href="/admin/notice.html"</script>');
        }else{
            res.send('<script>alert("新增分类成功!!!");location.href="/admin/notice.html"</script>');
        };
    });
});
router.post('/add-comment', function(req, res, next) {
    var cla=new db.LabelModel();
    cla.title=req.body.title;
    cla.time=new Date().toLocaleString();
    var xvhao=0;
    db.LabelModel.find().exec((err,data)=>{
            for(var i in data){
                xvhao=data[i].xvhao;
            }
            cla.xvhao=xvhao+1;
            cla.save((err)=>{
                if(err){
                    res.send('<script>alert("新增标签失败请重试!!!");location.href="/admin/comment.html"</script>');
                }else{
                    res.send('<script>alert("新增标签成功!!!");location.href="/admin/comment.html"</script>');
                };
            });

    });
});
router.post('/add-noticexg',function (req, res, next) {
    db.classModel.findById(req.body.id).exec((err,data)=>{
        if (err){
            res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/notice.html";</script>');
        }else{
            data.title=req.body.title;
            data.img=req.body.img;
            data.time=new Date().toLocaleString();
            data.save((err)=>{
                if (err){
                    res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/notice.html";</script>');
                }else{
                    res.send('<script>alert("修改成功！！！");location.href="/admin/notice.html";</script>');
                }
            });
        };
    });
});
router.post('/add-commentxg',function (req, res, next) {
    console.log(req.body.id);
    db.LabelModel.findById(req.body.id).exec((err,data)=>{
        if (err){
            res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/notice.html";</script>');
        }else{
            console.log(data);
            data.title=req.body.title;
            data.time=new Date().toLocaleString();
            data.save((err)=>{
                if (err){
                    res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/comment.html";</script>');
                }else{
                    res.send('<script>alert("修改成功！！！");location.href="/admin/comment.html";</script>');
                }
            });
        };
    });
});
router.post('/update',function (req, res, next) {
    console.log(req.body);
    db.AdminModel.findById(req.body.id).exec((err,data)=>{
        if (err){
            res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/manage-user.html";</script>');
        }else{

            data.uname=req.body.username;
            data.upwd=req.body.usertel;
            data.Effect=req.body.usere;
            data.save((err)=>{
                if (err){
                    res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/manage-user.html";</script>');
                }else{
                    res.send('<script>alert("修改成功！！！");location.href="/admin/manage-user.html";</script>');
                }
            });
        };
    });
});

router.post('/see',function (req, res, next) {
    db.AdminModel.findById(req.body.id).exec((err,data)=>{
        if (err){
            res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/notice.html";</script>');
        }else{
            res.send(JSON.stringify(data));
        };
    });
});

router.post('/edArticle',function (req, res, next) {
    db.ArticleModel.findById(req.body.id).exec((err,data)=>{
        if (err){
            res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/notice.html";</script>');
        }else{
            console.log(req.body);
            data.title=req.body.title;
            data.class=req.body.category;
            if(typeof req.body.checkbox==undefined){
                data.Label2=  null;
                data.Label1=  null;data.Label3=  null;

            }else{
                if(req.body.checkbox.length<=3){
                    data.Label1=  req.body.checkbox[0];
                    data.Label2=  req.body.checkbox[1];
                    data.Label3=  req.body.checkbox[2];
                }else if(req.body.checkbox.length<=2){
                    data.Label1=  req.body.checkbox[0];
                    data.Label2=  req.body.checkbox[1];
                    data.Label3=  null;
                }else{
                    data.Label1=  req.body.checkbox;
                    data.Label2=  null;
                    data.Label3=  null;
                }
            }
            data.content=req.body.content;
            data.introduce=req.body.describe;
            data.key=req.body.keywords;
            data.save((err)=>{
                if (err){
                    res.send('<script>alert("保存数据时出错，请检查后再试!!!");location.href="/admin/article.html";</script>');
                }else{
                    res.send('<script>alert("修改成功！！！");location.href="/admin/article.html";</script>');
                }
            });
        };
    });
});
router.post('/class',function (req,res,next) {
    db.classModel.findById(req.body.id).exec((err,data)=>{

        if (err){
            console.log('删除失败！！所删除的ID：',req.body.id);
            res.send('<script>alert("删除失败!!!");location.href="/";</script>');
        }else{
            data.remove((err)=>{
                console.log('删除成功！！所删除的ID：',req.body.id);
                res.send('<script>alert("删除成功!!!");location.href="/";</script>');
            });
        }
    });
});

router.post('/userdelete',function (req,res,next) {
    db.AdminModel.findById(req.body.id).exec((err,data)=>{

        if (err){
            console.log('删除失败！！所删除的ID：',req.body.id);
            res.send('<script>alert("删除失败!!!");location.href="/";</script>');
        }else{
            data.remove((err)=>{
                console.log('删除成功！！所删除的ID：',req.body.id);
                res.send('<script>alert("删除成功!!!");location.href="/";</script>');
            });
        }
    });
});

router.post('/message',function (req,res,next) {
    db.messageModel.findById(req.body.id).exec((err,data)=>{
        if (err){
            console.log('删除失败！！所删除的ID：',req.body.id);
            res.send('<script>alert("删除失败!!!");location.href="/";</script>');
        }else{
            data.remove((err)=>{
                console.log('删除成功！！所删除的ID：',req.body.id);
                res.send('<script>alert("删除成功!!!");location.href="/";</script>');
            });
        }
    });
});
router.post('/commentclass',function (req,res,next) {
    db.LabelModel.findById(req.body.id).exec((err,data)=>{
        if (err){
            console.log('删除失败！！所删除的ID：',req.body.id);
            res.send('<script>alert("删除失败!!!");location.href="/comment.html";</script>');
        }else{
            data.remove((err)=>{
                console.log('删除成功！！所删除的ID：',req.body.id);
                res.send('<script>alert("删除成功!!!");location.href="/comment.html";</script>');
            });
        }
    });
});
router.post('/articledel',function (req,res,next) {
    db.ArticleModel.findById(req.body.id).exec((err,data)=>{
        if (err){
            console.log('删除失败！！所删除的ID：',req.body.id);
            res.send('<script>alert("删除失败!!!");location.href="/article.html";</script>');
        }else{
            data.remove((err)=>{
                console.log('删除成功！！所删除的ID：',req.body.id);
                res.send('<script>alert("删除成功!!!");location.href="/article.html";</script>');
            });
        }
    });
});
router.post('/checkAll',function (req,res,next) {
    var suzu=req.body.checkbox;
    console.log(suzu);
    for(var i in suzu){
        db.classModel.findById(suzu[i]).exec((err,data)=>{
            if (err){
                console.log('删除失败！！所删除的ID：',suzu[i]);
                console.log('采用第二种方式：单独删除');
                db.classModel.findById(suzu).exec((err,data)=>{
                    data.remove((err)=>{
                        if(err){
                            res.send('<script>alert("删除失败!!!");location.href="/admin/notice.html";</script>');
                        }else {
                            console.log('删除成功！！所删除的ID：',suzu);
                        }

                    });
                });
            }else{
                    data.remove((err)=>{
                        console.log('删除成功！！所删除的ID：',suzu[i]);

                });
            }
        });
    }
    res.send('<script>alert("删除成功!!!");location.href="/admin/notice.html";</script>');
});
router.post('/commentAll',function (req,res,next) {
    var suzu=req.body.checkbox;
    console.log(suzu);
    for(var i in suzu){
        db.LabelModel.findById(suzu[i]).exec((err,data)=>{
            if (err){
                console.log('删除失败！！所删除的ID：',suzu[i]);
                console.log('采用第二种方式：单独删除');
                db.LabelModel.findById(suzu).exec((err,data)=>{
                    data.remove((err)=>{
                        if(err){
                            res.send('<script>alert("删除失败!!!");location.href="/admin/comment.html";</script>');
                        }else {
                            console.log('删除成功！！所删除的ID：',suzu);
                        }

                    });
                });
            }else{
                data.remove((err)=>{
                    console.log('删除成功！！所删除的ID：',suzu[i]);

                });
            }
        });
    }
    res.send('<script>alert("删除成功!!!");location.href="/admin/comment.html";</script>');
});
router.post('/messageall',function (req,res,next) {
    var suzu=req.body.checkbox;
    console.log(suzu);
    for(var i in suzu){
        db.messageModel.findById(suzu[i]).exec((err,data)=>{
            if (err){
                console.log('删除失败！！所删除的ID：',suzu[i]);
                console.log('采用第二种方式：单独删除');
                db.messageModel.findById(suzu).exec((err,data)=>{
                    data.remove((err)=>{
                        if(err){
                            res.send('<script>alert("删除失败!!!");location.href="/admin/message.html";</script>');
                        }else {
                            console.log('删除成功！！所删除的ID：',suzu);
                        }

                    });
                });
            }else{
                data.remove((err)=>{
                    console.log('删除成功！！所删除的ID：',suzu[i]);

                });
            }
        });
    }
    res.send('<script>alert("删除成功!!!");location.href="/admin/message.html";</script>');
});
router.post('/ALL',function (req,res,next) {
    var suzu=req.body.checkbox;
    console.log(suzu);
    for(var i in suzu){
        db.ArticleModel.findById(suzu[i]).exec((err,data)=>{
            if (err){
                console.log('删除失败！！所删除的ID：',suzu[i]);
                console.log('采用第二种方式：单独删除');
                db.ArticleModel.findById(suzu).exec((err,data)=>{
                    data.remove((err)=>{
                        if(err){
                        }else {
                            console.log('删除成功！！所删除的ID：',suzu);
                        }

                    });
                });
            }else{
                data.remove((err)=>{
                    console.log('删除成功！！所删除的ID：',suzu[i]);

                });
            }
        });
    }
    res.send('<script>alert("删除成功!!!");location.href="/admin/article.html";</script>');
});
router.post('/login',function (req,res,next) {
    var id=[];
    db.AdminModel.find({uname:req.body.username,upwd:req.body.userpwd}).exec(function (err,data) {
        if(data==false){
            res.send('<script>alert("管理员账号或者密码错误!!!");location.href="/admin";</script>');
        }else{
            res.cookie("user",'admin');
            res.send('<script>location.href="/admin";</script>');
    }
    });

})
router.post('/admincookie',function (req,res,next) {
    res.cookie("user",1);
    res.send('<script>location.href="/admin";</script>');
});

function index(res){
    res.render('admin/index', {blos:{wenzhangshuliang:'100',ly:'50',biaoqian:'12',fenlei:'18',admin:'adminuser',admingeshu:'5',llq:'360浏览器',ip:'127.0.0.1',time:'2018-11-06'}});
}


module.exports = router;
