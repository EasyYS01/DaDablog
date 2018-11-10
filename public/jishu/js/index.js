$(document).ready(function() {
    $("#steps-menu a").click(function(event) {
        // Replaces main content
        event.preventDefault();
        $(this).parent().addClass("is-active");
        $(this).parent().siblings().removeClass("is-active");
        var step = $(this).attr("href");
        $(".step-content").not(step).css("display", "none");
        $(step).fadeToggle();
        
        // Rotates the wheel
        $("#steps-menu").removeClass();
        var stepClass = step.charAt(6);
        $("#steps-menu").addClass("step-" + stepClass);
        switch((stepClass-0)){
            case 1:
            $("#title").text("个人技术栈:HTML5");
            $("#content1").text("最近几年，HTML5的发展速度如日中天，各种技术更是错综复杂，高效率，低成本的移动应用开发成为更多企业追求的目标。");
            break;
        case 2:
            $("#title").text("个人技术栈:CSS3");
            $("#content1").text("CSS3的语法是建立在CSS原先版本基础上的，它允许使用者在标签中指定特定的HTML元素而不必使用多余的class、ID或JavaScript。CSS选择器中的大部分并不是在CSS3中新添加的，只是在之前的版本中没有得到广泛的应用。如果想尝试实现一个干净的、轻量级的标签以及结构与表现更好的分离，高级选择器是非常有用的，它们可以减少在标签中的class和ID的数量并让设计师更方便地维护样式表 。");
            break; 
        case 3:
            $("#title").text("个人技术栈:JavaScript");
            $("#content1").text("JavaScript是一个动态弱类型的，原型继承的，函数式的编程语言，掌握它并不简单，也为了与服务器端程序员愉快的沟通。");
            break;
        case 4:
            $("#title").text("个人技术栈:Bootstrap");
            $("#content1").text("基本结构：Bootstrap 提供了一个带有网格系统、链接样式、背景的基本结构。这将在Bootstrap 基本结构部分详细讲解。CSS：Bootstrap 自带以下特性：全局的 CSS设置、定义基本的 HTML 元素样式、可扩展的 class，以及一个先进的网格系统。这将在Bootstrap CSS部分详细讲解。组件：Bootstrap 包含了十几个可重用的组件，用于创建图像、下拉菜单、导航、警告框、弹出框等等。这将在布局组件部分详细讲解。JavaScript 插件：Bootstrap包含了十几个自定义的jQuery 插件。您可以直接包含所有的插件，也可以逐个包含这些插件。这将在Bootstrap插件部分详细讲解。");
            break; 
        case 5:
            $("#title").text("个人技术栈:Node.js");
            $("#content1").text("Node.js对一些特殊用例进行优化，提供替代的API，使得V8在非浏览器环境下运行得更好。V8引擎执行Javascript的速度非常快，性能非常好。  Node.js是一个基于Chrome JavaScript运行时建立的平台， 用于方便地搭建响应速度快、易于扩展的网络应用。Node.js 使用事件驱动， 非阻塞I/O 模型而得以轻量和高效，非常适合在分布式设备上运行数据密集型的实时应用。");
            break;  
        default:
            $("#title").text("个人技术栈:PHP");
            $("#content1").text("伪静态、静态页面生成、数据库缓存、过程缓存、div+cssw3c标准、大负荷、分布式、flex、桌面程序应用（不擅长）、支持MVC模型、Smarty模版引擎");
            break; 
          }
        currentNum=step.substr(6,1)-0+1;
        
    });


    //slideshow style interval
    var autoSwap = setInterval( swap,5000);
    var currentNum = 2;
    //pause slideshow and reinstantiate on mouseout
    $('#read-more a, #steps-menu a').hover(
      function () {
        clearInterval(autoSwap);
    }, 
      function () {
       autoSwap = setInterval( swap,5000);
    });

    //swap images function
    function swap(action) {
      $("#bbp").fadeOut(100);

        console.log(currentNum);
        $("#steps-menu li a:eq("+ (currentNum-1) +")").parent().addClass("is-active");
        $("#steps-menu li a:eq("+ (currentNum-1) +")").parent().siblings().removeClass("is-active");
        var step = $("#steps-menu li a:eq("+ (currentNum-1) +")").attr("href");
        $(".step-content").not(step).css("display", "none");
        $(step).fadeToggle();
        
        // Rotates the wheel
        $("#steps-menu").removeClass();
        var stepClass = step.charAt(6);
        $("#steps-menu").addClass("step-" + stepClass);

        switch(currentNum){
            case 1:
            $("#title").text("全网监测");
            $("#content1").text("通过对8000+主流网络媒体进行检测，其中包括各大新闻门户网站、论坛、贴吧、博客、视频、新浪微博以及微信平台文章等，对其进行信息采集及汇总整理，获取一切您想要的信息。");
            $("#content2").text("abc");
            break;
        case 2:
            $("#title").text("情感判断");
            $("#content1").text("通过探宝中文语义分析技术，对公众面对特定品牌、网络事件、宣传活动、名人等的正面、负面及中性的情绪进行分析，让您通过口碑趋势洞察消费者、网民的情感态度，进一步作出营销决策。");
            $("#content2").text("sdf");
            break; 
        case 3:
            $("#title").text("热点分析");
            $("#content1").text("采用文章权重分析法，通过自动对给定的海量文本、资讯进行话题聚类，将语义上相似的内容归为一类，获取最新的热门话题，让热点一目了然。");
            $("#content2").text("rtygddgf");
            break;
        case 4:
            $("#title").text("监测报告");
            $("#content1").text("用户自定义报告周期及模板，通过可视化图表将监测数据进行汇报，选择不同的格式进行导出，为工作汇报提供极大的便利。");
            $("#content2").text("rfter");
            break; 
        case 5:
            $("#title").text("危机预警");
            $("#content1").text("从全网快速真确地发现负面舆论信息，及时反馈给用户，针对危机，第一时间内启动危机公关预案。");
            $("#content2").text("sdfxdsfsdfdsf");
            break;  
        default:
            $("#title").text("放假通知");
            $("#content1").text("2016年2月5日－14日春节假期期间，客服全面暂停服务，您有神马问题都不要着急，请耐心过好您的假期，待到放假结束后第一时间联系客服...");
            $("#content2").text("祝您新春愉快，大吉大利");
            break; 
        }


        $("#bbp").fadeIn(800);

      
        currentNum+=1;
        if(currentNum==7) {
            currentNum=1;
        }

       
    }

});