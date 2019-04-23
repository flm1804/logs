/**
 * Created by 原来是阿付 on 2019/4/23 0023.
 */
(function () {
    //负责读取浏览器cookie浏览器
    var cookieUtils ={
        //向浏览器写入cookie数据
        set: function (cookieName,cookieValue) {
            var cookieText=encodeURIComponent(cookieName)+"="+encodeURIComponent(cookieValue);
        // 计算十年后的时间
            var date = new date();
            //获取当前时间戳
           var currentTime= date.getTime();
        //获取十年的时间长度
            var tenYearLongTime= 10 *365*24*60*60*1000;
            //十年后的时间
            var tenYear=currentTime+tenYearLongTime;
            //将date对象调整为10年后的时间
            date.setTime(tenYear);
            cookieText+=";expires="+date.toUTCString();
            document.cookie=cookieText;
        },
        //向浏览器获取cookie 数据
        get: function (cookieName) {
            var cookieValue=null;
            var cookieText=document.cookie;
            var items=cookieText.split(";");
            for(index in items ){
                var kv =items[index].split("=");
                var key =kv[0].trim();
                var value=kv[1].trim();
                if(key == encodeURIComponent(cookieName)){
                    cookieValue=decodeURIComponent(value)
                }
            }
            return cookieValue;
        }
    };
    //负责具体采集每个用户行为事件数据
    var tracker={
        clientConfig:{
            logServerUrl:"http://hadoop01/log.gif",
            //会话过期时间
            sessionTimeOut:2*60*1000,
            logVersion:"2.0"
        },
        //需要存放到浏览器cookie中的字段
        cookieKeys:{
            uuid:"uid",//用户唯一标识
            sid:"sid",//会话id
            preVisitTime:"pre_visit_time"//用户最近一次访问时间
    },
        //定义需要采集的事件名称（这个意识是根据具体业务来
        events:{
            launchEvent:"e_"
        }

    }





})