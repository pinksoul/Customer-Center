<template>
    <div id="wraper">
        <div id="tou" >
           <div class="nam">
                <div class="nam-picture">
                    <img  :src="headimgurl" src="" width="88px" height="88px" >
                </div>
               <div class="nam-id">
                    <div class="nam-name" >{{nickName}}</div>
                   <!--<div class="nam-num">机构Id:123321</div>-->
               </div>
           </div>
        </div>
        <div  id="mid">
            <div class="left">
                <div class="left-top">
                    <div class="left-top-account" >
                        账户余额
                    </div>

                    <div style="width:30px;height:30px;float:right;margin:16px 16px 0 0;border:0px solid black;" v-on:click="quesClick">
                        <img src="../../imgs/ques.png" alt="">
                    </div>

                    <div class="left-top-money" >
                        ￥:{{balance/100}}
                    </div>
                </div>

                <div class="left-mid">
                    <input type="button"  class="btn" value="查看明细" v-on:click="detaitsClick"><!--<button value="明细" v-on:click="detaitsClick"></button>-->
                </div>

                <div class="left-picture">

                </div>
            </div>
            <div class="right" v-on:click="historyClick">
                <div style="border:0px solid red;margin:40px 0 0 0;height:60px;width:100%;">
                    <img src="../../imgs/rig.png"   alt="">
                </div>
                <div style="color:rgb(115,28,255);font-size:16px;margin-top:13px;font-weight:bold;">历史纪录</div>
            </div>
        </div>
        <div>

        <!--四个选择栏-->
            <div class="xdown-one" style=" margin-top:36px;">
                <!--我的会员资料-->
                <div class="xdown1"v-on:click="memberClick">
                    <div class="pic-size">
                    <div class="xdown11" >
                        <img src="../../imgs/member.png" alt="会员资料">
                    </div>
                    </div>
                    <div class="xdown12">
                        <div class="xdown12-size" style="border-bottom:1px solid #dbdbdb;">
                        我的会员资料
                        </div>
                    </div>
                </div>
             <div/>

                <!--我的订单-->
                <div class="xdown-one" style="">
                <div class="xdown1"v-on:click="myOrderClick">
                    <div class="pic-size">
                        <div class="xdown11" >
                            <img src="../../imgs/order.png" alt="">
                        </div>
                    </div>
                    <div class="xdown12">
                        <div class="xdown12-size" style="border-bottom:1px solid #dbdbdb;">
                            我的订单
                        </div>
                    </div>
                </div>
                <div/>
                </div>
                <!--意见反馈-->
                <div class="xdown-one">
                    <div class="xdown1" style="margin-top:12px;" v-on:click="fankuiClick">
                        <div class="pic-size">
                            <div class="xdown11" >
                                <img src="../../imgs/opinion.png" alt="">
                            </div>
                        </div>
                        <div class="xdown12">
                            <div class="xdown12-size" style="border-bottom:1px solid #dbdbdb;">
                                意见反馈
                            </div>
                        </div>
                    </div>
                <div/>
                </div>

                <!--客服电话-->
                  <div class="xdown-one">
                    <div class="xdown1"v-on:click="feedbackClick()">
                        <div class="pic-size">
                            <div class="xdown11" >
                                <img src="../../imgs/phone.png" alt="">
                            </div>
                        </div>
                        <div class="xdown12">
                            <div class="xdown12-size">
                                客服电话 <a style="font-family:PingFang-SC-Medium;font-size:15px;color:#c4c4c4;">4000045055</a>
                                <!--<a href="javascript:if(confirm('拨打400-820-8826?'))location='http://www.google.com'">400-820-8826</a>-->
                            </div>
                        </div>
                    </div>
                  </div>

                </div>
            </div>
        </div>
</template>

