<template>
    <div class="wraper">
        <div class="nav">
            <img v-on:click="backClick"  style="float: left;margin-top: 13px;margin-left: 15px" height="17px" src="../../images/back.png"/>
            续费
        </div>
        <div v-if="options.length != 0" class="login-wraper">
            <div style="width: 100%;text-align: center">
                <div style="padding-top: 24px">
                    距离到期还有
                </div>
                <div  v-if="payInfo.DeviceInfo!== null">
                    <img class="logo" width="88px" height="88px" src="../../images/circle.png">
                    <div class="days">
                        <div style="display: inline-block;font-size: 18px">{{days}}</div>
                        <div style="display: inline-block;font-size: 6px;color: #c4c4c4">天</div>
                    </div>
                </div>
                <div  style="margin-top: 8px;margin-bottom: 64px;font-size: 10px;color: #ffffff">
                    序列号:{{padSerialNo.slice(0,4)}}**********{{padSerialNo.substr(padSerialNo.length - 4,4)}}
                </div>
            </div>
            <div  v-for="(item, index) in options" v-on:click="paySelect(index)" class="pay-selected-wraper">
                <div v-if="payIndex === index" class="pay-selecte">
                    <img style="height: 18px;width: 18px;float: left;margin-top:11px;margin-left: 10px" src="../../images/meal-selected.png"/>
                    <div class="pay-money">
                        {{item.price / 100}} RMB
                    </div>
                    <div class="pay-time">
                        {{item.desc}}
                    </div>
                    <div v-if="options[0].discount !== 0" class="discount">
                        {{item.discount}}
                    </div>
                </div>
                <div  v-if="payIndex != index" class="pay-no-selected">
                    <img style="height: 9px;width: 9px;float: left;margin-top:15px;margin-left: 15px" src="../../images/meal-no-selected.png"/>
                    <div class="pay-money">
                        {{item.price /100}} RMB
                    </div>
                    <div class="pay-time">
                        {{item.desc}}
                    </div>
                    <div v-if="options[0].discount !== 0" class="discount">
                        {{item.discount}}
                    </div>
                </div>
            </div>
            <div v-on:click="payClick" class="login-btn">
                支付
            </div>
        </div>
    </div>
</template>

<script>
    import Utils from  '../../util/utils'
    import axios from 'axios'
    import  '../../util/tip/aTips'
    import {getStore, setStore, removeStore} from '../../util/StorageUtil'
    import wx from 'weixin-js-sdk'
    export default {
        name: "PadPayFee",
        data() {
            return{
                payIndex: 0,
                payItem:{},
                payInfo:{},
                options:[],
                days:0,
                padSerialNo:"",
                padSid:""
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.padSerialNo= Utils.getUrlKey("PadSerialNo")
                this.padSid= Utils.getUrlKey("PadSid")
                var padStatus =  this.padSerialNo + "|" + this.padSid;
                var  wxStatus = Utils.getUrlKey("state")
                setStore("state",wxStatus)
                this.code= Utils.getUrlKey("code")
                if (this.code == null) {
                    //正式
                    window.location.href = "http://open.weixin.qq.com/connect/oauth2/authorize?" +
                        "appid=wx0d5c4ff7f1f4afae&redirect_uri=" +
                        "http://www.wwmojing.com/PadPayFee/index.html&response_type=" +
                        "code&scope=snsapi_userinfo&state=" + padStatus;

                } else {
                    this.wechatAuthorize(this.code)
                    this.getScanPreRechargeCheck()
                    this.wePayconfig()
                }
            })
        },
        methods:{
            getAuthResponse(response) {
                var that = this
                var data = response.data;
                if (data.Status === 0){
                    var  oid = data.Data.OpenId;
                    var   Unid = data.Data.Unionid;
                    setStore("openId",oid)
                    setStore("Unid",Unid)
                }
            },
            wechatAuthorize:function(code){
                axios.get('/WeChatCheck/WechatAuthorize',{
                    params: {"code":code}
                }).then(
                    this.getAuthResponse);
            },
            wePayconfig() {
                let that = this
                axios.get('/PersonalCenter/FriendShareInit',{
                    params:{
                        "name": encodeURIComponent(location.href.split('#')[0])
                    }
                }).then(res => {
                    let wxConfig = res.data
                    wx.config({
                        debug: false,
                        appId: wxConfig.appId,
                        timestamp: wxConfig.timestamp,
                        nonceStr: wxConfig.noncestr,
                        signature: wxConfig.signature,
                        jsApiList: ["chooseWXPay","scanQRCode"]
                    })
                    // that.wxReady(info)
                }, err => {
                    console.error('支付', err.data.message)
                })
            },
            payClick:function () {
                this.precharge()
            },
            paySelect:function (index) {
                this.payIndex = index;
            },
            backClick:function () {
                this.$router.back(-1);
            },
            getScanPreRechargeCheckResponse(response) {
                var data = response.data
                if (data.Status === 0) {
                    this.payInfo = data.Data
                    this.options = JSON.parse(data.Data.PayOptions.Options)
                    if (this.payInfo.DeviceInfo !== null) {
                        this.days = this.payInfo.DeviceInfo.ExpireDays;
                    }
                }else {

                }
            },
            getScanPreRechargeCheck:function(){
                var state = getStore("state")
                var deviceInfo = state.split("|")
                axios.get('/Mob/ScanPreRechargeCheck', {
                    params:{
                        "SerialNo":deviceInfo[0],
                        "Sid":deviceInfo[1]
                    }
                }).then(
                    this.getScanPreRechargeCheckResponse);
            },
            precharge :function(){
                var payInfo = this.options[this.payIndex];
                axios.post('/Mob/Precharge', {
                    Unid:  getStore("Unid"),
                    TotalAmount: payInfo.price,
                    ActAmount:  payInfo.price - payInfo.discount,
                    Sid: this.payItem.Sid,//门店id
                    Month: payInfo.month,
                    Discount: payInfo.discount,
                    SerialNo:this.payItem.SerialNo,
                    Oid:  getStore("openId")
                }).then(
                    this.prechargeResponse);
            },
            prechargeResponse(response) {
                var that = this;
                var data = response.data
                if (data.Status === 0) {
                    that.wxPay(data.Data)
                }else  {
                    that.showTip(data.Message)
                }
            },
            wxPay:function (res) {
                var  that = this
                wx.chooseWXPay({
                    timestamp: res.TimeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: res.NonceStr, // 支付签名随机串，不长于 32 位
                    package: res.PackageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: res.SignType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: res.PaySign, // 支付签名
                    success: function (wResp) {
                        // 支付成功后的回调函数
                        if (wResp.errMsg == "chooseWXPay:ok") {
                            //支付成功
                            that.$router.push({name: 'Success',params:{navTitle:"支付成功",title:'支付成功',subTitle:"支付成功"}});
                        } else {

                        }

                    },
                    cancel:function(wResp){
                        //支付取消
                        // that.showTip(wResp)
                    }
                });
            },
            showTip:function(messsage){
                Tips.open({
                    content: messsage,
                    time: 3
                });
            },
        }
    }
</script>

<style scoped>

</style>
