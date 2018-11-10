(function(){
    $("body").append('<a id="returnTop" href="javascript:;">回到顶部a </a>');
    textNo1();
    $("#returnTop").returntop();
    var hearts = [];
    window.requestAnimationFrame = (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback){
                setTimeout(callback,1000/60);
            }
    })();
    init();
    function init(){
        css(".heart{z-index: 9999999;width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
        attachEvent();
        gameloop();
    }
    function gameloop(){
        for(var i=0;i<hearts.length;i++){
            if(hearts[i].alpha <=0){
                document.body.removeChild(hearts[i].el);
                hearts.splice(i,1);
                continue;
            }
            hearts[i].y--;
            hearts[i].scale += 0.004;
            hearts[i].alpha -= 0.013;
            hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+") rotate(45deg);background:"+hearts[i].color;
        }
        requestAnimationFrame(gameloop);
    }
    function attachEvent(){
        var old = typeof window.onclick==="function" && window.onclick;
        window.onclick = function(event){
            old && old();
            createHeart(event);
        }
    }
    function createHeart(event){
        var d = document.createElement("div");
        d.className = "heart";
        hearts.push({

            el : d,
            x : event.clientX - 5,
            y : event.clientY - 5,
            scale : 1,
            alpha : 1,
            color : randomColor()
        });
        document.body.appendChild(d);
    }
    function css(css){
        var style = document.createElement("style");
        style.type="text/css";
        try{
            style.appendChild(document.createTextNode(css));
        }catch(ex){
            style.styleSheet.cssText = css;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    function randomColor(){
        return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
    }
    var oH2 = document.getElementsByTagName("h2")[0];
    var oUl = document.getElementsByTagName("ul")[0];
    oH2.onclick = function ()
    {
        var style = oUl.style;
        style.display = style.display == "block" ? "none" : "block";
        oH2.className = style.display == "block" ? "open" : ""
    }
})(window,document);
var obj=null;
var As=document.getElementById('topnav').getElementsByTagName('a');
obj = As[0];
for(i=1;i<As.length;i++){if(window.location.href.indexOf(As[i].href)>=0)
obj=As[i];}

obj.id='topnav_current'