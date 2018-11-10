var LStorage=window.localStorage;//获取对象
var IMYUAN;
IMYUAN || (IMYUAN = {});

(function(a) {

    a.fn.extend({
        returntop: function() {
            if (this[0]) {
                var b = this.click(function() {
                        a("html, body").animate({
                                scrollTop: 0
                            },
                            120)
                    }),
                    c = null;
                a(window).bind("scroll",
                    function() {
                        var d = a(document).scrollTop(),
                            e = a(window).height();
                        0 < d ? b.css("bottom", "200px") : b.css("bottom", "-200px");
                        a.isIE6() && (b.hide(), clearTimeout(c), c = setTimeout(function() {
                                b.show();
                                clearTimeout(c)
                            },
                            1E3), b.css("top", d + e - 125))
                    })
            }
        }

    })
})

(jQuery); (function(a) {

    a("body")('<a class="close" href="javascript:;"></a>');

})
function text() {
    if(LStorage.text){
        return true;
        //有值
    }else{
        return false;
        //没值
    }
}
function textclick(){
    if($('.text').text()==='点我关闭文字特效'){
        LStorage.text='true';
        $('.text').text('点我开启文字特效');
        location.reload();
    }else{
        window.localStorage.removeItem("text");
        location.reload();
    }
}
function textNo1(){
    if (text()){

    } else{
        $(".font").addClass("moatext_lens");
        $(".blogtitle").addClass("moatext_lens");
        $(".bloginfo").addClass("moatext_wave");
        $(".abname").addClass("moatext_lens");
        $(".abposition").addClass("moatext_wave");
        $(".abtext").addClass("moatext_wave");
        $(".cloud>ul").addClass("moatext_wave");
        $('.paihang').children('ul').children('li').addClass("moatext_wave");
        $('.links').children('ul').children('li').addClass("moatext_wave");
        $('.ab_con').addClass("moatext_wave");
        $('.news_infos').addClass("moatext_wave");
        $('footer').addClass("moatext_wave");
        $('.lmnav').addClass("moatext_wave");
        $('.news_title').addClass("moatext_wave");

        $('.text').text('点我关闭文字特效');
    }
}