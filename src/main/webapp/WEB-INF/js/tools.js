/**
 * Created by Richard Xue on 14-9-26.
 */
String.prototype.format = function(){
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,function(m,i){ return args[i];});
};
var config = {
    resPath : 'http://localhost:8080/bastion',
    apiPath : 'http://localhost:8080',
    imgPath : 'http://localhost:8080/bastion/gateway/file'
};
var global = {};
global.page_size = 20;
(function($){
    Date.prototype.format=function(fmt) {
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    };
    $.extend({
        getParameter : function (name){
            var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)");
            var m = location.href.match(r);
            return (!m?"":m[2]);
        },
        mustache : function (template, view, partials) {
            return Mustache.render(template, view, partials);
        },
        format : function() {
            var args = arguments.slice(1);
            return arguments[0].replace(/\{(\d+)\}/g, function(m, i){return args[i];});
        },
        asyncGet : function(url,data,callback) {
            $.commonAjaxWrap(url,"GET",true,data,callback);
        },
        asyncPost : function(url,data,callback) {
            $.commonAjaxWrap(url,"POST",true,data,callback);
        },
        syncGet : function(url,data,callback) {
            $.commonAjaxWrap(url,"GET",false,data,callback);
        },
        syncPost : function(url,data,callback) {
            $.commonAjaxWrap(url,"POST",false,data,callback);
        },
        commonAjaxWrap:function(url,type,async,data,callback) {
            var params = {};
            params.url = url;
            params.type = type;
            params.async = async;
            if(typeof data == "function") {
                params.callback = data;
            } else {
                params.data = data || {};
                params.callback = callback;
            }
            $.commonAjax(params);
        },
        commonAjax : function(params) {
            var options = {
                dataType : "JSON",
                type : "GET",
                contentType : "application/json",
                async: true
            };
            options = $.extend(options,params);
            $.ajax({
                url: options.url,
                data: JSON.stringify(options.data),
                dataType: options.dataType,
                type: options.type,
                contentType: options.contentType,
                success: function (data,state,xhr) {
                    if(xhr.getResponseHeader("session-status") == "timeout") {
                        window.location.href = config.apiPath+"/login";
                    }
                    if(!data) {
                        bootbox.alert("Unknown Exception!");
                        return;
                    }
                    if(data.errorCode == 0) {
                        options.callback.call(this,data.content);
                        return;
                    } else {
                        if(data.description) {
                            bootbox.alert(data.description);
                        } else {
                            bootbox.alert("服务响应异常！");
                        }
                    }
                },
                error: function (xhr,error) {
                    if(xhr.getResponseHeader("session-status") == "timeout") {
                        window.location.href = config.apiPath+"/login";
                    }
                    bootbox.alert("服务请求异常！");
                },
                complete : function(data) {
                    console.log("complete!");
                }
            });
        },
        formatDate:function(ms){
            if(!ms) return "";
            if(/^-?\d+$/.test(ms)) {
                return ms ? new Date(ms).format("yyyy-MM-dd") : "";
            } else {
                return ms.substring(0,10);
            }
        },
        formatDate1:function(ms){
            if(!ms) return "";
            if(/^-?\d+$/.test(ms)) {
                return ms ? new Date(ms).format("yyyyMMdd") : "";
            } else {
                return ms.substring(0,10);
            }
        },
        initDictByType:function(types) {
            $.asyncGet(config.apiPath+"/dict/ls/"+types,function(res){
                $.bindDictToSelect(res);
            });
        },
        initDict:function() {
            $.asyncGet(config.apiPath+"/dict/map",function(res){
                $.bindDictToSelect(res);
            });
        },
        bindDictToSelect:function(map){
            config.dict = map;
            $("select.dict-select").each(function(){
                var select = $(this);
                var type = select.attr("dict-type");
                var optionsHtml = "<option value=''>请选择</option>";
                if(!map[type]) {
                    return true;
                }
                for(var i=0;i<map[type].length;i++) {
                    optionsHtml += "<option value='"+map[type][i].key+"'>"+map[type][i].value+"</option>";
                }
                select.html(optionsHtml);
                var keyValue = select.attr("dict-key");
                if(keyValue) {
                    select.val(keyValue);
                }
            });
        },
        isMobile:function(mobile){
            return /^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/.test(mobile);
        },
        isQQ:function(qq){
            return /^[1-9][0-9]{4,9}$/.test(qq);
        },
        isEmail:function(email){
            return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(email);
        }
    });

    $.fn.extend({
        mustache : function (view, partials) {
            return $(this).map(function (i, elm) {
                var template = $.trim($(elm).html());
                var output = $.mustache(template, view, partials);
                return $(output).get();
            });
        },
        customPagination : function(url,callback,data,page_size,current_page) {
            var $pagination = $(this);
            page_size = page_size || global.page_size;
            $.asyncPost(url,data,function(result){
                callback.call(this,result.rows);
                parsePagination(result.total,page_size,current_page);
            });
            function refresh(page_index) {
                if(data == null) {
                    data = {};
                }
                data.page = page_index;
                data.count = page_size;
                $.asyncPost(url,data,function(result){
                    callback.call(this,result.rows);
                });
            }
            function parsePagination(num_entries,page_size,current_page) {
                // 创建分页
                $pagination.pagination(num_entries, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    current_page:current_page,
                    callback: pageselectCallback,
                    items_per_page: page_size,
                    prev_text: "前一页",
                    next_text: "后一页"
                });
            }
            function pageselectCallback(page_index, jq){
                if($pagination.data("first") == "1") {
                    refresh(page_index);
                }
                $pagination.data("first","1");
                return false;
            }
        },
        customDatepicker : function() {
            $(this).datepicker({
                dateFormat: 'yymmddhhmm',
                dayNames:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesMin:['日','一','二','三','四','五','六'],
                dayNamesShort:['周日','周一','周二','周三','周四','周五','周六'],
                monthNames:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                monthNamesShort:['1','2','3','4','5','6','7','8','9','10','11','12']
            });
        }
    });

})(jQuery);

//$(function(){
//    $('html').click(function(event) {
//        var $menu = $("#menu-div");
//        $menu.animate({
//            left: 0-$menu.width()
//        }, 400, function () {
//        });
//    });
//    $("#menu-icon span").on("click", function (event) {
//        $("#menu-div").animate({
//            left: 0
//        }, 500, function () {
//        });
//        event.stopPropagation();
//    });
//    $(window).resize(function(){
//        setMenu()
//    });
//    setMenu();
//    function setMenu() {
//        $("#menu-div").css({"height":$(window).height()});
//    }
//});
