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
        events: {
            launchEvent: "e_l",//用户首次访问事件
            pageViewEvent: "e_pv",//用户浏览页面事件
            addCartEvent: "e_ad",//商品加入购物车事件
            searchEvent: "e_s"//搜索事件
        },
        /**
         * 定义需要采集的字段（这个一定是根据具体业务来）
         */
        columns: {
            eventName: "en",//事件名称
            version: "ver",//日志版本
            platform: "pl",//平台 ios Android
            sdk: "sdk",//sdk js java
            uuid: "uid",//用户唯一标识
            sessionId: "sid",//会话id
            resolution: "b_rst",//浏览器分辨率
            userAgent: "b_usa",//浏览器代理信息
            language: "l",//语言
            clientTime: "ct",//客户端时间
            currentUrl: "url",//当前页面的url
            referrerUrl: "ref",//来源url，上一个页面的url
            title: "tt",//网页标题
            keyword: "kw",//搜索关键字
            goodsId: "gid"//商品id
        },
        //设置uuid到cookie
        setUuid:function (uuid) {
            cookieUtils.set(this.cookieKeys.uuid,uuid)
        },
        //获取uuid
        getUuid:function () {
            return cookieUtils.get(this.cookieKeys.uuid)
        },
        //设置会话id
        setSid:function (sid) {
            cookieUtils.set(this.cookieKeys.sid,sid)
        },
        //获取会话id
        getSid:function () {
            return cookieUtils.get(this.cookieKeys.sid)
        },
        //todo 会话开始了
        sessionStart :function () {
            /**
             * 判断会话是否存在，就是尝试从浏览器的cookie中获取用户的会话id，如果获取到了说明会话存在，否则不存在
             * "" null ==>false
             * */
            if(!this.getSid()){
                //会话不存在
                this.createNewSession();

            }else{
                //会话存在
            }
        },
        //创建新的会话
        createNewSession:function () {
            //生成会话id
            var sid= guid();
            //将会话id保存到cookie中
            this.setSid(sid);

            //判断用户是否是首次访问（查看浏览器的cookie中是否用用户的唯一标识，如果有说明是非首次访问，否则是首次访问）
            if(!this.getUuid()){//获取不到用户的唯一标识
                var uuis=guid();
                //将用户唯一标识保持到cookie中
                this.setUuid(uuid);
                //todo 触发首次访问事件，收集用户的数据发送首次访问事件日志到后台服务器上
            }
        },
        //定义首次访问事件
        launchEvent:function () {
            //定义一个对象data，这个对象用来封装手机号的数据
            var data ={ };
            //事件名称 data["en"]="e_l"
            date[this.columns.eventName]=this.events.launchEvent;
            //设置公共字段
            this.setCommonColumns(data)

        },
        //设置公共字段
        setCommonColums:function (data) {
            //sdk 版本号
            data[this.columns.version]=this.clientConfig.logVersion;
        },
        //生成唯一标识 guid
        guid: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

    }





})();