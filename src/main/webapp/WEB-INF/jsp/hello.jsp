<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<html>  
    <head>  
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
        <title>Untitled Document</title>  
        <style type="text/css">  
            div, span, p {  
                width: 140px;  
                height: 140px;  
                margin: 5px;  
                background: #aaa;  
                border: #000 1px solid;  
                float: left;  
                font-size: 17px;  
                font-family: Verdana;  
            }  
              
            div.mini {  
                width: 55px;  
                height: 55px;  
                background-color: #aaa;  
                font-size: 12px;  
            }  
              
            div.hide {  
                display: none;  
            }             
        </style>  
          
        <!-- 导入 jQuery 库 -->  
        <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>  
        <script type="text/javascript">  
              
            $(function(){  
                //点击ID为btn1 按钮,点亮 ID 为 one 的DIV区域  
                $("#btn1").click(function(){  
                    $("#one").css("background","#ffeeaa");//css() 更改 其css 属性值 的函数  
                });  
                $("#btn2").click(function(){  
                    $(".mini").css("background","#ffeeaa");//css() 更改 其css 属性值 的函数  
                });  
                $("#btn3").click(function(){  
                    $("div").css("background","#ffeeaa");//css() 更改 其css 属性值 的函数  
                });  
                $("#btn4").click(function(){  
                    $("*").css("background","#ffeeaa");//css() 更改 其css 属性值 的函数  
                });  
                $("#btn5").click(function(){  
                    $("span,#two").css("background","#ffeeaa");//css() 更改 其css 属性值 的函数  
                });  
            })  
          
        </script>  
          
    </head>  
    <body>          
        <input type="button" value="选择 id 为 one 的元素" id="btn1" />  
        <input type="button" value="选择 class 为 mini 的所有元素" id="btn2" />  
        <input type="button" value="选择 元素名是 div 的所有元素" id="btn3" />  
        <input type="button" value="选择 所有的元素" id="btn4" />  
        <input type="button" value="选择 所有的 span 元素和id为two的元素" id="btn5" />  
          
        <br><br>  
        <div class="one" id="one">  
            id 为 one,class 为 one 的div  
            <div class="mini">class为mini</div>  
        </div>  
        <div class="one" id="two" title="test">  
            id为two,class为one,title为test的div  
            <div class="mini" title="other">class为mini,title为other</div>  
            <div class="mini" title="test">class为mini,title为test</div>  
        </div>  
        <div class="one">  
            <div class="mini">class为mini</div>  
            <div class="mini">class为mini</div>  
            <div class="mini">class为mini</div>  
            <div class="mini"></div>  
        </div>  
        <div class="one">  
            <div class="mini">class为mini</div>  
            <div class="mini">class为mini</div>  
            <div class="mini">class为mini</div>  
            <div class="mini" title="tesst">class为mini,title为tesst</div>  
        </div>  
        <div style="display:none;" class="none">style的display为"none"的div</div>  
        <div class="hide">class为"hide"的div</div>  
        <div>  
            包含input的type为"hidden"的div<input type="hidden" size="8">  
        </div>  
        <span id="span">^^span元素^^</span>  
    </body>  
</html> 