<script>
    import axios from 'axios'
    import Utils from  '../../util/utils'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil'
    export default {
        name: "MyCenter",
        data() {
            return{
                balance:0,
                birthday:"",
                totalamount:0,
                headimgurl:"",
                phone:"",
                message:"",
                realname :"",
                sex:0,
                nickName:"",
                code:""
            }
        },

        mounted: function () {
            this.$nextTick(function () {
                 if(getStore("Unid") == null) {
                         this.code= Utils.getUrlKey("code")
                        if (this.code == null) {
                             //正式
                             window.location.href = "http://open.weixin.qq.com/connect/oauth2/authorize?" +
                                 "appid=wx0d5c4ff7f1f4afae&redirect_uri=" +
                                 encodeURI("http://www.wwmojing.com/customer/index.html&response_type=")
                                 +
                                 "code&scope=snsapi_userinfo&state=123";
                         } else {
                             this.wechatAuthorize(this.code)
                        }
                    }
                else
                {
                     this.inviteManager()

                }

                }
            )},


        methods:{
            getAuthResponse(response) {

                var data = response.data;
                if (data.Status === 0){
                    var  oid = data.Data.OpenId;
                    var   Unid = data.Data.Unionid;
                    setStore("openId",oid);
                    setStore("Unid",Unid);
                    this.inviteManager()

                }
            },
            wechatAuthorize:function(code){
                        axios.get('/WeChatCheck/WechatAuthorize',{
                            params: {"code":code}
                        }).then(
                            this.getAuthResponse);
                    },
                    showTip:function(messsage){
                        Tips.open({
                            content: messsage,
                    time: 2
                });
            },
            detaitsClick:function () {
                this.$router.push({name: 'Mingxi'});
            },
            quesClick:function () {
                this.$router.push({name: 'Ques'});
            },
            historyClick:function () {
                this.$router.push({name: 'History'});
            },
            memberClick:function () {
                this.$router.push({name: 'Member'});
            },
            myOrderClick:function () {
                this.$router.push({name: 'MyOrder'});
            },
            feedbackClick:function () {

                if (confirm("您将拨打4000045055！")) {
                    window.location.href = "tel:4000045055";
                }
                else {

                }
            },
            fankuiClick:function () {
                this.$router.push({name: 'FeedBack'});
            },
            inviteManager:function () {
                axios.get('/PC/GetMallUserBaseInfo',{
                    params:{
                        "Unid":getStore("Unid"),
                        // Unid:"12345",
                    }
                }).then(this.inviteManagerResponse);
            },
            inviteManagerResponse(response) {
                var data = response.data;
                if (data.Status === 0) {
                      var userInfo = data.Data;
                      setStore("UserInfo",userInfo);
                      this.balance = userInfo.Balance;
                      this.nickName = userInfo.NickName;
                      this.headimgurl = userInfo.HeadImgurl;
                      this.totalamount=userInfo.TotalAmount;
                      this.phone=userInfo.Phone;
                      this.realname=userInfo.RealName;
                } else {

                }
            },
        }

    }
</script>

<style scoped>
    html,body {
        width: 100%;
        height: 100%;
        overflow: auto;
    }
    #wraper {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color:#f0f0f0;
        font-size: 14px;
        overflow: auto;
        color: #2c2c2c;
    }
    #tou {
        border: 0px solid black;
        width: 100%;
        height: 32%;
        float: left;
        margin-top:0px;
        background-image:url('../../imgs/bg.png');
        background-size: 100% 100%;

    }
    .nam{
        margin:22% 5% 0 5%;
    }
    .nam-picture{
        border: 0px solid red;
        border-radius:50%;
        float:left;
        width:60px;
        height:60px;
        margin:0% 0 0 0%;
        overflow:hidden;
    }
    .nam-name{
        border: 0px solid black;
        width:100%;
        text-align:left;
        font-size:28px;
        font-family:PingFang-SC-Bold;
        color:#ffffff;
        margin:12px 0 0 -35px;
        float:left;
    }
    /*.nam-num {*/
        /*border: 0px solid black;*/
        /*font-size: 16px;*/
        /*font-family:PingFang-SC-Bold;*/
        /*color: #ffffff;*/
        /*margin:10px 0 0 35px;*/
        /*float: left;*/
    /*}*/
        .nam-id{
            border: 0px solid red;
            float:right;
            width:60%;
            height:100%;
        }
        img{
            width: 100%;
            height: 100%;
        }
        #mid{
            border:0px solid red;
            width:100%;
            height:160px;
            float:left;
            margin-top:-10%;
        }
        .left{
            border:0px solid red;
            position:relative;
            background-color:white;
            border-radius:10px;
            margin-left:3%;
            width:45%;
            height:165px;
            float:left;
        }
        .left-top-account{
            border: 0px solid black;
            margin:28px 0 0 16px;
            float:left;
        }
        .left-top-money{
            border: 0px solid black;
            color:#2c2c2c;
            margin:14px 0 24px 14px;
            font-size:24px;
            float:left;
            text-align:left;
            width:90%;
            font-family:San-Francisco-Display-Bold;
        }
        .left-top{
            border:0px solid red;
            height:55%;
        }
        .left-mid{
            border:0px solid red;
            height:20%;
        }
        .btn{
            background-color:rgb(243,237,251);
            border-radius:25px;
            width:120px;
            height:30px;
            font-size:14px;
            font-weight:lighter;
            color:rgb(141,81,254);
        }
        .left-picture{
            border:0px solid red;
            /*border-radius:2px;*/
            height:29px;
            width:120px;
            background:url("../../imgs/left.png") no-repeat ;
            background-size:cover;
            margin-top:12px;
            margin-left:1px;
        }
        .right{
            border:0px solid red;
            position:relative;
            background-color:white;
            border-radius:10px;
            height:165px;
            width:45%;
            float:right;
            margin-right:3%;
        }
        .xdown-one{
            position:relative;
            border:0px solid red;
            width:100%;
            float:left;
            line-height:44px;
            line-height:44px;
        }
        .xdown1{
            background:white;
        }
        .xdown11{
            border:0px solid red;
            float:left;
            height:22px;
            width:22px;
            margin:0 11px 11px 11px;

        }
        .xdown12-size{
            border:0px solid red;
            font-family:PingFang-SC-Medium;
            font-size:15px;
            color:#2c2c2c;
            text-align:left;
            width:100%;
        }
</style>
